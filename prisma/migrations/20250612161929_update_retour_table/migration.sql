/*
  Warnings:

  - A unique constraint covering the columns `[numeroDeRetour]` on the table `Retour` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `numeroDeRetour` to the `Retour` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Retour" ADD COLUMN     "numeroDeRetour" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Retour_numeroDeRetour_key" ON "Retour"("numeroDeRetour");
