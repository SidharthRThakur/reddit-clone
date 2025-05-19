// reddit.clone/prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create a user
  const user = await prisma.user.upsert({
    where: { email: "demo@user.com" },
    update: {},
    create: {
      email: "demo@user.com",
      username: "demo_user",
    },
  });

  // Create a community
  const community = await prisma.community.upsert({
    where: { slug: "javascript" },
    update: {},
    create: {
      name: "JavaScript",
      slug: "javascript",
    },
  });

  // Create a post
  await prisma.post.create({
    data: {
      title: "Welcome to JavaScript!",
      content: "This is the first post in the JavaScript community.",
      authorId: user.id,
      communityId: community.id,
    },
  });

  console.log("✅ Seed complete.");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
