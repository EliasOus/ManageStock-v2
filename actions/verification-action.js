"use server";

import { prisma } from "@/lib/prisma";

export default async function verificationEmailAcation(token) {
  try {
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    });

    if (!verificationToken)
      return { status: "error", message: "Le lien est invalide ou manquant. Veuillez vérifier votre e-mail ou demander un nouveau lien de vérification." };

    const isExpired = new Date(verificationToken.expire) < new Date();

    if (isExpired)
      return {
        status: "error",
        message:
          "Ce lien de vérification a expiré. Veuillez vérifier votre e-mail ou demander un nouveau lien de vérification.",
      };

    const user = await prisma.user.findUnique({
      where: { email: verificationToken.email },
    });

    if (!user) return { status: "error", message: "utilisateur Introuvable" };

    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: new Date(),
      },
    });

    await prisma.verificationToken.delete({
      where: { id: verificationToken.id },
    });

    return {
      status: "success",
      message: "Votre adresse e-mail est confirmée. Vous pouvez maintenent vous connecte à l'application.",
    };
  } catch (error) {
    console.log(error);
    return { status: "error", message: "Quelque Chose s'est Mal Passé" };
  }
}
