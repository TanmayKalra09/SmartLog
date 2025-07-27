import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";

//To read all the constraints from .env file
dotenv.config();
connectDB()
  .then(() => {
    app.on("error", (err) => {
      console.log(err);
      throw err;
    });
    app.listen(process.env.PORT || 8000, () =>
      console.log(`Server is running at the port ${process.env.PORT}`)
    );
  })
  .catch((err) => {
    console.log("MongoDB connection failed!!", err);
    process.exit(1);
  });
