import bcrypt from "bcrypt";
import NextAuth, { type NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { prisma } from "@/lib/prisma";
import { LoginSchema } from "@/schemas/login.schema";

export const authConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        Nome: { label: "Nome", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = LoginSchema.safeParse(credentials);

        if (!parsed.success) {
          return null;
        }

        const { Nome, password } = parsed.data;

        const user = await prisma.player.findUnique({
          where: { Nome },
          select: {
            id: true,
            Nome: true,
            Senha: true,
            Admin: true,
            role: true,
          },
        });

        if (!user) {
          return null;
        }

        const normalizedHash = user.Senha.replace(/^\$2y\$/, "$2b$");
        const isValidPassword = await bcrypt.compare(password, normalizedHash);

        if (!isValidPassword) {
          return null;
        }

        const role = user.role ?? "user";

        return {
          id: String(user.id),
          name: user.Nome,
          Nome: user.Nome,
          Admin: Number(user.Admin ?? 0),
          role,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.Nome = user.Nome;
        token.Admin = user.Admin;
        token.role = user.role;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.Nome = token.Nome as string;
        session.user.Admin = token.Admin as number;
        session.user.role = token.role as string;
      }

      return session;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
export const { GET, POST } = handlers;
