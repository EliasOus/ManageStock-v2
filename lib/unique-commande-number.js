import { nanoid } from "nanoid";

export default async function generateUniqueCommandeNumber() {
  let isUnique = false;
  let numero;

  while (!isUnique) {
    numero = "CMD-" + nanoid(10);

    const existing = await prisma.commande.findUnique({
      where: { numeroDeCommande: numero },
    });

    if (!existing) {
      isUnique = true;
    }
  }

  return numero;
}
