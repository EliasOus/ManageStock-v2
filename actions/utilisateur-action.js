"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const inputUtilisateurServer = async (FormData) => {
  const utilisateur = await prisma.utilisateur.create({
    data: {
      nom: FormData.get("nom"),
      prenom: FormData.get("prenom"),
      nomUtilisateur: FormData.get("nomUtilisateur"),
      motDePasse: FormData.get("Password"),
      poste: FormData.get("poste"),
    },
  });
  revalidatePath("/");
};
