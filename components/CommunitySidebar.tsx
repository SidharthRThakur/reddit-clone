"use client";

import Link from "next/link";
import useSWR from "swr";

type Community = { id: string; name: string; slug: string };

const fetcher = <T = unknown,>(url: string): Promise<T> =>
  fetch(url).then((res) => res.json());

export default function CommunitySidebar() {
  const {
    data: communities,
    error,
    mutate,
  } = useSWR<Community[]>("/api/community", fetcher);

  if (error) return <div>Error loading communities</div>;
  if (!communities) return <div>Loading...</div>;

  return (
    <aside className="w-64 shrink-0 border-r p-4 space-y-1 bg-white">
      <h2 className="font-semibold text-lg mb-3">Communities</h2>
      {communities.length === 0 && (
        <p className="text-sm text-muted">No communities yet</p>
      )}
      {communities.map((c) => (
        <Link
          key={c.id}
          href={`/r/${c.slug}`}
          className="block rounded px-2 py-1 hover:bg-neutral-100"
        >
          r/{c.slug}
          <span className="block text-xs text-muted-foreground">{c.name}</span>
        </Link>
      ))}
    </aside>
  );
}
