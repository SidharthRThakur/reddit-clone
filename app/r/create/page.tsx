"use client";
import { useState, useEffect } from "react";

export default function CreateCommunityPage() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showContent, setShowContent] = useState(true); // 👈 control UI visibility

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!name || !slug) {
      setError("Both fields are required.");
      return;
    }

    try {
      const res = await fetch("/api/community", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, slug }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        return;
      }

      setSuccess(true);
      setName("");
      setSlug("");

      // ⏳ Hide content after 2 seconds
      setTimeout(() => {
        setShowContent(false);
      }, 2000);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  if (!showContent) return null; // 👈 Hides everything once done

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded-lg shadow-md bg-white dark:bg-zinc-900">
      <h1 className="text-xl font-semibold mb-4">Create a Community</h1>

      {success ? (
        <div className="text-green-600 text-md font-medium">
          ✅ Community created successfully!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Community Name
            </label>
            <input
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
              placeholder="e.g. Cricket Lovers"
            />
          </div>

          <div>
            <label
              htmlFor="slug"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Slug
            </label>
            <input
              id="slug"
              name="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
              placeholder="e.g. cricket"
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Create
          </button>
        </form>
      )}
    </div>
  );
}
