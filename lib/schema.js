import { z } from "zod";

export const connexionSchema = z.object({
  nomUtilisateur: z
    .string()
    .min(4, {
      message: "Le nom d'utilisateur doit contenir au moins 4 caractères.",
    })
    .max(20, {
      message: "Le nom d'utilisateur doit contenir au max 20 caractères.",
    }),
  motDePasse: z
    .string()
    .min(4, {
      message: "Le nom d'utilisateur doit contenir au moins 4 caractères.",
    })
    .max(20, {
      message: "Le nom d'utilisateur doit contenir au max 20 caractères.",
    }),
});

export const inscriptionSchema = z.object({
  email: z.string().email({
      message: "email invalide",
    }).min(4, {
      message: "L'email doit contenir au moins 4 caractères.",
    }).max(20, {
      message: "L'email doit contenir au max 10 caractères.",
    }),
  name: z
    .string()
    .min(4, {
      message: "Le nom de doit contenir au moins 4 caractères.",
    })
    .max(10, {
      message: "Le nom doit contenir au max 10 caractères.",
    }),
  nomUtilisateur: z
    .string()
    .min(4, {
      message: "Le nom d'utilisateur doit contenir au moins 4 caractères.",
    })
    .max(20, {
      message: "Le nom d'utilisateur doit contenir au max 20 caractères.",
    }),
  motDePasse: z
    .string()
    .min(4, {
      message: "Le nom d'utilisateur doit contenir au moins 4 caractères.",
    })
    .max(20, {
      message: "Le nom d'utilisateur doit contenir au max 20 caractères.",
    }),
});

export const commandeSchema = z.object({
  sku: z.string().min(3).max(10),
  name: z.string().min(3).max(20),
  description: z.string().min(3).max(50),
  fournisseur: z.string().min(3).max(20),
  prix: z.number().min(0.001).max(99999.99),
  quantite: z.number().int().min(1).max(99999),
});

export const recpetionSchema = z.object({
  numeroDeCommande: z.string().min(4).max(20),
  quantite: z.number().int().min(1).max(99999),
});

export const retourSchema = z.object({
  numeroDeCommande: z.string().min(4).max(20),
  quantite: z.number().int().min(1).max(99999),
  motif: z.string().min(4).max(100),
});

export const utilisateurSchema = z.object({
  name: z.string().min(3).max(10),
  nomUtilisateur: z.string().min(3).max(10),
  motDePasse: z.string().min(4).max(10),
  poste: z.enum(["GERANT", "GESTIONNAIRE", "TRAVAILLEUR"]),
});

export const recehercheSchema = z.object({
  query: z.string().max(20),
});
