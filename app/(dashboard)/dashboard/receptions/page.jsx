"use client";
import InfoBloc from "@/components/InfoBlock";
import InputForm from "@/components/InputForm";
import style from "./page.module.css";
import datas from "@/data/datas.json";

export default function receptions() {
  const inputFields = [
    { name: "numeroCommande", placeholder: "Numéro de commande" },
    { name: "upe/sku", placeholder: "Upe/Sku" },
    { name: "quantite", placeholder: "Quantité" },
  ];

  return (
    <>
      <h1 className={style.titre}>Gestion des Réceptions</h1>

      {/* Form is always visible, no buttons needed */}
      <div className={style.inputform}>
        <InputForm
          inputFields={inputFields}
          nonAnnuler={true} // This prevents the form from closing
        />
      </div>

      <div>
        <InfoBloc
          dataType={"reception"}
          defaultTitle={"Réceptions"}
          defaultHeaders={[
            "Upe/Sku",
            "Nom d'article",
            "Fournisseur",
            "Quantité",
            "Date",
          ]}
          data={datas.receptions}
        />
      </div>
    </>
  );
}
