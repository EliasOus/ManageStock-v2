import { prisma } from "./lib/prisma";
import { connexionSchema } from "./lib/schema";
import Credentials from "next-auth/providers/credentials";
import * as bcrypt from "bcryptjs";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

const authConfig = {
  providers: [
    Credentials({
      async authorize(data) {
        const validation = connexionSchema.safeParse(data);

        if (validation.success) {
          const { email, motDePasse } = validation.data;

          const user = await prisma.user.findUnique({
            where: {
              email: email,
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
              email: user.email,
              name: user.name,
              nomUtilisateur: user.nomUtilisateur,
              poste: user.poste,
            };
        }

        return false;
      },
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
};

export default authConfig;
