// // reddit-clone/app/layout.tsx
// import "./globals.css";
// import { ReactNode } from "react";
// import SessionWrapper from "./providers/SessionWrapper";
// import Header from "./components/Header";
// import Sidebar from "@/components/Sidebar";

// export default function RootLayout({ children }: { children: ReactNode }) {
//   return (
//     <html lang="en">
//       <body>
//         <SessionWrapper>
//           <Header />

//           <div className="flex">
//             <Sidebar />
//             <main className="flex-1 p-4 max-w-4xl mx-auto">{children}</main>
//           </div>
//         </SessionWrapper>
//       </body>
//     </html>
//   );
// }
//--------------//
// import "./globals.css";
// import { ReactNode } from "react";
// import SessionWrapper from "./providers/SessionWrapper";
// import Header from "./components/Header"; // ✅ Make sure this path is correct

// export default function RootLayout({ children }: { children: ReactNode }) {
//   return (
//     <html lang="en">
//       <body>
//         <SessionWrapper>
//           <Header />
//           <main className="max-w-4xl mx-auto px-4 py-6">{children}</main>
//         </SessionWrapper>
//       </body>
//     </html>
//   );
// }
//side bar//
// app/layout.tsx
import "./globals.css";
import { ReactNode } from "react";
import SessionWrapper from "./providers/SessionWrapper";
import Header from "../components/Header";
import CommunitySidebar from "../components/CommunitySidebar"; // ⬅️ add this

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <SessionWrapper>
          <Header />

          {/* --- page body: sidebar + main --- */}
          <div className="flex flex-1">
            <CommunitySidebar /> {/* LEFT */}
            <main className="flex-1 max-w-4xl mx-auto px-4 py-6">
              {children} {/* CENTER */}
            </main>
          </div>
        </SessionWrapper>
      </body>
    </html>
  );
}
