"use client"
import Button from "@/components/Button";
import InfoBloc from "@/components/InfoBlock";
import InputForm from "@/components/InputForm";
import style from "./inventaire.module.css";
import datas from "@/data/datas.json";
import { useState } from "react";

export default function Inventaire() {
    
    const [isInputVisible, setInputVisible] = useState(false);
    const toggleInputForm = () => {
     setInputVisible(true);
    };
    const handleCloseForm = () => {
     setInputVisible(false);
    };
   const inputFields = [
    { name: "Upe/Sku", type : "text", placeholder: "Entrez le Upe/Sku" },
    { name: "nom", placeholder: "Entrez le nom de l'article" },
    { name: "description", placeholder: "Entrez la description" },
    { name: "fournisseur", placeholder: "Entrez le fournisseur" },
    { name: "categorie", placeholder: "Entrez la catégorie" },
    { name: "quantité", placeholder: "Entrez la quantité" },
   ];
    return (
     <>
      <h1 className={style.titre}>Articles & Inventaire</h1>

      {!isInputVisible && (
       <div className={style.boutons}>
        <div onClick={toggleInputForm}>
         <Button
          texte={"Nouveau"}
          active={true}
          className={""}
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
       dataType={"commande"}
        defaultTitle={"Inventaire"}
        defaultHeaders={[
         "Upe/Sku",
         "Nom d’article",
         "Fournisseur",
         "Quantité",
         "Prix",
        ]}
        data={datas.produits}
       />
      </div>
     </>
    );
}