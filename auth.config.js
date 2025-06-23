import { prisma } from "./lib/prisma";
import { connexionSchema } from "./lib/schema";
import Credentials from "next-auth/providers/credentials";
import * as bcrypt from "bcryptjs";

const authConfig = {
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
};

export default authConfig;
