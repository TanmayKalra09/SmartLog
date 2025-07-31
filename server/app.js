import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";


const app = express();
app.use(cors({ credentials: true, origin: process.env.CORS_ORIGIN }));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Health Checkup
app.get("/is-up", (req, res) => {
  res.send("Hello World!");
});

// All the routes here
import userRoutes from "./routers/user.routers.js";
app.use("/api/v1/users", userRoutes);


export default app;
