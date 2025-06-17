"use client";
import { useState } from "react";
import Button from "./Button";
import styles from "./InputForm.module.css";
import { usePathname } from "next/navigation";

import { useAction } from "next-safe-action/hooks";
import { useDeleteItems } from "./delete-article";

export default function InputForm({ className, inputFields, ActionFunction }) {
  const [isInputVisible, setInputVisible] = useState(false);
  const handleVisibleForm = () => {
    !isInputVisible ? setInputVisible(true) : setInputVisible(false);
  };

  const pathName = usePathname();
  const currentPage = pathName.split("/").pop();

  const { executeAsync, hasErrored } = useAction(ActionFunction);

  const data = (fields, formData) => {
    const result = {};
    fields.forEach((field) => {
      const value = formData.get(field.name);

      // convertir les valeurs numériques
      if (field.name === "quantite" || field.name === "prix") {
        result[field.name] = Number(value);
      } else {
        result[field.name] = value;
      }
    });
    return result;
  };

  const toggleDeleteItem = useDeleteItems((state) => state.toggleDeleteItem);
  const deleteItem = useDeleteItems((state) => state.deleteItem);
  return (
    <>
      <div className={styles.boutons}>
        <div
          onClick={() => {
            handleVisibleForm();
            if (deleteItem) {
              toggleDeleteItem();
            }
          }}
        >
          <Button
            texte={"Nouveau"}
            active={true}
            className={""}
            type={"button"}
          />
        </div>
        <div
          onClick={() => {
            toggleDeleteItem();
            if (isInputVisible) {
              handleVisibleForm();
            }
          }}
        >
          <Button
            texte={"Supprimer"}
            active={true}
            className={""}
            type={"button"}
          />
        </div>
      </div>
      {isInputVisible && (
        <form
          action={async (formData) => {
            const dataInput = data(inputFields, formData);
            console.log(dataInput);
            await executeAsync(dataInput);
          }}
          className={`${styles.form} ${className}`}
        >
          {inputFields.map((field, index) => (
            <div key={index}>
              {field.name === "description" ? (
                <textarea
                  name={field.name}
                  placeholder={field.placeholder}
                  className={`${styles.input} ${styles.textarea}`}
                />
              ) : field.name === "poste" ? (
                <select
                  name={field.name}
                  id="poste"
                  required
                  className={styles.input}
                >
                  <option value="">-- Sélectionner un poste --</option>
                  <option value="GERANT">Gérant</option>
                  <option value="GESTIONNAIRE">Gestionnaire</option>
                  <option value="TRAVAILLEUR">Travailleur</option>
                </select>
              ) : (
                <input
                  type="text"
                  name={field.name}
                  placeholder={field.placeholder}
                  className={styles.input}
                />
              )}
            </div>
          ))}
          <div className={styles.buttonContainer}>
            <Button texte="Enregistrer" type="submit" active={true} />
            {currentPage !== "receptions" ? (
              <div onClick={handleVisibleForm}>
                <Button texte="Annuler" type="button" active={true} />
              </div>
            ) : null}
          </div>
          {hasErrored ? <p>il y a une erreur</p> : null}
        </form>
      )}
    </>
  );
}
