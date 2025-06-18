"use server";

import { prisma } from "@/lib/prisma";

export async function rechercheProduits(query) {
  const produits = await prisma.produit.findMany({
    where: {
      OR: [
        { nom: { contains: query, mode: "insensitive" } },
        { sku: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ],
    },
    take: 20,
  });

  return produits;
}
