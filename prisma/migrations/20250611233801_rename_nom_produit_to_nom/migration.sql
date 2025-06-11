/*
  Warnings:

  - You are about to drop the column `nomProduit` on the `Commande` table. All the data in the column will be lost.
  - Added the required column `nom` to the `Commande` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Commande" DROP COLUMN "nomProduit",
ADD COLUMN     "nom" TEXT NOT NULL;
