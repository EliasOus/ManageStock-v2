"use server";
import { actionClient } from "@/lib/safe-action-client";
import { z } from "zod";

const inputSchema = z.object({
  nomDeEntreprise: z.string().min(4).max(20),
  email: z.string().email().min(4).max(20),
  nomUtilisateur: z.string().min(4).max(20),
  motDePasse: z.string().min(4).max(20),
});

export const inscription = actionClient
  .inputSchema(inputSchema)
  .action(async ({ parsedInput }) => {
    const { nomDeEntreprise, email, nomUtilisateur, motDePasse } = parsedInput;
  });
