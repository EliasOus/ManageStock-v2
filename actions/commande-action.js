"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import generateUniqueCommandeNumber from "@/lib/unique-commande-number";
import { z } from "zod";
import { actionClient } from "@/lib/safe-action-client";

const inputschema = z.object({
  sku: z.string().min(3).max(10),
  nom: z.string().min(3).max(20),
  description: z.string().min(3).max(50),
  fournisseur: z.string().min(3).max(20),
  prix: z.number().min(.001).max(99999.99),
  quantite: z.number().int().min(1).max(99999),
});

export const inputSafeCommande = actionClient
  .inputSchema(inputschema)
  .action(async ({ parsedInput }) => {
    const { sku, nom, description, fournisseur, prix, quantite } = parsedInput;

    const numCommande = await generateUniqueCommandeNumber();

    const newProduit = await prisma.commande.create({
      data: {
        numeroDeCommande: numCommande,
        sku: sku,
        nom: nom,
        description: description,
        fournisseur: fournisseur,
        quantite: quantite,
        prix: prix,
        utilisateurId: "cmbzannxv00001g0u1lx2438u",
      },
    });

    revalidatePath("/");
    return newProduit;
  });
