"use client";
import Button from "@/components/Button";
import InfoBloc from "@/components/InfoBlock";
import InputForm from "@/components/InputForm";
import style from "./page.module.css";
import datas from "@/data/datas.json";
import { useState } from "react";
import styles from "@/components/InputForm.module.css";

export default function retours() {
  const [isInputVisible, setInputVisible] = useState(false);

  const toggleInputForm = () => {
    setInputVisible(true);
  };
  const handleCloseForm = () => {
    setInputVisible(false);
  };
  const inputFields = [
    { name: "bonCommande", placeholder: "Bon de commande" },
    { name: "upeSku", placeholder: "UPE/SKU" },
    { name: "nomArticle", placeholder: "Nom de l'article" },
    { name: "fournisseur", placeholder: "Fournisseur" },
    { name: "quantite", placeholder: "Quantité" },
  ];
  return (
    <>
      <h1 className={style.titre}>Traitement des retours</h1>
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
          dataType={"retour"}
          defaultTitle={"Bon de Retours"}
          defaultHeaders={[
            "Upe/Sku",
            "Nom d'article",
            "Fournisseur",
            "Quantité",
            "Date",
          ]}
          data={datas.retours}
        />
      </div>
    </>
  );
}
