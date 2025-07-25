"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import generateUniqueCommandeNumber from "@/lib/unique-commande-number";
import { z } from "zod";
import { actionClient } from "@/lib/safe-action-client";
import { commandeSchema } from "@/lib/schema";
import { auth } from "@/auth";

export const inputSafeCommande = actionClient
  .inputSchema(commandeSchema)
  .action(async ({ parsedInput }) => {
    const { sku, name, description, fournisseur, prix, quantite } = parsedInput;

    const session = await auth();

    const numCommande = await generateUniqueCommandeNumber();

    const newProduit = await prisma.commande.create({
      data: {
        numeroDeCommande: numCommande,
        sku: sku,
        name: name,
        description: description,
        fournisseur: fournisseur,
        quantite: quantite,
        prix: prix,
        utilisateurId: session.user.id,
      },
    });

    revalidatePath("/");
    return newProduit;
  });

export const deleteCommandeServer = async (itemId) => {
  const commande = await prisma.commande.findUnique({
    where: { id: itemId },
    include: {
      receptions: true,
      retours: true,
    },
  });

  if (!commande) {
    throw new Error("Commande introuvable");
  }

  // Supprimer les réceptions liées à la commande s'il y en a
  if (commande.receptions.length > 0) {
    await prisma.reception.deleteMany({
      where: { commandeId: itemId },
    });
  }

  // Supprimer les retours liés à la commande s'il y en a
  if (commande.retours.length > 0) {
    await prisma.retour.deleteMany({
      where: { commandeId: itemId },
    });
  }

  await prisma.commande.delete({
    where: {
      id: itemId,
    },
  });

  revalidatePath("/");
};
