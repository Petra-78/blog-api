import { Router } from "express";
const router = Router({ mergeParams: true });

import { verifyClient } from "../auth/authMiddleware.js";
import {
  getComments,
  createComment,
  deleteComment,
} from "../controllers/commentsController.js";

router.get("/", getComments);
router.post("/", verifyClient, createComment);

export { router as commentsRouter };
