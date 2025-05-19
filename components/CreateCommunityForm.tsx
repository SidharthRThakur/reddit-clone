"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";

export default function CreateCommunityForm() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // get mutate from SWR cache for /api/community
  const { mutate } = useSWR("/api/community");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/community", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, slug }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Error creating community");
      return;
    }

    const newCommunity = await res.json();

    // update SWR cache immediately with new community added
    mutate((communities: any[] = []) => [newCommunity, ...communities], false);

    // Optionally redirect or reset form
    setName("");
    setSlug("");
    setError("");
  }

  return (
    <form className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Community Name
        </label>
        <input
          id="name"
          name="name"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="e.g. cricket"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Create
      </button>
    </form>
  );
}
