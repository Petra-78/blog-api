import express from "express";
const router = express.Router();
import { verifyClient } from "../auth/authMiddleware.js";
import { deleteComment } from "../controllers/commentsController.js";

router.delete("/:id", verifyClient, deleteComment);

export { router as commentsDeleteRouter };
