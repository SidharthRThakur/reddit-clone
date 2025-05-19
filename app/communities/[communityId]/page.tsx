// reddit-clone/app/communities/[communityID]/page.tsx
import prisma from "../../../lib/prisma";

// Update the import path if the file is located elsewhere, for example:
// Update the import path to the correct location of PostCard
// Update the import path to the correct location of PostCard
import PostCard from "../../../components/PostCard";
import Link from "next/link";

interface CommunityPageProps {
  params: { communityId: string };
}

// Define a type for the post object, adjust fields as needed
type PostWithAuthor = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  author: {
    id: string;
    name: string | null;
    image: string | null;
    // add other author fields if needed
  };
  // add other post fields if needed
};

export default async function CommunityPage({ params }: CommunityPageProps) {
  const community = await prisma.community.findUnique({
    where: { id: params.communityId },
  });

  if (!community) {
    return <div>Community not found</div>;
  }

  const posts: PostWithAuthor[] = await prisma.post.findMany({
    where: { communityId: params.communityId },
    include: { author: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2">r/{community.name}</h1>
      <p className="mb-4">{community.description}</p>

      <Link
        href={`/communities/${params.communityId}/create-post`}
        className="inline-block mb-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Create Post
      </Link>

      <div className="space-y-4">
        {posts.length === 0 ? (
          <p>No posts yet. Be the first to post!</p>
        ) : (
          posts.map((post: PostWithAuthor) => (
            <PostCard key={post.id} post={post} />
          ))
        )}
      </div>
    </div>
  );
}
