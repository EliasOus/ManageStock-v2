"use client";
import { useState } from "react";
import Button from "./Button";
import styles from "./InputForm.module.css";
import { inputFormServer } from "@/actions/inputForm-action";
import { usePathname } from "next/navigation";

export default function InputForm({ className, inputFields, onClose }) {
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
        <form
          action={inputFormServer}
          className={`${styles.form} ${className}`}
        >
          {inputFields.map((field, index) => (
            <div key={index}>
              {field.name === "description" ? (
                // Render a textarea for the description input
                <textarea
                  name={field.name}
                  placeholder={field.placeholder}
                  className={`${styles.input} ${styles.textarea}`}
                />
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
            <div onClick={handleVisibleForm}>
              <Button texte="Annuler" type="button" active={true} />
            </div>
          </div>
        </form>
      )}
    </>
  );
}
