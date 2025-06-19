"use client";
import style from "./login.module.css";
import logo from "@/public/Logo-White.png";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import { usePathname, useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";

export default function Login({ functionAction }) {
  const url = usePathname();
  const router = useRouter();

  const { executeAsync, hasErrored } = useAction(functionAction);
  const newFormData = (formData) => {
    if (url === "/login") {
      return {
        nomUtilisateur: formData.get("nomUtilisateur"),
        motDePasse: formData.get("motDePasse"),
      };
    } else {
      return {
        nomDeEntreprise: formData.get("nomDeEntreprise"),
        email: formData.get("email"),
        nomUtilisateur: formData.get("nomUtilisateur"),
        motDePasse: formData.get("motDePasse"),
      };
    }
  };

  return (
    <div className={style.contenair}>
      <Image src={logo} alt="logo manageStock white" />
      <span></span>
      <div className={style.liens}>
        <Link
          href={"/login"}
          className={url === "/login" ? style.lienActive : ""}
        >
          Connexion
        </Link>
        <Link
          href={"/inscription"}
          className={url !== "/login" ? style.lienActive : ""}
        >
          Créer un Compte
        </Link>
      </div>
      <form
        action={async (formData) => {
          const data = newFormData(formData);
          console.log(data);
          await executeAsync(data);
        }}
        className={style.form}
        noValidate
      >
        <div className={style.inputs}>
          <label className={url === "/login" ? style.activeLogin : ""}>
            <input
              type="text"
              name="nomDeEntreprise"
              minLength={3}
              maxLength={10}
              required
              placeholder="Nom de l'Entreprise"
            />
            {/* <div className={style.erreur}>
              {formState.nomDeEntreprise.erreur}
            </div> */}
          </label>
          <label className={url === "/login" ? style.activeLogin : ""}>
            <input type="text" name="email" required placeholder="Email" />
            {/* <div className={style.erreur}>{formState.email.erreur}</div> */}
          </label>
          <label>
            <input
              type="text"
              name="nomUtilisateur"
              minLength={4}
              maxLength={20}
              required
              placeholder="Nom d'utilisateur"
            />
            {/* <div className={style.erreur}>
              {formState.nomUtilisateur.erreur}
            </div> */}
          </label>
          <label>
            <input
              type="password"
              name="motDePasse"
              minLength={6}
              maxLength={15}
              required
              placeholder="Mot de Passe"
            />
            {/* <div className={style.erreur}>{formState.motDePasse.erreur}</div> */}
          </label>
        </div>
        <Button
          texte={url === "/login" ? "Se Connecter" : "S'inscrire"}
          active={true}
          className={style.button}
          type={"submit"}
        />
      </form>
    </div>
  );
}

// "use client";

// import style from "./login.module.css";
// import logo from "@/public/Logo-White.png";
// import Image from "next/image";
// import Link from "next/link";
// import Button from "@/components/Button";
// import { usePathname, useRouter } from "next/navigation";
// import { useActionState } from "react";

// export default function Login() {
//   const url = usePathname();
//   const router = useRouter();

//   const connexionInscription = async (previeousState, formData) => {
//     const nomEntreprise = formData.get("nomDeEntreprise");
//     const email = formData.get("email");
//     const nomUtilisateur = formData.get("nomUtilisateur");
//     const motDePasse = formData.get("motDePasse");

//     let newState = {
//       nomDeEntreprise: { valeur: "", erreur: null },
//       email: { valeur: "", erreur: null },
//       nomUtilisateur: { valeur: "", erreur: null },
//       motDePasse: { valeur: "", erreur: null },
//     };
//     let erreur = false;

//     if (url === "/inscription") {
//       if (!nomEntreprise) {
//         erreur = true;
//         newState.nomDeEntreprise.erreur =
//           "Veuillez entrer votre nom d'entreprise";
//       } else if (nomEntreprise.length < 3 || nomEntreprise.length > 10) {
//         erreur = true;
//         newState.nomDeEntreprise.erreur =
//           "veuillez entrer un non d'entreprise entre 3 et 10 lettre";
//       }
//       if (!email) {
//         erreur = true;
//         newState.email.erreur = "Veuillez entrer votre email";
//       } else if (
//         !email.match(
//           /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
//         )
//       ) {
//         erreur = true;
//         newState.email.erreur = "Veuillez entrer une adresse email valide";
//       }
//     }

//     if (!nomUtilisateur) {
//       erreur = true;
//       newState.nomUtilisateur.erreur =
//         "Veuillez entrer votre nom d'utilisateur";
//     } else if (nomUtilisateur.length < 4 || nomUtilisateur.length > 20) {
//       erreur = true;
//       newState.nomUtilisateur.erreur =
//         "veuillez entrer un non d'utilisateur entre 4 et 10 lettre";
//     }
//     if (!motDePasse) {
//       erreur = true;
//       newState.motDePasse.erreur = "Veuillez entrer votre mot de passe";
//     } else if (motDePasse.length < 6 || motDePasse > 15) {
//       erreur = true;
//       newState.motDePasse.erreur =
//         "veuillez entrer un mot de passe entre 6 et 15 lettre";
//     }

//     if (erreur) {
//       newState.nomDeEntreprise.valeur = formData.get("nomDeEntreprise");
//       newState.email.valeur = formData.get("email");
//       newState.nomUtilisateur.valeur = formData.get("nomUtilisateur");
//       newState.motDePasse.valeur = formData.get("motDePasse");
//     }

//     if (!erreur) {
//       if (nomUtilisateur !== "manageStock") {
//         erreur = true;
//         newState.nomUtilisateur.erreur =
//           "Aucun compte avec cette adresse courriel.";
//         return newState;
//       }
//       const motDePasse = formData.get("motDePasse");
//       if (motDePasse !== "manageStock") {
//         erreur = true;
//         newState.motDePasse.erreur = "Mot de passe incorrect";
//         return newState;
//       }

//       router.replace("/dashboard");
//     }

//     return newState;
//   };

//   const [formState, formAction] = useActionState(connexionInscription, {
//     nomDeEntreprise: { valeur: "", erreur: null },
//     email: { valeur: "", erreur: null },
//     nomUtilisateur: { valeur: "", erreur: null },
//     motDePasse: { valeur: "", erreur: null },
//   });

//   return (
//     <div className={style.contenair}>
//       <Image src={logo} alt="logo manageStock white" />
//       <span></span>
//       <div className={style.liens}>
//         <Link
//           href={"/login"}
//           className={url === "/login" ? style.lienActive : ""}
//         >
//           Connexion
//         </Link>
//         <Link
//           href={"/inscription"}
//           className={url !== "/login" ? style.lienActive : ""}
//         >
//           Créer un Compte
//         </Link>
//       </div>
//       <form action={formAction} className={style.form} noValidate>
//         <div className={style.inputs}>
//           <label className={url === "/login" ? style.activeLogin : ""}>
//             <input
//               type="text"
//               name="nomDeEntreprise"
//               minLength={3}
//               maxLength={10}
//               defaultValue={formState.nomDeEntreprise.valeur}
//               required
//               placeholder="Nom de l'Entreprise"
//             />
//             <div className={style.erreur}>
//               {formState.nomDeEntreprise.erreur}
//             </div>
//           </label>
//           <label className={url === "/login" ? style.activeLogin : ""}>
//             <input
//               type="text"
//               name="email"
//               defaultValue={formState.email.valeur}
//               required
//               placeholder="Email"
//             />
//             <div className={style.erreur}>{formState.email.erreur}</div>
//           </label>
//           <label>
//             <input
//               type="text"
//               name="nomUtilisateur"
//               minLength={4}
//               maxLength={20}
//               defaultValue={formState.nomUtilisateur.valeur}
//               required
//               placeholder="Nom d'utilisateur"
//             />
//             <div className={style.erreur}>
//               {formState.nomUtilisateur.erreur}
//             </div>
//           </label>
//           <label>
//             <input
//               type="password"
//               name="motDePasse"
//               minLength={6}
//               maxLength={15}
//               required
//               placeholder="Mot de Passe"
//             />
//             <div className={style.erreur}>{formState.motDePasse.erreur}</div>
//           </label>
//         </div>
//         <Button
//           texte={url === "/login" ? "Se Connecter" : "S'inscrire"}
//           active={true}
//           className={style.button}
//           type={"submit"}
//         />
//       </form>
//     </div>
//   );
// }
