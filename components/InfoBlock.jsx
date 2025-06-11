"use client";
import { useState } from "react";
import style from "./InfoBloc.module.css";

export default function InfoBloc({
  dataType,
  defaultTitle,
  defaultHeaders,
  data = [],
}) {
  //  const [title, setTitle] = useState(defaultTitle);
  //  const [headers, setHeaders] = useState(defaultHeaders);

  const getDataType = (item, dataType) => {
    switch (dataType) {
      case "produit":
        return item.prix;
      case "commande":
        return item.nom;
      case "retour":
        return item.nom;
      case "reception":
        return item.fournisseur;
      case "utilisateur":
        return item.poste;
      default:
        return "";
    }
  };
  return (
    <div className={style.infoBloc}>
      <h2 className={style.tableTitle}>{defaultTitle}</h2>
      <table className={style.infoTable}>
        <thead>
          <tr>
            {defaultHeaders.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index}>
                {/* {Object.values(item).map((value, id) => (
         <td key={id}>{value}</td>
        ))} */}
                <td key={item.upeSku}> {item.sku}</td>
                <td key={item.upeSku}> {item.nom}</td>
                <td key={item.upeSku}> {item.fournisseur}</td>
                <td key={item.upeSku}> {item.quantite}</td>
                <td key={item.upeSku}> {getDataType(item, dataType)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={defaultHeaders.length} className={style.noData}>
                Aucune donnée disponible
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
