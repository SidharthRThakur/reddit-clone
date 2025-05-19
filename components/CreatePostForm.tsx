"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  communityId: string; // ✅ Must be passed from parent page
  slug: string;
}

export default function CreatePostForm({ communityId, slug }: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
        communityId, // ✅ Correct field name
      }),
    });

    if (res.ok) {
      setTitle("");
      setContent("");
      router.refresh(); // ✅ Auto-refresh the posts
    } else {
      alert("Failed to create post");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border p-4 rounded shadow space-y-4 mb-6"
    >
      <h2 className="text-lg font-semibold">Create a Post</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
        className="w-full p-2 border rounded"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        required
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
}
