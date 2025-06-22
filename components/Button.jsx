"use client";
import { redirect } from "next/navigation";
import styles from "./Button.module.css";

export default function Button({ texte, className, active, type, goToUrl }) {
  const goTo = () => {
    redirect(`${goToUrl}`);
  };
  return (
    <>
      {goToUrl ? (
        <button
          className={`${styles.button} ${className} ${
            active ? styles.active : ""
          }`}
          type={type}
          onClick={goTo}
        >
          {texte}
        </button>
      ) : (
        <button
          className={`${styles.button} ${className} ${
            active ? styles.active : ""
          }`}
          type={type}
        >
          {texte}
        </button>
      )}
    </>
  );
}
