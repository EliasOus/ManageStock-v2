# ManageStock-v2

## Description

ManageStock est une plateforme web destinée à améliorer la gestion d'inventaire des petites et moyennes entreprises (PME).  
Ce dépôt contient la version complète et fonctionnelle du projet avec la partie front-end initiale développée en équipe, enrichie et finalisée par mes soins avec un back-end complet et des fonctionnalités avancées.

🔗 **Démo en ligne** : [https://manage-stock-v2.vercel.app](https://manage-stock-v2.vercel.app)

## Historique du projet

Le projet a débuté avec une équipe qui a réalisé la partie front-end uniquement ( disponible ici : [ManageStock](https://github.com/EliasOus/ManageStock) ).  
J’ai pris la relève pour développer et intégrer le back-end complet et assurer le fonctionnement global de la plateforme.

## 🛠️ Technologies utilisées

### Front-end

- HTML / CSS / JavaScript
- React

### Back-end

- [Node.js](https://nodejs.org/)
- [Prisma](https://www.prisma.io/)
- [Zod](https://zod.dev/)
- [AuthJS](https://authjs.dev/)
- [next-safe-action](https://github.com/TheEdoRan/next-safe-action)
- [Nodemailer](https://nodemailer.com/)

### Base de données

- PostgreSQL

## ✨ Fonctionnalités principales

- 🔐 **Gestion complète des utilisateurs**
  - Connexion / déconnexion
  - Connexion avec Google et GitHub
  - Vérification d’email avant accès
- 📦 **Gestion des articles**
  - Création, modification et suppression
- 📋 **Gestion des commandes**
  - Ajout et suppression
- ↩️ **Gestion des retours**
  - Ajout et suppression
- 📥 **Gestion des réceptions**
  - Ajout et suppression
- 📧 **Formulaire de contact**
  - Les utilisateurs peuvent envoyer un message via la section "Contactez-nous"
  - Les messages sont transmis automatiquement par email à l’administrateur

## Installation et utilisation

### 1. Cloner le dépôt

```bash
git clone https://github.com/OusEli/ManageStock-v2.git
```

### 2. Installer les dépendances

```bash
npm install
```

ou

```bash
yarn install
```

### 3. Créer un fichier `.env`

Crée un fichier `.env` à la racine du projet avec les variables suivantes :

```env
DATABASE_URL = ""

DOMAIN = ""

#AUTH JS
AUTH_SECRET = ""
AUTH_TRUST_HOST = ""

#GitHub provider
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""

#google provider
GOOGLE_CLIENT_ID= ""
GOOGLE_CLIENT_SECRET= ""

#Google Auth Nodmailer
USER_EMAIL = ""
PASS_EMAIL = ""
```

### 4. Configurer la base de données PostgreSQL et adapter le fichier `.env` avec tes informations (base, utilisateur, mot de passe, etc.).

### 5. Lancer les migrations Prisma :

```bash
npx prisma migrate dev
```

### 6. Démarrer l’application :

```bash
npm run dev
```

ou

```bash
yarn dev
```

> L'application sera accessible sur :
>
> - http://localhost:3000 (mode normal)
> - https://localhost:3000 (si les certificats sont présents)

---

## 👨‍💻 Auteur

- **Nom** : Elias Ousameur
- **Pseudonyme** : EliasOus
- 🔗 [GitHub : EliasOus](https://github.com/EliasOus)

---

## 📝 Licence

Ce projet est libre d’utilisation à des fins éducatives et personnelles. Pour une utilisation commerciale, merci de contacter l’auteur.

## Avertissement d’utilisation

⚠️ Ce projet est à but éducatif. Toute utilisation, copie ou reproduction sans autorisation explicite est interdite.  
Merci de respecter le travail fourni et de ne pas utiliser ce code pour des projets personnels ou commerciaux sans ma permission.
