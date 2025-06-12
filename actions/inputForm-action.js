"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import generateUniqueCommandeNumber from "@/lib/unique-commande-number"

export const inputFormServer = async (formData) => {
  const numCommande = await generateUniqueCommandeNumber();

  const nouveauProduit = await prisma.commande.create({
    data: {
      numeroDeCommande: numCommande,
      sku: formData.get("sku"),
      nom: formData.get("nom"),
      description: formData.get("description"),
      fournisseur: formData.get("fournisseur"),
      quantite: parseInt(formData.get("quantite")),
      prix: parseFloat(formData.get("prix")),
      utilisateurId: "cmbtnga9b00090s0wzndn8040",
    },
  });

  revalidatePath("/");
};