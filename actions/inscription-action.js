"use server";
import { prisma } from "@/lib/prisma";
import { actionClient, safeActionError } from "@/lib/safe-action-client";
import * as bcrypt from "bcryptjs";
import { inscriptionSchema } from "@/lib/schema";
import { generateVerificationToke } from "@/lib/generat-token";
import { sendVerificationEmail } from "@/lib/mailer";

export const inscription = actionClient
  .inputSchema(inscriptionSchema)
  .action(async ({ parsedInput }) => {
    const { email, name, nomUtilisateur, motDePasse } = parsedInput;
    try {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return {
          status: "error",
          message: "Ce nom d'utilisateur existe déjà.",
        };
      }

      const salt = await bcrypt.genSalt(10);
      const mdpHash = await bcrypt.hash(motDePasse, salt);

      const newUser = await prisma.user.create({
        data: {
          email: email,
          name: name,
          nomUtilisateur: nomUtilisateur,
          motDePasse: mdpHash,
          poste: "GERANT",
        },
      });
      
      const verificationToken = await generateVerificationToke(email);
      await sendVerificationEmail(verificationToken.email, verificationToken.token);
      return {
        status: "success",
        message: "Email de verification envoye, vérifiez votre email",
      };
    } catch (error) {
      console.log(error + "898998");
      return { status: "error", message: "Ce nom d'utilisateur existe déjà." };
    }
  });
