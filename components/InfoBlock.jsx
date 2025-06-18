"use client";
import { usePathname } from "next/navigation";
import style from "./InfoBloc.module.css";
import { useDeleteItems } from "./delete-article";

import { MdDeleteForever } from "react-icons/md";

import { deleteCommandeServer } from "@/actions/commande-action";
import { deleteReceptionServer } from "@/actions/reception-action";
import { deleteRetourServer } from "@/actions/retour-action";
import { deleteUtilisateurServer } from "@/actions/utilisateur-action";

export default function InfoBloc({ defaultTitle, defaultHeaders, data = [] }) {
  const pathName = usePathname();
  const currentPage = pathName.split("/").pop();

  // recuperer les clé de data et suprime l'id
  let keys =
    data.length !== 0 ? Object.keys(data[0]).filter((key) => key !== "id") : [];

  const isDeleteMode = useDeleteItems((state) => state.deleteItem);

  const handleDelete = (itemID) => {
    switch (currentPage) {
      case "inventaire":
        deleteCommandeServer(itemID);
        break;
      case "receptions":
        deleteReceptionServer(itemID);
        break;
      case "retours":
        deleteRetourServer(itemID);
        break;
      case "utilisateurs":
        deleteUtilisateurServer(itemID);
        break;
      default:
        console.warn("Page non reconnue");
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
                {keys.map((key) => (
                  <td key={key}>{item[key]}</td>
                ))}
                <td>
                  {isDeleteMode ? (
                    <button
                      className={style.btnDelete}
                      onClick={() => {
                        handleDelete(item.id);
                      }}
                    >
                      <MdDeleteForever />
                    </button>
                  ) : null}
                </td>
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
