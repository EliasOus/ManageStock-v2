"use server";

import { prisma } from "@/lib/prisma";

export async function rechercheProduits(query) {
  const produits = await prisma.produit.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { sku: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ],
    },
    select: {
      id: true,
      sku: true,
      name: true,
      fournisseur: true,
      quantite: true,
      prix: true,
    },
    take: 20,
  });

  return produits;
}
