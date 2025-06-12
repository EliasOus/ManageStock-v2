import CarteInfo from "@/components/CarteInfo";
import styles from "./page.module.css";
import Chart from "@/components/Chart";
import InfoBloc from "@/components/InfoBlock";

import { prisma } from "@/lib/prisma";

export default async function Dashboard() {
  const produits = await prisma.produit.findMany({
    select: {
      id: true,
      sku: true,
      nom: true,
      fournisseur: true,
      quantite: true,
      prix: true,
    },
  });

  const produitsReaprosisionner = produits.filter((item) => item.quantite <= 10);

  return (
    <>
      {/* <h1>dashboard page bonjour</h1> */}
      <div className={styles.maDiv1}>
        <CarteInfo chiffre={"43 000"} titre={"Chiffre d'affaire"}></CarteInfo>
        <CarteInfo chiffre={"100"} titre={"Commande en cours"}></CarteInfo>
        <CarteInfo chiffre={"1 490"} titre={"Produits en stock"}></CarteInfo>
        <CarteInfo
          chiffre={"19"}
          titre={"Produits a reaprovisionner"}
        ></CarteInfo>
      </div>
      <div className={styles.madiv2}>
        <Chart></Chart>
      </div>
      <div className={styles.maDiv3}>
        <InfoBloc
          dataType={"produit"}
          defaultTitle={"Produits a reaprovisionner"}
          defaultHeaders={[
            "Upe/Sku",
            "Nom d’article",
            "Fournisseur",
            "Quantité",
            "Prix",
          ]}
          data={produitsReaprosisionner}
        ></InfoBloc>
      </div>
    </>
  );
}
