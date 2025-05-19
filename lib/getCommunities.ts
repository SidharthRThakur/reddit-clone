// reddit-clone/lib/getCommunities.ts
import { PrismaClient } from "@/app/generated/prisma";
const prisma = new PrismaClient();

export async function getCommunities() {
  return prisma.community.findMany({
    orderBy: { createdAt: "desc" }, // newest first
    select: { id: true, name: true, slug: true },
  });
}
