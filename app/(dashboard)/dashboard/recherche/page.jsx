import InfoBloc from "@/components/InfoBlock.jsx";
import styles from "./page.module.css";
import Recherche1 from "@/components/Recherche";

import datas from "@/data/datas.json";
import { prisma } from "@/lib/prisma";

export default async function Recherche() {
  const produits = await prisma.produit.findMany();

  return (
    <>
      <div className={styles.contenaire}>
        <div className={styles.divRecherche}>
          <Recherche1 />
        </div>
        <div className={styles.infoBloc}>
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
            data={produits}z
          />
        </div>
      </div>
    </>
  );
}
