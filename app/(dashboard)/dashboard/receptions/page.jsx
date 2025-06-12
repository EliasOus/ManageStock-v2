import InfoBloc from "@/components/InfoBlock";
import InputForm from "@/components/InputForm";
import style from "./page.module.css";
import { prisma } from "@/lib/prisma";

export default async function receptions() {
  const inputFields = [
    { name: "numeroCommande", placeholder: "Numéro de commande" },
    { name: "upe/sku", placeholder: "Upe/Sku" },
    { name: "quantite", placeholder: "Quantité" },
  ];

  const receptions = await prisma.reception.findMany({
    select: {
      id: true,
      quantite: true,
      createdAt: true,
      commande:{
        select:{
          numeroDeCommande: true,
          nom: true,
        }
      },
      utilisateur:{
        select:{
          nomUtilisateur: true,
        }
      }
    },
  });
  
  return (
    <>
      <h1 className={style.titre}>Gestion des Réceptions</h1>
      <div className={style.inputform}>
        <InputForm inputFields={inputFields} />
      </div>
      <div>
        <InfoBloc
          dataType={"reception"}
          defaultTitle={"Réceptions"}
          defaultHeaders={[
            "Numéro de commande",
            "Date de réception",
            "Produit",
            "Quantité reçue",
            "utilisateur",
          ]}
          data={receptions}
        />
      </div>
    </>
  );
}
