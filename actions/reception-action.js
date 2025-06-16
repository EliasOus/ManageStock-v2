"use server";

import { prisma } from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action-client";
import { revalidatePath } from "next/cache";
import { date, z } from "zod";

const inputSchema = z.object({
  numeroDeCommande: z.string().min(4).max(20),
  quantite: z.number().int().min(1).max(99999),
});

export const inputSafeReception = actionClient
  .inputSchema(inputSchema)
  .action(async ({ parsedInput }) => {
    const { numeroDeCommande, quantite } = parsedInput;

    const commande = await prisma.commande.findUnique({
      where: {
        numeroDeCommande: numeroDeCommande,
      },
    });

    if (!commande) {
      throw new Error("Commande introuvable.");
    }

    if (commande.quantiteRestante === 0) {
      await prisma.commande.update({
        where: {
          numeroDeCommande: numeroDeCommande,
        },
        data: {
          quantiteRecue: quantite,
          quantiteRestante: commande.quantite - quantite,
        },
      });
    } else {
      await prisma.commande.update({
        where: {
          numeroDeCommande: numeroDeCommande,
        },
        data: {
          quantiteRecue: commande.quantiteRecue + quantite,
          quantiteRestante: commande.quantiteRestante - quantite,
        },
      });
    }

    const newReception = await prisma.reception.create({
      data: {
        commandeId: commande.id,
        utilisateurId: "cmbzannxv00001g0u1lx2438u",
        quantite: quantite,
      },
    });

    const existingProduit = await prisma.produit.findUnique({
      where: {
        sku: commande.sku,
      },
    });

    if (!existingProduit) {
      await prisma.produit.create({
        data: {
          sku: commande.sku,
          nom: commande.nom,
          description: commande.description,
          fournisseur: commande.fournisseur,
          quantite: quantite,
          prix: commande.prix,
        },
      });
    } else {
      await prisma.produit.update({
        where: {
          sku: commande.sku,
        },
        data: {
          quantite: existingProduit.quantite + quantite,
        },
      });
    }

    revalidatePath("/");

    return newReception;
  });
