import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controllers.js";
import { verifyUser } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/sign-up", registerUser);
router.post("/sign-in", loginUser);

// use router.use(middleware) if there are more routes which required middleware
router.post("/logout", verifyUser, logoutUser);

export default router;
