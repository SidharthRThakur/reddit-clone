// app/generated/prisma/singleton.ts

import { PrismaClient } from "."; // imports from current folder (index.ts)

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"], // optional: to log prisma queries for debugging
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
