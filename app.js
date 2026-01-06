import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();

app.use(cors());
app.use(express.json());

import { authRouter } from "./routes/authRouter.js";

app.use("/", authRouter);

app.get("/", (req, res) => {
  res.json({ message: "Blog API running" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
