/*
  Warnings:

  - You are about to drop the column `nom` on the `Commande` table. All the data in the column will be lost.
  - You are about to drop the column `nom` on the `Produit` table. All the data in the column will be lost.
  - You are about to drop the column `nom` on the `User` table. All the data in the column will be lost.
  - Added the required column `name` to the `Commande` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Commande" DROP COLUMN "nom",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Produit" DROP COLUMN "nom",
ADD COLUMN     "name" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "nom",
ADD COLUMN     "name" TEXT,
ADD COLUMN     "prenom" TEXT;
