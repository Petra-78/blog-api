import { Router } from "express";
const router = Router();

import {
  postLogin,
  postSignup,
  postAdminLogin,
} from "../controllers/authController.js";

router.post("/signup", postSignup);
router.post("/login", postLogin);
router.post("/admin", postAdminLogin);

export { router as authRouter };
