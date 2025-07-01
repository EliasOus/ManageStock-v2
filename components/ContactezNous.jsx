"use client";
import style from "./ContactezNous.module.css";
import Image from "next/image";
import Link from "next/link";
import facebook from "@/public/facebook.svg";
import instagram from "@/public/instagram.svg";
import twitter from "@/public/twitter.svg";
import whatsapp from "@/public/whatsapp.svg";
import Button from "@/components/Button";
import { useState } from "react";
import { contacteSchema } from "@/lib/schema";
import contactezServeur from "@/actions/contacterNous-action";

export default function ContactezNous() {
  const [erreur, setErreur] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const datas = {
      name: data.get("name"),
      email: data.get("email"),
      telephone: (data.get("telephone") || "").replace(/\D/g, ""),
      nomEntreprise: data.get("nomEntreprise"),
      emailObjet: data.get("emailObjet"),
      emailMessage: data.get("emailMessage"),
    };

    const isValideData = contacteSchema.safeParse(datas);

    if (!isValideData.success)
      return setErreur(isValideData.error.errors[0].message);

    setErreur("");
    await contactezServeur(isValideData);
  };

  return (
    // <div className={`${style.ContactezNous} ${className}`}>
    <div className={style.ContactezNous}>
      <h1>Contactez-Nous</h1>
      <div className={style.body}>
        <form onSubmit={handleSubmit} className={style.form} noValidate>
          <div className={style.nomEmail}>
            <label>
              Nom <span>*</span>
              <input type="text" name="name" required />
            </label>
            <label>
              Email <span>*</span>
              <input type="email" name="email" required />
            </label>
          </div>
          <div className={style.telNomEntreprise}>
            <label>
              Telephone <span>*</span>
              <input
                type="number"
                name="telephone"
                maxLength={10}
                minLength={6}
                required
              />
            </label>
            <label>
              {"Nom de l'entreprise"}
              <input type="text" name="nomEntreprise" />
            </label>
          </div>
          <div className={style.objet}>
            <label>
              Objet
              <input type="text" name="emailObjet" />
            </label>
          </div>
          <div className={style.message}>
            <label>
              Votre Message <span>*</span>
              <textarea
                name="emailMessage"
                minLength={10}
                maxLength={200}
                required
              />
              {erreur && <div className={style.erreur}>{erreur}</div>}
            </label>
          </div>
          <Button
            texte={"Envoyer"}
            active={true}
            className={style.buttonEnvoyer}
            type={"submit"}
          />
        </form>
        <div className={style.bar}></div>
        <div className={style.info}>
          <div className={style.reseaux}>
            <Link href="#">
              <Image src={facebook} alt="logo facebook" />
            </Link>
            <Link href="#">
              <Image src={instagram} alt="logo instagram" />
            </Link>
            <Link href="#">
              <Image src={twitter} alt="logo twitter" />
            </Link>
            <Link href="#">
              <Image src={whatsapp} alt="logo whatsapp" />
            </Link>
          </div>
          <div className={style.adresse}>
            <div className={style.circle}></div>
            <div className={style.adresseText}>
              <h4>Adresse</h4>
              <p>801 Aviation Pkwy, Ottawa, ON K1J 1H2</p>
              <p>438 896 8181</p>
            </div>
          </div>
          <div className={style.contact}>
            <div className={style.circle}></div>
            <div className={style.contactText}>
              <h4>Information Pratique</h4>
              <p>contact@managestock.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// /**
//    * Fonction de validation du formulaire de contact.
//    * Vérifie si tous les champs du formulaire (name, courriel, téléphone, message, etc.)
//    * sont remplis correctement et renvoie l'état mis à jour avec les erreurs correspondantes.
//    *
//    * - Si un champ est vide ou mal renseigné, un message d'erreur est ajouté.
//    * - Si tous les champs sont valides, l'état mis à jour sera renvoyé avec les valeurs saisies.
//    *
//    * Cette fonction prend en entrée l'état précédent du formulaire et les données soumises via `formData`.
//    * Elle met à jour l'état avec les erreurs ou les valeurs des champs.
//    * Enfin, elle vide le champ de téléphone après soumission du formulaire.
//    *
//    * @param {object} previeousState - L'état précédent du formulaire.
//    * @param {FormData} formData - Les données soumises via le formulaire.
//    * @returns {object} - Un objet représentant l'état mis à jour du formulaire avec les erreurs.
//    */

//   const contactez = (previeousState, formData) => {
//     const name = formData.get("name");
//     const courriel = formData.get("courriel");
//     const telephone = formData.get("telephone");
//     const nomentreprise = formData.get("nomEntreprise");
//     const objet = formData.get("objet");
//     const message = formData.get("message");

//     let newState = {
//       name: { valeur: "", erreur: null },
//       courriel: { valeur: "", erreur: null },
//       telephone: { valeur: "", erreur: null },
//       nomentreprise: { valeur: "", erreur: null },
//       objet: { valeur: "", erreur: null },
//       message: { valeur: "", erreur: null },
//     };
//     let erreur = false;

//     if (!name) {
//       erreur = true;
//       newState.name.erreur = "Veuillez entrer votre name";
//     }
//     if (!courriel) {
//       erreur = true;
//       newState.courriel.erreur = "Veuillez entrer une adresse courriel";
//     } else if (
//       !courriel.match(
//         /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
//       )
//     ) {
//       erreur = true;
//       newState.courriel.erreur = "Veuillez entrer une adresse courriel valide";
//     }

//     if (!telephone) {
//       erreur = true;
//       newState.telephone.erreur = "Veuillez entrer un numero de telephone";
//     } else if (telephone.length < 6 || telephone.length > 10) {
//       erreur = true;
//       newState.telephone.erreur =
//         "Veuillez entrer un numéro de téléphone valide entre 6 à 10 chiffres.";
//     }

//     if (!message) {
//       erreur = true;
//       newState.message.erreur = "Veuillez entrer un message ";
//     }
//     if (message < 10 || message > 200) {
//       erreur = true;
//       newState.message.erreur =
//         "Veuillez entrer un message entre 10 a 200 caracter ";
//     }

//     if (erreur) {
//       newState.name.valeur = name;
//       newState.courriel.valeur = courriel;
//       newState.telephone.valeur = telephone;
//       newState.nomentreprise.valeur = nomentreprise;
//       newState.objet.valeur = objet;
//       newState.message.valeur = message;
//     }

//     // Vide le champ de téléphone après la soumission du formulaire,
//     // uniquement lorsque le formulaire est prêt à être soumis (sans erreur)
//     if (!erreur) {
//       setPhone("");
//     }

//     return newState;
//   };

//   const [formState, formAction] = useActionState(contactez, {
//     name: { valeur: "", erreur: null },
//     courriel: { valeur: "", erreur: null },
//     telephone: { valeur: "", erreur: null },
//     nomentreprise: { valeur: "", erreur: null },
//     objet: { valeur: "", erreur: null },
//     message: { valeur: "", erreur: null },
//   });

//   const [phone, setPhone] = useState("");
//   /**
//    * Fonction pour empêcher l'entrée de lettres dans le champ téléphone
//    * À chaque changement dans le texte, cette fonction est appelée pour vérifier
//    * si des lettres sont présentes. Si c'est le cas, elle remplace la lettre par ""
//    * @param {Event} event
//    */
//   const handleChange = (event) => {
//     // Si l'entrée contient un caractère qui n'est pas un chiffre, on remplace
//     const value = event.target.value.replace(/\D/g, "");
//     setPhone(value);
//   };
