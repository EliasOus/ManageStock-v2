import InfoBloc from "@/components/InfoBlock";
import InputForm from "@/components/InputForm";
import style from "./inventaire.module.css";
import { prisma } from "@/lib/prisma";
import formaterData from "@/actions/format-data";

export default async function Inventaire() {
  const inputFields = [
    { name: "sku", type: "text", placeholder: "Entrez le Upe/Sku" },
    { name: "nom", placeholder: "Entrez le nom de l'article" },
    { name: "description", placeholder: "Entrez la description" },
    { name: "fournisseur", placeholder: "Entrez le fournisseur" },
    { name: "prix", placeholder: "Entrez le Prix" },
    { name: "quantite", placeholder: "Entrez la quantité" },
  ];

  const commandes = await prisma.commande.findMany({
    select: {
      id: true,
      sku: true,
      nom: true,
      fournisseur: true,
      quantite: true,
      prix: true,
    },
  });

  const commandesFormater = await formaterData(commandes);

  return (
    <>
      <h1 className={style.titre}>Articles & Inventaire</h1>
      <div className={style.inputform}>
        <InputForm inputFields={inputFields} />
      </div>
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
          data={commandesFormater}
        />
      </div>
    </>
  );
}
