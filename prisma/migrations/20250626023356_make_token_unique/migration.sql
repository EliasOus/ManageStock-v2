/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `verificationToken` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "verificationToken_token_key" ON "verificationToken"("token");
