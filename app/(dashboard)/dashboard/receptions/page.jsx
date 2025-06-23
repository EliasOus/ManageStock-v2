import InfoBloc from "@/components/InfoBlock";
import InputForm from "@/components/InputForm";
import style from "./page.module.css";
import { prisma } from "@/lib/prisma";

import formaterData from "@/lib/format-data";
import {
  inputReceptionServer,
  inputSafeReception,
} from "@/actions/reception-action";

export default async function receptions() {
  const inputFields = [
    { name: "numeroDeCommande", placeholder: "Numéro De commande" },
    { name: "quantite", placeholder: "Quantité" },
  ];

  const receptions = await prisma.reception.findMany({
    select: {
      id: true,
      commande: {
        select: {
          numeroDeCommande: true,
          name: true,
        },
      },
      createdAt: true,
      quantite: true,
      user: {
        select: {
          nomUtilisateur: true,
        },
      },
    },
  });

  const receptionsFormater = formaterData(receptions);

  return (
    <>
      <h1 className={style.titre}>Gestion des Réceptions</h1>
      <div className={style.inputform}>
        <InputForm
          inputFields={inputFields}
          ActionFunction={inputSafeReception}
        />
      </div>
      <div>
        <InfoBloc
          dataType={"reception"}
          defaultTitle={"Réceptions"}
          defaultHeaders={[
            "Numéro de commande",
            "Produit",
            "Date de réception",
            "Quantité reçue",
            "utilisateur",
          ]}
          data={receptionsFormater}
        />
      </div>
    </>
  );
}
