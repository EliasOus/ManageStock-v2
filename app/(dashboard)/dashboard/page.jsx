import CarteInfo from "@/components/CarteInfo";
import styles from "./page.module.css";
import Chart from "@/components/Chart";
import InfoBloc from "@/components/InfoBlock";

import { prisma } from "@/lib/prisma";
import {
  nbrCommandeEnStock,
  nbrProduitsEnStock,
  ValeurTotaleStock,
} from "@/lib/dashboard";
import formaterData from "@/lib/format-data";

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

  const produitsReaprosisionner = produits.filter(
    (item) => item.quantite <= 20
  );

  const produitsReapFormater = formaterData(produitsReaprosisionner);

  const nmbProduit = nbrProduitsEnStock();
  const nmbCommande = nbrCommandeEnStock();
  const valeurStock = ValeurTotaleStock();
  
  const nbrProduitsReaprosisionner = produitsReaprosisionner.length;

  return (
    <>
      {/* <h1>dashboard page bonjour</h1> */}
      <div className={styles.maDiv1}>
        <CarteInfo
          chiffre={valeurStock}
          titre={"Valeur totale du stock"}
        ></CarteInfo>
        <CarteInfo
          chiffre={nmbCommande}
          titre={"Commande en cours"}
        ></CarteInfo>
        <CarteInfo chiffre={nmbProduit} titre={"Produits en stock"}></CarteInfo>
        <CarteInfo
          chiffre={nbrProduitsReaprosisionner}
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
          data={produitsReapFormater}
        ></InfoBloc>
      </div>
    </>
  );
}
