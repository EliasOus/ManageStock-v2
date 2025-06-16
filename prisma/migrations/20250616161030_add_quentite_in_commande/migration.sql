-- AlterTable
ALTER TABLE "Commande" ADD COLUMN     "quantiteRecue" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "quantiteRestante" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "quantiteRetournee" INTEGER NOT NULL DEFAULT 0;
