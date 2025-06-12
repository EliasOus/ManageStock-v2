/*
  Warnings:

  - You are about to drop the column `numeroDeRetour` on the `Retour` table. All the data in the column will be lost.
  - You are about to drop the column `produitId` on the `Retour` table. All the data in the column will be lost.
  - Added the required column `commandeId` to the `Retour` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Retour" DROP CONSTRAINT "Retour_produitId_fkey";

-- DropIndex
DROP INDEX "Retour_numeroDeRetour_key";

-- AlterTable
ALTER TABLE "Retour" DROP COLUMN "numeroDeRetour",
DROP COLUMN "produitId",
ADD COLUMN     "commandeId" TEXT NOT NULL,
ALTER COLUMN "statut" SET DEFAULT 'EN ATTENTE';

-- AddForeignKey
ALTER TABLE "Retour" ADD CONSTRAINT "Retour_commandeId_fkey" FOREIGN KEY ("commandeId") REFERENCES "Commande"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
