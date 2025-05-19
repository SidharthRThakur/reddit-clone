"use client";
import {
  MagnifyingGlassIcon,
  BellIcon,
  PlusIcon,
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  MegaphoneIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { Home, LogIn, LogOut } from "lucide-react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 bg-white shadow px-4 py-2">
      <div className="max-w-10xl mx-left flex items-center justify-between">
        {/* Logo & Name */}
        <div className="cursor-pointer flex-shrink-0">
          <Image
            src="/Reddit-Logo.png"
            alt="Reddit logo"
            width={82}
            height={42}
          />
        </div>

        <HomeIcon className="h-6 w-6 cursor-pointer text-gray-600" />

        {/* 🔸 Center: Search bar */}
        <form className="flex flex-1 max-w-5xl mx-4 bg-gray-100 rounded-full items-center px-4 py-2 shadow-inner">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search Reddit"
            className="bg-transparent outline-none px-2 w-full text-sm text-gray-700"
          />
          <button type="submit" hidden />
        </form>

        {/* 🔸 Right: Action Icons */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <ChatBubbleLeftEllipsisIcon className="h-6 w-6 cursor-pointer text-gray-600" />
          <MegaphoneIcon className="h-6 w-6 cursor-pointer text-gray-600" />
          <BellIcon className="h-6 w-6 cursor-pointer text-gray-600" />

          {/* ✅ Create Community Link */}
          <Link
            href="/r/create"
            className="text-black-500 font-medium"
            title="Create Community"
          >
            <PlusIcon className="h-6 w-6 cursor-pointer text-gray-600" />
          </Link>
        </div>

        {/* 🔐 Sign In / Out */}
        {session ? (
          <div
            onClick={() => signOut()}
            className="cursor-pointer flex items-center space-x-2 p-1"
          >
            <Image
              src={session.user?.image || "/redditroundlogo.png"}
              alt="User Avatar"
              width={32}
              height={32}
              className="rounded-full"
            />
            <p className="text-gray-500 text-sm">Sign Out</p>
          </div>
        ) : (
          <div
            onClick={() => signIn("reddit")}
            className="cursor-pointer flex items-center space-x-2 p-1"
          >
            <Image
              src="/redditroundlogo.png"
              alt="Sign-in"
              width={32}
              height={32}
            />
            <p className="text-gray-500 text-sm">Sign In</p>
          </div>
        )}
      </div>
    </header>
  );
}
// export default function Header() {
//   const { data: session } = useSession();

//   return (
//     <header className="flex items-center justify-between p-4 bg-gray-100 border-b">
//       {/* Logo / Home link */}
//       <Link
//         href="/"
//         className="flex items-center gap-2 text-xl font-bold text-blue-600"
//       >
//         <Home size={24} />
//         Reddit Clone
//       </Link>

//       {/* Right Side: Auth + User Info */}
//       <div className="flex items-center gap-4">
//         {session?.user ? (
//           <>
//             <Image
//               src={session.user.image ?? ""}
//               alt="avatar"
//               className="w-8 h-8 rounded-full"
//             />
//             <span>{session.user.name}</span>
//             <button
//               onClick={() => signOut()}
//               className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded"
//             >
//               <LogOut size={16} />
//               Sign Out
//             </button>
//           </>
//         ) : (
//           <button
//             onClick={() => signIn("reddit")}
//             className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded"
//           >
//             <LogIn size={16} />
//             Sign In
//           </button>
//         )}
//       </div>
//     </header>
//   );
// }
