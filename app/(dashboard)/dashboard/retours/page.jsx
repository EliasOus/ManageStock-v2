import InfoBloc from "@/components/InfoBlock";
import InputForm from "@/components/InputForm";
import style from "./page.module.css";
import { prisma } from "@/lib/prisma";

export default async function retours() {
  const inputFields = [
    { name: "bonCommande", placeholder: "Bon de commande" },
    { name: "upeSku", placeholder: "UPE/SKU" },
    { name: "nomArticle", placeholder: "Nom de l'article" },
    { name: "fournisseur", placeholder: "Fournisseur" },
    { name: "quantite", placeholder: "Quantité" },
  ];

  const retours = await prisma.retour.findMany();
  return (
    <>
      <h1 className={style.titre}>Gestion des Retours</h1>
      <div className={style.inputform}>
        <InputForm inputFields={inputFields} />
      </div>
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
          data={retours}
        />
      </div>
    </>
  );
}
