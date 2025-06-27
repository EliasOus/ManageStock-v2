"use server";
import { signIn, signOut } from "@/auth";
import { generateVerificationToke } from "@/lib/generat-token";
import { sendVerificationEmail } from "@/lib/mailer";
import { prisma } from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action-client";
import { connexionSchema } from "@/lib/schema";
import { AuthError } from "next-auth";
import * as bcrypt from "bcryptjs";

export const connexion = actionClient
  .inputSchema(connexionSchema)
  .action(async ({ parsedInput }) => {
    // const { nomUtilisateur, motDePasse } = parsedInput;
    const { email, motDePasse } = parsedInput;

    const user = await prisma.user.findUnique({ where: { email } });
    console.log(JSON.stringify(user));
    if (!user || !user.email || !user.motDePasse)
      return { status: "error", message: "utilisateur Invalide" };

    const isMotDePasseMatch = await bcrypt.compare(motDePasse, user.motDePasse);
    if (!isMotDePasseMatch) {
      return { status: "error", message: "Utilisateur ou mot de passe invalide." };
    }

    console.log(!user.emailVerified);
    if (!user.emailVerified) {
      const verificationToken = await generateVerificationToke(email);
      await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token
      );

      return {
        status: "success",
        message: "Veuillez vérifier votre email pour vous connecter.",
      };
    }

    try {
      await signIn("credentials", {
        email,
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
