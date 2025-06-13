"use client";
import { useState } from "react";
import Button from "./Button";
import styles from "./InputForm.module.css";
import { usePathname } from "next/navigation";

export default function InputForm({
  className,
  inputFields,
  onClose,
  ActionFunction,
}) {
  const [isInputVisible, setInputVisible] = useState(false);
  const handleVisibleForm = () => {
    !isInputVisible ? setInputVisible(true) : setInputVisible(false);
  };

  const pathName = usePathname();
  const currentPage = pathName.split("/").pop();

  return (
    <>
      {currentPage !== "receptions" ? (
        <div className={styles.boutons}>
          <div onClick={handleVisibleForm}>
            <Button
              texte={"Nouveau"}
              active={true}
              className={""}
              type={"button"}
            />
          </div>

          <div onClick={handleVisibleForm}>
            <Button
              texte={"Modifier"}
              active={true}
              className={""}
              type={"button"}
            />
          </div>

          <Button
            texte={"Supprimer"}
            active={true}
            className={""}
            type={"button"}
          />
        </div>
      ) : null}

      {(isInputVisible || currentPage === "receptions") && (
        <form action={ActionFunction} className={`${styles.form} ${className}`}>
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
        </form>
      )}
    </>
  );
}
