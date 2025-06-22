"use server";
import { prisma } from "@/lib/prisma";
import { actionClient, safeActionError } from "@/lib/safe-action-client";
import * as bcrypt from "bcrypt";
import { inscriptionSchema } from "@/lib/schema";

export const inscription = actionClient
  .inputSchema(inscriptionSchema)
  .action(async ({ parsedInput }) => {
    const { nom, prenom, nomUtilisateur, motDePasse } = parsedInput;

    const existingUser = await prisma.user.findUnique({
      where: { nomUtilisateur },
    });

    if (existingUser) {
      return { status: "error", message: "Ce nom d'utilisateur existe déjà." };
    }

    const salt = await bcrypt.genSalt(10);
    const mdpHash = await bcrypt.hash(motDePasse, salt);

    const newUser = await prisma.user.create({
      data: {
        nom: nom,
        prenom: prenom,
        nomUtilisateur: nomUtilisateur,
        motDePasse: mdpHash,
        poste: "GERANT",
      },
    });

    return { status: "success", data: newUser };
  });
