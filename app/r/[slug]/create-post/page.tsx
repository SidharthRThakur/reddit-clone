// app/r/[slug]/create-post/page.tsx
"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug as string;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({ title, content, slug }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      router.push(`/r/${slug}`);
    } else {
      alert("Failed to create post");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 px-4">
      <h1 className="text-2xl font-semibold mb-4">Create Post in /r/{slug}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <textarea
          placeholder="Post Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Post
        </button>
      </form>
    </div>
  );
}
