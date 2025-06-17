"use server";
import { prisma } from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action-client";
import generateUniqueCommandeNumber from "@/lib/unique-commande-number";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const inputSchema = z.object({
  numeroDeCommande: z.string().min(4).max(20),
  quantite: z.number().int().min(1).max(99999),
  motif: z.string().min(4).max(100),
});

export const inputSafeRetour = actionClient
  .inputSchema(inputSchema)
  .action(async ({ parsedInput }) => {
    const { numeroDeCommande, quantite, motif } = parsedInput;

    const numRetour = await generateUniqueCommandeNumber();

    const commande = await prisma.commande.findUnique({
      where: {
        numeroDeCommande: numeroDeCommande,
      },
    });

    if (!commande) {
      throw new Error("Commande introuvable.");
    }

    if (commande.quantiteRetournee === 0) {
      await prisma.commande.update({
        where: {
          numeroDeCommande: numeroDeCommande,
        },
        data: {
          quantiteRetournee: quantite,
          quantiteRestante: commande.quantite - (commande.quantiteRecue + quantite),
        },
      });
    } else {
      await prisma.commande.update({
        where: {
          numeroDeCommande: numeroDeCommande,
        },
        data: {
          quantiteRetournee: commande.quantiteRetournee + quantite,
          quantiteRestante: commande.quantite - (commande.quantiteRecue + commande.quantiteRetournee  + quantite)
        },
      });
    }

    const newRetour = await prisma.retour.create({
      data: {
        numeroDeRetour: numRetour,
        commandeId: commande.id,
        utilisateurId: "cmbzannxv00001g0u1lx2438u",
        quantite: quantite,
        motif: motif,
      },
    });

    revalidatePath("/");

    return newRetour;
  });

  export const deleteRetourServer = async (itemId) => {
  const retour = await prisma.retour.findUnique({
    where: { id: itemId },
  });

  if (!retour) {
    throw new Error("Commande introuvable");
  }

  await prisma.retour.delete({
    where: {
      id: itemId,
    },
  });

  revalidatePath("/");
};
