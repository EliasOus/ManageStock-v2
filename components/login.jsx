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
              maxLength={20}
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
              minLength={4}
              maxLength={20}
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