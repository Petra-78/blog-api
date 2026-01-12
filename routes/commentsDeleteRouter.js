import express from "express";
const router = express.Router();
import { verifyClient, verifyAdmin } from "../auth/authMiddleware.js";
import {
  deleteComment,
  getAllComments,
} from "../controllers/commentsController.js";

router.get("/", verifyClient, verifyAdmin, getAllComments);
router.delete("/:id", verifyClient, deleteComment);

export { router as commentsDeleteRouter };
