// shiftted to slug as slug is alredy in live condition
// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// interface CreatePostProps {
//   params: { communityId: string };
// }

// export default function CreatePost({ params }: CreatePostProps) {
//   const router = useRouter();
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [loading, setLoading] = useState(false);

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     setLoading(true);

//     const res = await fetch("/api/posts", {
//       method: "POST",
//       body: JSON.stringify({
//         title,
//         content,
//         communityId: params.communityId,
//       }),
//       headers: { "Content-Type": "application/json" },
//     });

//     if (res.ok) {
//       setTitle("");
//       setContent("");
//       router.push(`/communities/${params.communityId}`); // Go back to community page
//     } else {
//       alert("Failed to create post");
//     }
//     setLoading(false);
//   }

//   return (
//     <div className="max-w-xl mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Create a New Post</h1>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         <input
//           type="text"
//           placeholder="Post title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//           className="border border-gray-300 p-2 rounded"
//         />
//         <textarea
//           placeholder="Write your post content here..."
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           required
//           rows={6}
//           className="border border-gray-300 p-2 rounded"
//         />
//         <button
//           type="submit"
//           disabled={loading}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
//         >
//           {loading ? "Posting..." : "Create Post"}
//         </button>
//       </form>
//     </div>
//   );
// }
