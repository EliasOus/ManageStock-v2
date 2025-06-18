"use client";

import { useEffect, useState } from "react";
import { rechercheProduits } from "@/actions/recherche-action";

import styles from "./RechercheBar.module.css";

export default function RechercheBar({ setResultat }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const delait = setTimeout(async () => {
      const produits = await rechercheProduits(query);
      setResultat(produits);
    }, 100);

    return () => clearTimeout(delait);
  }, [query, setResultat]);

  return (
    <div className={styles.contenaire}>
      <input
        type="text"
        placeholder="Recherche"
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
    </div>
  );
}
