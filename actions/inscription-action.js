"use server";
import { prisma } from "@/lib/prisma";
import { actionClient, safeActionError } from "@/lib/safe-action-client";
import { z } from "zod";
import * as bcrypt from "bcrypt";

const inputSchema = z.object({
  nom: z
    .string()
    .min(4, {
      message: "Le nom de doit contenir au moins 4 caractères.",
    })
    .max(10, {
      message: "Le nom doit contenir au max 10 caractères.",
    }),
  prenom: z
    .string()
    .min(4, {
      message: "Le prenom de doit contenir au moins 4 caractères.",
    })
    .max(10, {
      message: "Le prenom doit contenir au max 10 caractères.",
    }),
  nomUtilisateur: z
    .string()
    .min(4, {
      message: "Le nom d'utilisateur doit contenir au moins 4 caractères.",
    })
    .max(20, {
      message: "Le nom d'utilisateur doit contenir au max 20 caractères.",
    }),
  motDePasse: z
    .string()
    .min(4, {
      message: "Le nom d'utilisateur doit contenir au moins 4 caractères.",
    })
    .max(20, {
      message: "Le nom d'utilisateur doit contenir au max 20 caractères.",
    }),
});

export const inscription = actionClient
  .inputSchema(inputSchema)
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
