import { Router } from "express";
const router = Router();

import { postLogin } from "../controllers/authController.js";

router.post("/signup", (req, res) => {
  res.json({ message: "signup route" });
});

router.post("/login", postLogin);

export { router as authRouter };
