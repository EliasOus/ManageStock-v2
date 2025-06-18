import { prisma } from "./prisma";

export async function nbrProduitsEnStock() {
  const produits = await prisma.produit.findMany({
    select: {
      id: true,
    },
  });

  return produits.length;
}

export async function nbrCommandeEnStock() {
  const commandes = await prisma.commande.findMany({
    select: {
      id: true,
    },
  });

  return commandes.length;
}

export async function ValeurTotaleStock() {
  let total = 0;

  const commandes = await prisma.produit.findMany({
    select: {
      quantite: true,
      prix: true,
    },
  });

  commandes.map((commande, index) => {
    total += commande.quantite * commande.prix;
  });

  return total;
}
