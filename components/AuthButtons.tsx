//reddit-clone/app/component/AuthButton.tsx
"use client";

import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButtons() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center">
        <Image
          src={session.user?.image || "/default-avatar.png"}
          alt="User avatar"
          width={32}
          height={32}
          className="w-8 h-8 rounded-full"
        />
        <span className="ml-2">{session.user?.name}</span>
        <button
          onClick={() => signOut()}
          className="ml-4 px-3 py-1 bg-red-600 text-white rounded"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn("reddit")}
      className="px-3 py-1 bg-blue-600 text-white rounded"
    >
      Sign In with Reddit
    </button>
  );
}
