"use client";
import Button from "@/components/Button";
import InfoBloc from "@/components/InfoBlock";
import InputForm from "@/components/InputForm";
import style from "./utilisateur.module.css";
import datas from "@/data/datas.json";
import { useState } from "react";
import styles from "@/components/InputForm.module.css";

export default function Utilisateur() {
  const [isInputVisible, setInputVisible] = useState(false);

  const toggleInputForm = () => {
    setInputVisible(true);
  };
  const handleCloseForm = () => {
    setInputVisible(false);
  };
  const inputFields = [
    { name: "nom", placeholder: "Nom" },
    { name: "prenom", placeholder: "Prenom" },
    { name: "nomUtilisateur", placeholder: "Nom D'utilisateur" },
    { name: "Password", placeholder: "Mot De Passe" },
    { name: "poste", placeholder: "Poste" },
  ];
  return (
    <>
      <h1 className={style.titre}>Gestion d'utilisateur</h1>
      {!isInputVisible && (
        <div className={style.boutons}>
          <div onClick={toggleInputForm}>
            <Button
              className={""}
              texte={"Nouveau"}
              active={true}
              type={"button"}
            />
          </div>

          <div onClick={toggleInputForm}>
            <Button
              texte={"Modifier"}
              active={true}
              className={""}
              type={"button"}
            />
          </div>

          <Button
            texte={"Supprimer"}
            active={true}
            className={""}
            type={"button"}
          />
        </div>
      )}

      {isInputVisible && (
        <div className={style.inputform}>
          <InputForm inputFields={inputFields} onClose={handleCloseForm} />
        </div>
      )}

      <div>
        <InfoBloc
          dataType={"utilisateur"}
          defaultTitle={"Utilisateurs"}
          defaultHeaders={[
            "Nom",
            "Prenom",
            "Nom utilisateur",
            "Mot de passe",
            "Poste",
          ]}
          data={datas.utilisateurs}
        />
      </div>
    </>
  );
}
