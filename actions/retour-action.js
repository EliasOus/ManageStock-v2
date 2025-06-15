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
      select: {
        id: true,
      },
    });

    if (!commande) {
      throw new Error("Commande introuvable.");
    }

    const newRetour = await prisma.retour.create({
      data: {
        numeroDeRetour: numRetour,
        commandeId: commande.id,
        utilisateurId: "cmbtnga9b00090s0wzndn8040",
        quantite: quantite,
        motif: motif,
      },
    });

    revalidatePath("/");

    return newRetour;
  });
