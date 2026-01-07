import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();

app.use(cors());
app.use(express.json());

import { authRouter } from "./routes/authRouter.js";
import { postsRouter } from "./routes/postsRouter.js";
import { commentsDeleteRouter } from "./routes/commentsDeleteRouter.js";

app.use("/", authRouter);
app.use("/posts", postsRouter);
app.use("/comments", commentsDeleteRouter);

app.get("/", (req, res) => {
  res.json({ message: "Blog API running" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
