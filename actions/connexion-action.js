"use server";
import { signIn, signOut } from "@/auth";
import { actionClient } from "@/lib/safe-action-client";
import { connexionSchema } from "@/lib/schema";
import { AuthError } from "next-auth";

export const connexion = actionClient
  .inputSchema(connexionSchema)
  .action(async ({ parsedInput }) => {
    const { nomUtilisateur, motDePasse } = parsedInput;

    try {
      await signIn("credentials", {
        nomUtilisateur,
        motDePasse,
        redirectTo: "/dashboard",
      });
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return {
              status: "error",
              message: "Nom d'utilisateur ou le Mote De Passe Invalide",
            };

          default:
            return {
              status: "error",
              message: "Nom d'utilisateur ou le Mote De Passe Invalide",
            };
        }
      }
      throw error;
    }

    return { status: "success" };
  });

export const deconnexion = async () => {
  await signOut();
};
