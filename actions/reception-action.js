"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

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
