import { prisma } from "../config/prisma.js";

export async function listPosts() {
  return prisma.post.findMany({ orderBy: { createdAt: "desc" } });
}

export async function createPost(input: { title: string; content: string }) {
  return prisma.post.create({ data: input });
}

export async function searchPosts(q: string) {
  return prisma.post.findMany({
    where: {
      OR: [{ title: { contains: q } }, { content: { contains: q } }],
    },
    orderBy: { createdAt: "desc" },
    take: 20,
  });
}
