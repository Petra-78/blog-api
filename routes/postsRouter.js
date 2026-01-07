import { Router } from "express";
const router = Router();

import { verifyAdmin, verifyClient } from "../auth/authMiddleware.js";
import {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postsController.js";

router.get("/", getAllPosts);
router.get("/:id", getPost);

router.post("/", verifyClient, verifyAdmin, createPost);
router.put("/:id", verifyClient, verifyAdmin, updatePost);
router.delete("/:id", verifyClient, verifyAdmin, deletePost);

export { router as postsRouter };
