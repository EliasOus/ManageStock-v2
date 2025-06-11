"use server";

import { prisma } from "@/lib/prisma";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";

async function generateUniqueCommandeNumber() {
  let isUnique = false;
  let numero;

  while (!isUnique) {
    numero = "CMD-" + nanoid(10);

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

  const nouveauProduit = await prisma.commande.create({
    data: {
      numeroDeCommande: numCommande,
      sku: formData.get("sku"),
      nom: formData.get("nom"),
      description: formData.get("description"),
      fournisseur: formData.get("fournisseur"),
      quantite: parseInt(formData.get("quantite")),
      prix: parseFloat(formData.get("prix")),
      utilisateurId: "cmbsdurui00003q0wryi39l2e",
    },
  });

  revalidatePath("/");
};