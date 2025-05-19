// app/api/community/route.ts
import { getAuthSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getAuthSession();

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { name, slug } = body;

  if (!name || !slug) {
    return NextResponse.json(
      { error: "Name and slug are required" },
      { status: 400 }
    );
  }

  try {
    const existing = await prisma.community.findUnique({
      where: { slug },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Slug already in use" },
        { status: 400 }
      );
    }

    const community = await prisma.community.create({
      data: {
        name,
        slug,
        creatorId: session.user.id,
      },
    });

    return NextResponse.json(community, { status: 201 });
  } catch (error) {
    console.error("[COMMUNITY_POST]", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const communities = await prisma.community.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 10, // optional limit
    });

    return NextResponse.json(communities);
  } catch (error) {
    console.error("[COMMUNITY_GET]", error);
    return NextResponse.json(
      { error: "Failed to load communities" },
      { status: 500 }
    );
  }
}
