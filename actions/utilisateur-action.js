"use server";
import { actionClient } from "@/lib/safe-action-client";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { utilisateurSchema } from "@/lib/schema";

export const inputSafeUtilisateur = actionClient
  .inputSchema(utilisateurSchema)
  .action(async ({ parsedInput }) => {
    const { name, nomUtilisateur, motDePasse, poste } = parsedInput;

    const newUtilisateur = await prisma.user.create({
      data: {
        name: name,
        nomUtilisateur,
        nomUtilisateur,
        motDePasse: motDePasse,
        poste: poste,
      },
    });

    revalidatePath("/");
    return newUtilisateur;
  });

export const deleteUtilisateurServer = async (itemId) => {
  const utilisateur = await prisma.user.findUnique({
    where: { id: itemId },
  });

  if (!utilisateur) {
    throw new Error("Commande introuvable");
  }

  await prisma.user.delete({
    where: {
      id: itemId,
    },
  });

  revalidatePath("/");
};
