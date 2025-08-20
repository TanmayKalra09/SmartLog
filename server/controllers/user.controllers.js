import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error("Something went wrong while generating tokens");
  }
};

const registerUser = async (req, res) => {
  try {
    const { fullName, email, username, password } = req.body;

    // Validation
    if ([fullName, email, username, password].some((field) => field?.trim() === "")) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existedUser = await User.findOne({
      $or: [{ username }, { email }]
    });

    if (existedUser) {
      return res.status(409).json({ message: "User with email or username already exists" });
    }

    // Create user
    const user = await User.create({
      fullName,
      email,
      username: username.toLowerCase(),
      password,
    });

    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if (!createdUser) {
      return res.status(500).json({ message: "Something went wrong while registering user" });
    }

    return res.status(201).json({
      message: "User registered successfully",
      user: createdUser
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if (!username && !email) {
      return res.status(400).json({ message: "Username or email is required" });
    }

    const user = await User.findOne({
      $or: [{ username }, { email }]
    });

    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid user credentials" });
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        message: "User logged in successfully",
        user: loggedInUser,
        accessToken,
        refreshToken
      });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const logoutUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $unset: {
          refreshToken: 1
        }
      },
      {
        new: true
      }
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json({ message: "User logged out successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { registerUser, loginUser, logoutUser };
