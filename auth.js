import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { connexionSchema } from "./lib/schema";
import * as bcrypt from "bcryptjs";

// import GitHub from "next-auth/providers/github";
// import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      async authorize(data) {
        const validation = connexionSchema.safeParse(data);

        if (validation.success) {
          const { nomUtilisateur, motDePasse } = validation.data;

          const user = await prisma.user.findUnique({
            where: {
              nomUtilisateur: nomUtilisateur,
            },
          });

          if (!user || !user.motDePasse) return null;

          const isMotDePasseMatch = await bcrypt.compare(
            motDePasse,
            user.motDePasse
          );
          if (isMotDePasseMatch)
            return {
              id: user.id,
              nom: user.nom,
              prenom: user.prenom,
              nomUtilisateur: user.nomUtilisateur,
              poste: user.poste,
            };
        }

        return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.nom = user.nom;
        token.prenom = user.prenom;
        token.nomUtilisateur = user.nomUtilisateur;
        token.poste = user.poste;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          nom: token.nom,
          prenom: token.prenom,
          nomUtilisateur: token.nomUtilisateur,
          poste: token.poste,
        };
      }
      return session;
    },
  },
});
