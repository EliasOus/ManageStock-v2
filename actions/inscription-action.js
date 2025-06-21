"use server";
import { actionClient } from "@/lib/safe-action-client";
import { z } from "zod";

const inputSchema = z.object({
  nomDeEntreprise: z
    .string()
    .min(4, {
      message: "Le nom de l'entreprise doit contenir au moins 4 caractères.",
    })
    .max(20, {
      message: "Le nom l'entreprise doit contenir au max 20 caractères.",
    }),
  email: z.string().email({ message: "Email Invalide" }),
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
    const { nomDeEntreprise, email, nomUtilisateur, motDePasse } = parsedInput;
  });
