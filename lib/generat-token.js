import { prisma } from "./prisma";
import { randomUUID } from "node:crypto";

export const generateVerificationToke = async (email) => {
  const verificationToken = await prisma.verificationToken.findFirst({
    where: { email },
  });

  if (verificationToken) {
    await prisma.verificationToken.delete({
      where: { id: verificationToken.id },
    });
  }

  const newVerificationToken = await prisma.verificationToken.create({
    data: {
      token: randomUUID(),
      expire: new Date(new Date().getTime() + 3600000),
      email,
    },
  });

  return newVerificationToken;
};
