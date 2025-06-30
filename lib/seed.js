import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  try {
    // Supprimer toutes les données dans le bon ordre
    await prisma.$transaction([
      prisma.reception.deleteMany(),
      prisma.retour.deleteMany(),
      prisma.commande.deleteMany(),
      prisma.produit.deleteMany(),
      prisma.user.deleteMany(),
    ]);

    // Créer un utilisateur test
    const hashedPassword = await bcrypt.hash("test1234", 10);

    const utilisateur = await prisma.user.create({
      data: {
        email: "test@gmail.com",
        motDePasse: hashedPassword,
        name: "Test Utilisateur",
        nomUtilisateur: "testuser",
        poste: "GERANT",
        emailVerified: new Date(),
      },
    });

    // Créer des produits de pièces détachées auto
    const produits = await prisma.$transaction([
      prisma.produit.create({
        data: {
          sku: "PD-001",
          name: "Filtre à huile",
          description: "Filtre pour moteur diesel",
          fournisseur: "Bosch",
          quantite: 50,
          prix: 15.99,
        },
      }),
      prisma.produit.create({
        data: {
          sku: "PD-002",
          name: "Plaquettes de frein",
          description: "Pour Peugeot 208",
          fournisseur: "Brembo",
          quantite: 80,
          prix: 45.0,
        },
      }),
      prisma.produit.create({
        data: {
          sku: "PD-003",
          name: "Batterie 12V",
          description: "Batterie standard pour voiture",
          fournisseur: "Varta",
          quantite: 30,
          prix: 120.0,
        },
      }),
      prisma.produit.create({
        data: {
          sku: "PD-004",
          name: "Ampoule H7",
          description: "Éclairage avant",
          fournisseur: "Philips",
          quantite: 200,
          prix: 5.5,
        },
      }),
      prisma.produit.create({
        data: {
          sku: "PD-005",
          name: "Courroie de distribution",
          description: "Pour moteur 1.6L HDI",
          fournisseur: "Contitech",
          quantite: 25,
          prix: 89.9,
        },
      }),
    ]);

    // Créer des commandes
    const commandes = await Promise.all(
      produits.map((produit, i) =>
        prisma.commande.create({
          data: {
            numeroDeCommande: `CMD-AUTO-${i + 1}`,
            sku: produit.sku,
            name: produit.name ?? "",
            description: `Commande de ${produit.name}`,
            fournisseur: produit.fournisseur ?? "",
            quantite: 10 * (i + 1),
            prix: produit.prix ?? 0,
            utilisateurId: utilisateur.id,
          },
        })
      )
    );

    // Réceptions associées aux premières commandes
    await Promise.all([
      prisma.reception.create({
        data: {
          commandeId: commandes[0].id,
          utilisateurId: utilisateur.id,
          produitId: produits[0].id,
          quantite: 8,
        },
      }),
      prisma.reception.create({
        data: {
          commandeId: commandes[1].id,
          utilisateurId: utilisateur.id,
          produitId: produits[1].id,
          quantite: 10,
        },
      }),
      prisma.reception.create({
        data: {
          commandeId: commandes[2].id,
          utilisateurId: utilisateur.id,
          produitId: produits[2].id,
          quantite: 5,
        },
      }),
    ]);

    // Retours liés à certaines commandes
    await Promise.all([
      prisma.retour.create({
        data: {
          numeroDeRetour: "RET-AUTO-01",
          commandeId: commandes[0].id,
          utilisateurId: utilisateur.id,
          quantite: 2,
          motif: "Produit endommagé",
        },
      }),
      prisma.retour.create({
        data: {
          numeroDeRetour: "RET-AUTO-02",
          commandeId: commandes[1].id,
          utilisateurId: utilisateur.id,
          quantite: 1,
          motif: "Référence erronée",
        },
      }),
    ]);

    console.log("Données seedées avec succès !");
  } catch (error) {
    console.error("Erreur lors du seed :", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Exécution de la fonction
seed();
