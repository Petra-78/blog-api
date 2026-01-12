import { prisma } from "../lib/prisma.js";

export async function getAllComments(req, res) {
  const allComments = await prisma.comments.findMany();
  res.json(allComments);
}

export async function getComments(req, res) {
  const postId = Number(req.params.postId);

  const comments = await prisma.comments.findMany({
    where: {
      postId: postId,
    },
    orderBy: {
      postedAt: "asc",
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });

  res.json({ comments });
}

export async function createComment(req, res) {
  const postId = Number(req.params.postId);
  const content = req.body.content?.trim();
  const userId = req.user.userId;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (!content) {
    return res.status(400).json({ message: "Comment cannot be empty" });
  }

  const MAX_COMMENT_LENGTH = 1000;
  if (content.length > MAX_COMMENT_LENGTH) {
    return res.status(400).json({
      message: `Comment cannot exceed ${MAX_COMMENT_LENGTH} characters.`,
    });
  }

  const lastComment = await prisma.comments.findFirst({
    where: { userId },
    orderBy: { postedAt: "desc" },
  });

  const RATE_LIMIT_MS = 5000;
  if (lastComment) {
    const now = Date.now();
    const lastTime = new Date(lastComment.postedAt).getTime();
    if (now - lastTime < RATE_LIMIT_MS) {
      return res
        .status(429)
        .json({ message: "Slow down! You are commenting too fast." });
    }
  }

  const comment = await prisma.comments.create({
    data: {
      content,
      postId,
      userId,
      postedAt: new Date(),
    },
    include: {
      user: {
        select: { username: true },
      },
    },
  });

  res.status(201).json(comment);
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
