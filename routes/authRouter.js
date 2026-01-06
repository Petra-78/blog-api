import { Router } from "express";
const router = Router();

router.post("/signup", (req, res) => {
  res.json({ message: "signup route" });
});

router.post("/login", (req, res) => {
  res.json({ message: "login route" });
});

export { router as authRouter };
