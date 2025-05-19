import { getAuthSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getAuthSession();

  if (!session?.user?.id) {
    console.log("🔴 NO SESSION ID:", session);
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const body = await req.json();
  const { title, content, communityId } = body;

  console.log("📥 POST BODY:", body);

  if (!title || !content || !communityId) {
    console.log("❌ MISSING FIELDS");
    return new NextResponse("Missing fields", { status: 400 });
  }

  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        communityId,
        authorId: session.user.id,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error("🔥 POST ERROR:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
