"use client";

import { useState } from "react";
import { rechercheProduits } from "@/actions/recherche-action";
import { FaSearch } from "react-icons/fa";
import formaterData from "@/lib/format-data";

import styles from "./RechercheBar.module.css";

export default function RechercheBar({ setResultat }) {
  const [query, setQuery] = useState("");
  const handleRecherche = async () => {
    const produits = await rechercheProduits(query);
    // const produitsFormates = formaterData(produits);
    // setResultat(produitsFormates);
    setResultat(produits);
  };

  return (
    <>
      <div className={styles.contenaire}>
        <input
          type="text"
          placeholder="Recherche"
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <button onClick={handleRecherche}>
          <FaSearch />
        </button>
      </div>
    </>
  );
}
