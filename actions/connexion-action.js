"use server";
import { actionClient } from "@/lib/safe-action-client";
import { z } from "zod";

const inputSchema = z.object({
  nomUtilisateur: z.string().min(4).max(20),
  motDePasse: z.string().min(4).max(20),
});

export const connexion = actionClient
  .inputSchema(inputSchema)
  .action(async ({ parsedInput }) => {
    const { nomUtilisateur, motDePasse } = parsedInput;

    console.log("elias" + nomUtilisateur);
    console.log("elias" + motDePasse);
  });
