"use server";

import { prisma } from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action-client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const inputSchema = z.object({
  numeroDeCommande: z.string().min(4).max(20),
  quantite: z.number().int().min(1).max(10),
});

export const inputSafeReception = actionClient
  .inputSchema(inputSchema)
  .action(async ({ parsedInput }) => {
    const { numeroDeCommande, quantite } = parsedInput;

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

    const newReceprion = await prisma.reception.create({
      data: {
        commandeId: commande.id,
        utilisateurId: "cmbtnga9b00090s0wzndn8040",
        quantite: quantite,
      },
    });

    revalidatePath("/");

    return newReceprion;
  });
export const inputReceptionServer = async (formData) => {
  const commande = await prisma.commande.findUnique({
    where: {
      numeroDeCommande: formData.get("numeroCommande"),
    },
    select: {
      id: true,
    },
  });

  const receprion = await prisma.reception.create({
    data: {
      commandeId: commande.id,
      utilisateurId: "cmbtnga9b00090s0wzndn8040",
      quantite: parseInt(formData.get("quantite")),
    },
  });

  revalidatePath("/");
};
