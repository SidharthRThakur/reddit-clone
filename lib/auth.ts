// lib/auth.ts
import { getServerSession, type NextAuthOptions } from "next-auth";
import RedditProvider from "next-auth/providers/reddit";

export const authOptions: NextAuthOptions = {
  providers: [
    RedditProvider({
      clientId: process.env.REDDIT_CLIENT_ID!,
      clientSecret: process.env.REDDIT_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      console.log("🟡 JWT callback:", { token, account });

      // ✅ Add this line to ensure the token has an ID
      if (!token.id && token.sub) {
        token.id = token.sub;
      }

      return token;
    },
    async session({ session, token }) {
      console.log("🟢 SESSION callback:", { session, token });

      // ✅ Attach the token.id to session.user.id
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// ✅ Must export this for server-only calls
export function getAuthSession() {
  return getServerSession(authOptions);
}
