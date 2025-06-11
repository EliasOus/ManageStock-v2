"use server";

import { prisma } from "@/lib/prisma";
import { nanoid } from "nanoid";

async function generateUniqueCommandeNumber() {
  let isUnique = false;
  let numero;

  while (!isUnique) {
    // Exemple : CMD-ABC123
    numero = "CMD-" + Math.random().toString(36).substring(2, 8).toUpperCase();

    const existing = await prisma.commande.findUnique({
      where: { numeroDeCommande: numero },
    });

    if (!existing) {
      isUnique = true;
    }
  }

  return numero;
}

export const inputFormServer = async (formData) => {
  const numCommande = await generateUniqueCommandeNumber();

  console.log(numCommande);
  const nouveauProduit = await prisma.commande.create({
    data: {
      numeroDeCommande: numCommande,
      sku: formData.get("sku"),
      nomProduit: formData.get("nom"),
      description: formData.get("description"),
      fournisseur: formData.get("fournisseur"),
      quantite: parseInt(formData.get("quantite")),
      prix: parseFloat(formData.get("prix")),
      utilisateurId: "cmbsdurui00003q0wryi39l2e",
    },
  });

  return nouveauProduit;
};
