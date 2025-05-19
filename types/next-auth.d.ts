import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // ✅ ensure this is declared
      name: string;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string;
    name: string;
    email?: string | null;
    image?: string | null;
  }
}
