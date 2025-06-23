"use client";
import style from "./login.module.css";
import logo from "@/public/Logo-White.png";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import { usePathname, useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import ReseauxSocieau from "@/components/ReseauxSociau";

export default function Login({ functionAction }) {
  const url = usePathname();
  const router = useRouter();

  const [erreur, setErreur] = useState("");

  const { executeAsync, hasErrored } = useAction(functionAction);

  const newFormData = (formData) => {
    if (url === "/login") {
      return {
        nomUtilisateur: formData.get("nomUtilisateur"),
        motDePasse: formData.get("motDePasse"),
      };
    } else {
      return {
        email: formData.get("email"),
        name: formData.get("name"),
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
          const resultat = await executeAsync(data);
          if (resultat.data.status === "error") {
            setErreur(resultat.data.message);
            return;
          }

          if (url === "/inscription") {
            router.push("/login");
          }
        }}
        className={style.form}
        noValidate
      >
        <div className={style.inputs}>
          <label className={url === "/login" ? style.activeLogin : ""}>
            <input
              type="text"
              name="email"
              minLength={4}
              maxLength={20}
              required
              placeholder="Email"
            />
          </label>
          <label className={url === "/login" ? style.activeLogin : ""}>
            <input
              type="text"
              name="name"
              minLength={3}
              maxLength={20}
              required
              placeholder="nom complet"
            />
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
          </label>
        </div>
        {erreur && <p className={style.erreur}>{erreur}</p>}
        <Button
          texte={url === "/login" ? "Se Connecter" : "S'inscrire"}
          active={true}
          className={style.button}
          type={"submit"}
        />
      </form>
      {url === "/login" && (
        <>
          <div className={style.diviseur}>
            <hr />
            <p>Ou</p>
            <hr />
          </div>
          <ReseauxSocieau />
        </>
      )}
    </div>
  );
}
