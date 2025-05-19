import { Post } from "@prisma/client";

interface Props {
  post: Post;
}

export default function PostCard({ post }: Props) {
  return (
    <div className="border p-4 rounded shadow mb-4">
      <h2 className="text-xl font-semibold">{post.title}</h2>
      <p className="text-gray-700">{post.content}</p>
      <p className="text-sm text-gray-400 mt-2">
        Posted at {new Date(post.createdAt).toLocaleString()}
      </p>
    </div>
  );
}
