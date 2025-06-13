"use server";
import { prisma } from "@/lib/prisma";
import generateUniqueCommandeNumber from "@/lib/unique-commande-number";
import { revalidatePath } from "next/cache";

export const inputRetourServer = async (formData) => {
  const numRetour = await generateUniqueCommandeNumber();

  const commande = await prisma.commande.findUnique({
    where: {
      numeroDeCommande: formData.get("NumeroCommande"),
    },
    select:{
        id:true,
    }
  });

    const retour = await prisma.retour.create({
      data: {
        numeroDeRetour: numRetour,
        commandeId: commande.id,
        utilisateurId: "cmbtnga9b00090s0wzndn8040",
        quantite:parseInt(formData.get("quantite")),
        motif: formData.get("motif"),
      },
    });

  revalidatePath("/");
};
