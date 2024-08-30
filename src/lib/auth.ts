import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "./server-utils";
import { authSchema } from "./validations";

const config = {
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        // runs on login

        // validation
        const validatedFormData = authSchema.safeParse(credentials);
        if (!validatedFormData.success) {
          return null;
        }

        // extract values
        const { email, password } = validatedFormData.data;

        const user = await getUserByEmail(email);
        if (!user) {
          return null;
        }

        const passwordsMatch = await bcrypt.compare(
          password,
          user.hashedPassword,
        );
        if (!passwordsMatch) {
          return null;
        }

        return user;
      },
    }),
  ],
  callbacks: {
    authorized: ({ auth, request }) => {
      // runs on every request with middleware
      const isLoggedIn = Boolean(auth?.user);

      if (
        !isLoggedIn &&
        (request.nextUrl.pathname.includes("/orders") ||
          request.nextUrl.pathname.includes("/account"))
      ) {
        return Response.redirect(new URL("/login", request.nextUrl));
      }

      if (
        isLoggedIn &&
        (request.nextUrl.pathname.includes("/login") ||
          request.nextUrl.pathname.includes("/register"))
      ) {
        return Response.redirect(new URL("/", request.nextUrl));
      }

      if (isLoggedIn) {
        return true;
      }

      if (!isLoggedIn) {
        return true;
      }

      return false;
    },
    jwt: async ({ token, user, trigger }) => {
      // runs on every request
      if (user) {
        // on sign in
        token.email = user.email!;
        token.hasAccess = user.hasAccess;
        token.userId = user.id;
      }

      if (trigger === "update") {
        // on every request where trigger is "update"
        const userFromDb = await getUserByEmail(token.email);
        if (userFromDb) {
          token.hasAccess = userFromDb.hasAccess;
        }
      }

      return token;
    },
    session: ({ session, token }) => {
      // runs every time the session is called
      session.user.hasAccess = token.hasAccess;
      session.user.id = token.userId;

      return session;
    },
  },
} satisfies NextAuthConfig;

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(config);
