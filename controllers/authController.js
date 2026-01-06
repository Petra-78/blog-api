import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt";

async function postLogin(req, res) {
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.users.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    return res.status(401).json({ message: "Invalid email" });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({ message: "Invalid password" });
  }

  res.json({
    id: user.id,
    username: user.username,
    email: user.email,
    isAdmin: user.isAdmin,
  });
}

export { postLogin };
