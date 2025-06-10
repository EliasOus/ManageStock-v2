import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * @param {prisma} prisma
 */
export async function GET() {
  const produits = await prisma.produit.findMany();

  return NextResponse.json({ produits });
}
