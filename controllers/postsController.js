import { prisma } from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export async function getAllPosts(req, res) {
  const posts = await prisma.posts.findMany();
  res.json({ posts });
}

export async function getPost(req, res) {
  const id = req.params.id;
  const post = await prisma.posts.findUnique({
    where: {
      id: Number(id),
    },
  });
  if (!post) {
    return res.status(404).json({ error: "post not found" });
  }
  res.json({ post });
}

export async function createPost(req, res) {
  const title = req.body.title;
  const content = req.body.content;
  const published = req.body.published;
  const post = await prisma.posts.create({
    data: {
      title,
      content,
      published,
      lastUpdated: new Date(),
      authorId: req.user.userId,
    },
  });

  res.json({ post });
}

export async function updatePost(req, res) {
  const id = req.params.id;
  const title = req.body.title;
  const content = req.body.content;
  const published = req.body.published;
  try {
    const post = await prisma.posts.update({
      where: { id: Number(id) },
      data: {
        title,
        content,
        published,
        lastUpdated: new Date(),
      },
    });

    res.json({ post });
  } catch (err) {
    return res.status(404).json({ error: "Post not found" });
  }
}

export async function deletePost(req, res) {
  const id = req.params.id;

  try {
    const deletedPost = await prisma.posts.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "Post deleted successfully", post: deletedPost });
  } catch (err) {
    return res.status(404).json({ error: "Post not found" });
  }
}
