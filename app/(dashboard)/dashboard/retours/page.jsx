import InfoBloc from "@/components/InfoBlock";
import InputForm from "@/components/InputForm";
import style from "./page.module.css";
import { prisma } from "@/lib/prisma";
import formaterData from "@/lib/format-data";
import { inputSafeRetour } from "@/actions/retour-action";
import { inputSafeUtilisateur } from "@/actions/utilisateur-action";

export default async function retours() {
  const inputFields = [
    { name: "numeroDeCommande", placeholder: "Numero de commande" },
    { name: "quantite", placeholder: "quantite" },
    { name: "motif", placeholder: "motif" },
  ];

  const retours = await prisma.retour.findMany({
    select: {
      id: true,
      numeroDeRetour: true,
      createdAt: true,
      commande: {
        select: {
          nom: true,
        },
      },
      quantite: true,
      motif: true,
      statut: true,
    },
  });

  const retoursFormater = await formaterData(retours);

  return (
    <>
      <h1 className={style.titre}>Gestion des Retours</h1>
      <div className={style.inputform}>
        <InputForm
          inputFields={inputFields}
          ActionFunction={inputSafeRetour}
        />
      </div>
      <div>
        <InfoBloc
          dataType={"retour"}
          defaultTitle={"Bon de Retours"}
          defaultHeaders={[
            "Numero De Retour",
            "Date",
            "Produit",
            "Quantité",
            "Motif",
            "Statut",
          ]}
          data={retoursFormater}
        />
      </div>
    </>
  );
}
