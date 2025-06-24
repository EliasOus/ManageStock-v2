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

import { IoIosArrowDropdownCircle } from "react-icons/io";
import { MdError } from "react-icons/md";

export default function Login({ functionAction }) {
  const url = usePathname();
  const router = useRouter();

  const [erreur, setErreur] = useState("");
  const [success, setSuccess] = useState("");

  const { executeAsync, hasErrored } = useAction(functionAction);

  const newFormData = (formData) => {
    if (url === "/login") {
      return {
        email: formData.get("email"),
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

          console.log("*** elias *** " + JSON.stringify(resultat));
          if (resultat.validationErrors || resultat.data.status === "error") {
            // Affiche l'erreur retournée par la Server Action
            console.log("elias elias elias *****");
            if (resultat.data) {
              setSuccess("");
              setErreur(resultat.data.message);
              return;
            }
            const erreur = Object.values(resultat.validationErrors)[0]
              ._errors[0];
            setSuccess("");
            setErreur(erreur || "Erreur inconnue");
            return;
          }
          if (resultat.data.status === "success") {
            console.log("fatima")
            setErreur("");
            setSuccess(resultat.data.message);
            return;
          }

          if (url === "/inscription") {
            // router.push("/login");
            setSuccess(resultat.data.message);
          }
        }}
        className={style.form}
        noValidate
      >
        <div className={style.inputs}>
          <label>
            <input
              type="text"
              name="email"
              minLength={4}
              maxLength={50}
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
          <label className={url === "/login" ? style.activeLogin : ""}>
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
        {erreur && (
          <div className={style.erreur}>
            <MdError /> <p>{erreur}</p>
          </div>
        )}
        {success && (
          <div className={style.success}>
            <IoIosArrowDropdownCircle /> <p>{success}</p>
          </div>
        )}
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
