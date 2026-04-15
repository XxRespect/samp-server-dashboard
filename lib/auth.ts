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
        // Validate credentials object exists
        if (!credentials) {
          console.error("[AUTH] No credentials provided");
          return null;
        }

        // Parse and validate input
        const parsed = LoginSchema.safeParse({
          Nome: credentials.Nome,
          password: credentials.password,
        });

        if (!parsed.success) {
          console.error("[AUTH] Schema validation failed:", parsed.error.flatten());
          return null;
        }

        const { Nome, password } = parsed.data;

        // Find user in database
        const user = await prisma.player.findUnique({
          where: { Nome },
          select: {
            id: true,
            Nome: true,
            Senha: true,
            Salt: true,
            Admin: true,
            role: true,
            BANNED: true
          },
        });

        if (!user) {
          console.error(`[AUTH] User not found: ${Nome}`);
          return null;
        }

        // Verify password
        const normalizedHash = user.Senha.replace(/^\$2y\$/, "$2b$");
        const isValidPassword = await bcrypt.compare(password, normalizedHash);

        if (!isValidPassword) {
          console.error(`[AUTH] Invalid password for user: ${Nome}`);
          return null;
        }

        const role = (user.role && (user.role as string) !== "") ? user.role : "USER";

        return {
          id: String(user.id),
          name: user.Nome,
          Nome: user.Nome,
          Admin: Number(user.Admin ?? 0),
          role,
          BANNED: Number(user.BANNED ?? 0),
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
        token.BANNED = user.BANNED;
        token.lastRefresh = Date.now(); // Inicializa no primeiro login
      }

      const REFRESH_INTERVAL = 1 * 60 * 1000 // 5 minutes in milliseconds
      const lastRefresh = token.lastRefresh as number | undefined;
      const shouldRefresh = !lastRefresh || Date.now() - lastRefresh > REFRESH_INTERVAL

      if (shouldRefresh) {
        try {
          const freshUser = await prisma.player.findUnique({
            where: { id: Number(token.id) },
            select: {
              id: true,
              Nome: true,
              Admin: true,
              role: true,
              BANNED: true
            },
          });

          if (!freshUser) {
            return token;
          }

          token.id = String(freshUser.id);
          token.Nome = freshUser.Nome;
          token.Admin = freshUser.Admin ?? 0;
          token.role = (freshUser.role && (freshUser.role as string) !== "") ? freshUser.role : "USER";
          token.BANNED = freshUser.BANNED ?? 0;
          token.lastRefresh = Date.now();
        } catch (error) {
          console.error("[AUTH] Error refreshing token:", error);
          return token;
        }
      }


      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.Nome = token.Nome as string;
        session.user.Admin = token.Admin as number;
        session.user.role = token.role as string;
        session.user.BANNED = token.BANNED as number;
      }

      return session;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
export const { GET, POST } = handlers;
