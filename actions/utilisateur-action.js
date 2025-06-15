"use server";
import { actionClient } from "@/lib/safe-action-client";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const inputSchema = z.object({
  nom: z.string().min(3).max(10),
  prenom: z.string().min(3).max(10),
  nomUtilisateur: z.string().min(3).max(10),
  motDePasse: z.string().min(4).max(10),
  poste: z.enum(["GERANT", "GESTIONNAIRE", "TRAVAILLEUR"]),
});

export const inputSafeUtilisateur = actionClient
  .inputSchema(inputSchema)
  .action(async ({ parsedInput }) => {
    console.log("---- utilisateur -----");
    const { nom, prenom, nomUtilisateur, motDePasse, poste } = parsedInput;

    const newUtilisateur = await prisma.utilisateur.create({
      data: {
        nom: nom,
        prenom: prenom,
        nomUtilisateur,
        nomUtilisateur,
        motDePasse: motDePasse,
        poste: poste,
      },
    });

    revalidatePath("/");
    return newUtilisateur;
  });
