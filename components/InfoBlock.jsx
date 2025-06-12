"use client";
import { usePathname } from "next/navigation";
import style from "./InfoBloc.module.css";

export default function InfoBloc({
  dataType,
  defaultTitle,
  defaultHeaders,
  data = [],
}) {
  const getDataType = (item, dataType) => {
    switch (dataType) {
      case "produit":
        return item.prix;
      case "commande":
        return item.prix;
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
  const pathName = usePathname();
  const currentPage = pathName.split("/").pop();

  // recuperer les clé de data et suprime l'id
  let keys =
    data.length !== 0 ? Object.keys(data[0]).filter((key) => key !== "id") : [];

  // keys = currentPage === "retours" ? Object.keys(data[0]).filter((key) => key !== "commande") : [];
  // console.log("///" + keys)
  // let keys = [];
  // if (data.length !== 0) {
  //   if (currentPage === "retours") {
  //     keys = Object.keys(data[0]).filter(
  //       (key) => key !== "id" && key !== "commande"
  //     );
  //   } else if (currentPage === "receptions") {
  //     keys = Object.keys(data[0]).filter(
  //       (key) => key !== "id" && key !== "commande" && key !== "utilisateur"
  //     );
  //   } else {
  //     keys = Object.keys(data[0]).filter((key) => key !== "id");
  //   }
  // }

  console.log(keys);

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
                {keys.map((key) => (
                  // <td key={key}>
                  //   {key === "createdAt"
                  //     ? new Date(item[key]).toLocaleDateString()
                  //     : typeof key === "object"
                  //     ? key.map((article) => {
                  //         item[key][article];
                  //       })
                  //     : item[key]}
                  // </td>
                  <td key={key}>
                    {key === "createdAt"
                      ? new Date(item[key]).toLocaleDateString()
                      : (typeof item[key] === "object" && item[key] !== null) && currentPage === "retours"
                      ? item.commande.nom
                      : (typeof item[key] === "object" && item[key] !== null) && currentPage === "receptions"
                      ? item.commande.nom + item.commande.numeroDeCommande
                      : item[key]}
                  </td>
                ))}
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
      {/* <table className={style.infoTable}>
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
                <td key={item.id}> {item.sku}</td>
                <td key={item.id}> {item.nom}</td>
                <td key={item.id}> {item.fournisseur}</td>
                <td key={item.id}> {item.quantite}</td>
                <td key={item.id}> {getDataType(item, dataType)}</td>
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
      </table> */}
    </div>
  );
}
