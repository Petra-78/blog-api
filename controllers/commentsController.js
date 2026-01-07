import { prisma } from "../lib/prisma.js";

export async function getComments(req, res) {
  const postId = req.params.postId;

  const comments = await prisma.comments.findMany({
    where: {
      postId: Number(postId),
    },
    orderBy: { postedAt: "asc" },
  });

  if (!comments) {
    res.json({ message: "Be the first to leave a comment" });
  }

  res.json({ comments });
}

export async function createComment(req, res) {
  const postId = req.params.postId;
  const content = req.body.content;
  const userId = req.user.userId;

  if (!content) {
    return res.json({ error: "Comment cannot be empty" });
  }

  const comment = await prisma.comments.create({
    data: {
      content,
      postId: Number(postId),
      userId: Number(userId),
      postedAt: new Date(),
    },
  });

  res.json({ comment });
}

export async function deleteComment(req, res) {
  const commentId = req.params.id;
  const userId = req.user.userId;

  const comment = await prisma.comments.findUnique({
    where: { id: Number(commentId) },
  });

  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }

  if (comment.userId !== userId && !req.user.isAdmin) {
    return res
      .status(403)
      .json({ message: "Not allowed to delete this comment" });
  }

  await prisma.comments.delete({
    where: { id: Number(commentId) },
  });

  res.json({ message: "Comment deleted successfully" });
}
