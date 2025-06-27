import { z } from "zod";

export const connexionSchema = z.object({
  email: z
    .string()
    .email({
      message: "Veuillez entrer une adresse email valide.",
    })
    .min(4, {
      message: "L'email doit contenir au moins 4 caractères.",
    })
    .max(50, {
      message: "L'email doit contenir au max 50 caractères.",
    }),
  motDePasse: z
    .string()
    .min(4, {
      message: "Le Mot De Passe doit contenir au moins 4 caractères.",
    })
    .max(20, {
      message: "Le Mot De Passe  doit contenir au max 20 caractères.",
    }),
});

export const inscriptionSchema = z.object({
  email: z
    .string()
    .email({
      message: "email invalide",
    })
    .min(4, {
      message: "L'email doit contenir au moins 4 caractères.",
    })
    .max(50, {
      message: "L'email doit contenir au max 50 caractères.",
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

export const contacteSchema = z.object({
  name: z
    .string({
      message: "Il faut entre votre nom",
    })
    .min(4, { message: "le nom doit contenir au moins 4 caractères." })
    .max(20, { message: "le nom doit contenir au max 20 caractères." }),
  email: z
    .string()
    .email({
      message: "Il faut entre votre Email",
    })
    .min(4, { message: "l'email doit contenir au moins 4 caractères." })
    .max(50, { message: "l'email doit contenir au max 50 caractères." }),
  telephone: z
    .string({
      required_error: "Le numéro de téléphone est requis",
      invalid_type_error: "Le numéro de téléphone est invalide",
    })
    .regex(/^\d{10}$/, {
      message: "Le numéro doit contenir exactement 10 chiffres.",
    }),
  nomEntreprise: z
    .string()
    .max(20, {
      message: "le nom de l'entreprise doit contenir au max 20 caractères.",
    })
    .optional(),
  emailObjet: z
    .string()
    .max(20, {
      message: "le nom doit contenir au max 20 caractères.",
    })
    .optional(),
  emailMessage: z
    .string({
      message: "Il faut entre le message",
    })
    .min(4, { message: "le message doit contenir au moins 4 caractères." })
    .max(500, { message: "le message doit contenir au max 500 caractères." }),
});
