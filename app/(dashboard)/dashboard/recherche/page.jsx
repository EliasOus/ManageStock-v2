import RechercheWrap from "@/components/rechercheWrap";
import styles from "./page.module.css";

import { prisma } from "@/lib/prisma";
import formaterData from "@/lib/format-data";

export default async function Recherche() {
  const produits = await prisma.produit.findMany({
    select: {
      id: true,
      sku: true,
      name: true,
      fournisseur: true,
      quantite: true,
      prix: true,
    },
  });

  return (
    <>
      <div className={styles.contenaire}>
        {/* <RechercheWrap defaultDataFormater={defaultDataFormater} /> */}
        <RechercheWrap defaultDataFormater={produits} />
      </div>
    </>
  );
}
