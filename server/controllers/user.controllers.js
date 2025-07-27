import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";

const generateAccessAndRefreshToken = async (user) => {
  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();
  user.refreshToken = refreshToken;
  // Skip validation since only partial fields are updated (other required fields may be missing)
  await user.save({
    validateBeforeSave: false,
  });

  return { accessToken: accessToken, refreshToken: refreshToken };
};

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, fullName } = req.body;

  // Checking if the each and every field that it's not empty
  if (
    [username, email, password, fullName].some((field) => field?.trim() === "")
  ) {
    //if Any of the field is empty it will throw and exception
    throw new ApiError(400, "All the fields are required");
  }
  const isUserExists = await User.findOne({ $or: [{ username }, { email }] });
  if (isUserExists) {
    // Just a simple if else check if both the name and email have already been created and throws error based on the condition

    // if (isUserExists.username === username && isUserExists.email === email) {
    //   throw new ApiError(
    //     401,
    //     "User with the following username or email exists"
    //   );
    // } else if (
    //   isUserExists.username === username &&
    //   !isUserExists.email === email
    // ) {
    //   throw new ApiError(401, "User with the following username exists");
    // } else throw new ApiError(401, "User with the following email exists");

    // ***** More cleaner version ***** //

    let conflictField = [];

    if (isUserExists.username === username.toLowerCase())
      conflictField.push("username");
    if (isUserExists.email === email) conflictField.push("email");

    const message = `User with this ${conflictField.join(
      " and "
    )} already exists`;
    throw new ApiError(401, message);
  }

  //If not already exists create a new user with their credentials
  const user = await User.create({
    username: username.toLowerCase(),
    email,
    password,
    fullName,
  });
  if (!user) {
    throw new ApiError(
      500,
      "Something went wrong while creating user in the database"
    );
  }

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  //Fallback checking if for any reason the user has been deleted

  if (!createdUser) {
    throw new ApiError(
      500,
      "Something went wrong while fetching user from the database"
    );
  }
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  //Any one field is required
  if (!username && !email) {
    throw new ApiError(400, "Username or email is required");
  }
  const user = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (!user) {
    throw new ApiError(404, "No user with the current username or email");
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid password");
  }
  //Generating user access and refresh tokens
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, loggedInUser, "User logged in successfully"));
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    { $set: { refreshToken: undefined } }

    // Returns the updated document
    // { new: true }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out"));
});

export { registerUser, loginUser, logoutUser };
