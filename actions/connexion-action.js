"use server";
import { actionClient } from "@/lib/safe-action-client";
import { connexionSchema } from "@/lib/schema";

export const connexion = actionClient
  .inputSchema(connexionSchema)
  .action(async ({ parsedInput }) => {
    const { nomUtilisateur, motDePasse } = parsedInput;
  });
