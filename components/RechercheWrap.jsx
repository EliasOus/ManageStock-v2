"use client";
import RechercheBar from "@/components/RechercheBar";
import InfoBloc from "@/components/InfoBlock.jsx";
import { useState } from "react";
import formaterData from "@/lib/format-data";

export default function RechercheWrap({ defaultDataFormater }) {
  const [resultat, setResultat] = useState(defaultDataFormater);

  const resultatFormates = formaterData(resultat);

  return (
    <>
      <RechercheBar setResultat={setResultat} />
      <InfoBloc
        dataType={"produit"}
        defaultTitle={"Recherche Article"}
        defaultHeaders={[
          "Upe/Sku",
          "Nom d’article",
          "Fournisseur",
          "Quantité",
          "Prix",
        ]}
        data={resultatFormates}
      />
    </>
  );
}
