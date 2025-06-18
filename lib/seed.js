import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  try {
    // Supprimer toutes les données (ordre important à cause des relations)
    await prisma.$transaction([
      prisma.reception.deleteMany(),
      prisma.retour.deleteMany(),
      prisma.commande.deleteMany(),
      prisma.produit.deleteMany(),
      prisma.utilisateur.deleteMany(),
    ]);

    // Créer un utilisateur
    const utilisateur = await prisma.utilisateur.create({
      data: {
        nom: 'Dupont',
        prenom: 'Jean',
        nomUtilisateur: 'jdupont',
        motDePasse: 'secure123',
        poste: 'GERANT',
      },
    });

    // Créer 5 produits
    const produits = await prisma.$transaction([
      prisma.produit.create({
        data: {
          sku: 'PRD-001',
          nom: 'Produit 1',
          description: 'Description produit 1',
          fournisseur: 'Fournisseur A',
          quantite: 100,
          prix: 100.0,
        },
      }),
      prisma.produit.create({
        data: {
          sku: 'PRD-002',
          nom: 'Produit 2',
          description: 'Description produit 2',
          fournisseur: 'Fournisseur B',
          quantite: 110,
          prix: 150.0,
        },
      }),
      prisma.produit.create({
        data: {
          sku: 'PRD-003',
          nom: 'Produit 3',
          description: 'Description produit 3',
          fournisseur: 'Fournisseur C',
          quantite: 120,
          prix: 200.0,
        },
      }),
      prisma.produit.create({
        data: {
          sku: 'PRD-004',
          nom: 'Produit 4',
          description: 'Description produit 4',
          fournisseur: 'Fournisseur D',
          quantite: 130,
          prix: 250.0,
        },
      }),
      prisma.produit.create({
        data: {
          sku: 'PRD-005',
          nom: 'Produit 5',
          description: 'Description produit 5',
          fournisseur: 'Fournisseur E',
          quantite: 140,
          prix: 300.0,
        },
      }),
    ]);

    // Créer 6 commandes
    const commandes = await Promise.all(
      Array.from({ length: 6 }, (_, i) =>
        prisma.commande.create({
          data: {
            numeroDeCommande: `CMD-100${i + 1}`,
            sku: produits[0].sku,
            nom: produits[0].nom ?? 'Produit',
            description: `Commande ${i + 1}`,
            fournisseur: produits[0].fournisseur ?? '',
            quantite: 10 + i,
            prix: produits[0].prix ?? 0,
            utilisateurId: utilisateur.id,
          },
        })
      )
    );

    // Créer 3 réceptions
    await Promise.all([
      prisma.reception.create({
        data: {
          commandeId: commandes[0].id,
          utilisateurId: utilisateur.id,
          produitId: produits[0].id,
          quantite: 5,
        },
      }),
      prisma.reception.create({
        data: {
          commandeId: commandes[1].id,
          utilisateurId: utilisateur.id,
          produitId: produits[1].id,
          quantite: 6,
        },
      }),
      prisma.reception.create({
        data: {
          commandeId: commandes[2].id,
          utilisateurId: utilisateur.id,
          produitId: produits[2].id,
          quantite: 7,
        },
      }),
    ]);

    // Créer 3 retours
    await Promise.all([
      prisma.retour.create({
        data: {
          numeroDeRetour: 'RET-1001',
          commandeId: commandes[0].id,
          utilisateurId: utilisateur.id,
          quantite: 2,
          motif: 'Produit cassé',
        },
      }),
      prisma.retour.create({
        data: {
          numeroDeRetour: 'RET-1002',
          commandeId: commandes[1].id,
          utilisateurId: utilisateur.id,
          quantite: 1,
          motif: 'Erreur de livraison',
        },
      }),
      prisma.retour.create({
        data: {
          numeroDeRetour: 'RET-1003',
          commandeId: commandes[2].id,
          utilisateurId: utilisateur.id,
          quantite: 3,
          motif: 'Produit non conforme',
        },
      }),
    ]);

    console.log('Données supprimées et réinsérées avec succès');
  } catch (error) {
    console.error('Erreur lors du seed :', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
