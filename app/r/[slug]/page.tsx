export const dynamic = "force-dynamic";

import prisma from "@/lib/prisma";
import { getAuthSession } from "@/lib/auth";
import Link from "next/link";
import PostCard from "@/components/PostCard";
import CreatePostForm from "@/components/CreatePostForm";
import { notFound } from "next/navigation";

interface Props {
  params: { slug: string };
}

export default async function CommunityPage({ params }: Props) {
  const session = await getAuthSession();

  const community = await prisma.community.findUnique({
    where: { slug: params.slug },
    include: {
      posts: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!community) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-4">/r/{community.name}</h1>

      {community.posts.length === 0 ? (
        <>
          <p className="text-gray-500 italic mb-4">
            No posts yet. Be the first!
          </p>
          {session && (
            <CreatePostForm communityId={community.id} slug={community.slug} />
          )}
        </>
      ) : (
        <>
          {community.posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}

          {session && (
            <div className="mt-6 text-center">
              <Link
                href={`/r/${community.slug}/create-post`}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Create New Post
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}
