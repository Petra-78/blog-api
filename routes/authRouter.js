import { Router } from "express";
import jwt from "jsonwebtoken";
const router = Router();

import {
  postLogin,
  postSignup,
  postAdminLogin,
} from "../controllers/authController.js";
import verifyClient from "../auth/authMiddleware.js";
import { verifyAdmin } from "../auth/authMiddleware.js";

router.post("/signup", postSignup);

router.post("/login", postLogin);
router.post("/admin", postAdminLogin);
router.get("/protected", verifyClient, (req, res) => {
  res.json({ message: "you are on protected route", user: req.user });
});

export { router as authRouter };
