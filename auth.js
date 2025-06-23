import NextAuth from "next-auth";

import { prisma } from "./lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.nomUtilisateur = user.nomUtilisateur;
        token.poste = user.poste;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          name: token.name,
          nomUtilisateur: token.nomUtilisateur,
          poste: token.poste,
        };
      }
      return session;
    },
  },
});
