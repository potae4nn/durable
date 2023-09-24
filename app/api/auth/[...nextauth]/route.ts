import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { login } from "@/service/serverService";
import type { NextAuthOptions } from "next-auth";
const APP_BASE_PATH = process.env.APP_BASE_PATH;

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const data: any = await login(credentials);
        if (data.users.status === "1") {
          return data;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  // pages: {
  //   signIn: APP_BASE_PATH + "/auth/signin",
  // },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }: any) {
      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        return true;
      } else {
        // Return false to display a default error message
        return false;
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
    async redirect({ url, baseUrl }: any) {
      return `${baseUrl}${APP_BASE_PATH}/home`;
    },
    async jwt({ token, account, user }: any) {
      return { ...token, ...user };
    },
    async session({ session, token, user, res }: any) {
      session.user = token;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
