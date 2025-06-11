"use client";

import { useState } from "react";
import Button from "./Button";
import styles from "./InputForm.module.css";
import { inputFormServer } from "@/actions/inputForm-action";

export default function InputForm({ className, inputFields, onClose }) {
  const [inputValues, setInputValues] = useState(
    Object.fromEntries(inputFields.map((field) => [field.name, ""]))
  );

  const handleInputChange = (name, value) => {
    setInputValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Loop through all input fields to check if any field is empty
    for (const [key, value] of Object.entries(inputValues)) {
      if (!value.trim()) {
        alert(`Please fill in the ${key} field.`);
        return; // Stop submission if a field is empty
      }
    }
  };

  return (
    <form action={inputFormServer} className={`${styles.form} ${className}`}>
      {inputFields.map((field, index) => (
        <div key={index}>
          {field.name === "description" ? (
            // Render a textarea for the description input
            <textarea
              name={field.name}
              value={inputValues[field.name]}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              className={`${styles.input} ${styles.textarea}`} // Apply additional CSS for larger input
            />
          ) : (
            // Render a normal input field
            <input
              type="text"
              name={field.name}
              value={inputValues[field.name]}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              className={styles.input}
            />
          )}
        </div>
      ))}
      <div className={styles.buttonContainer}>
        <Button texte="Enregistrer" type="submit" active={true} />
        {/* <button type="submit" onClick={onSubmit}>Enregistrer</button> */}
        <div onClick={onClose}>
          <Button texte="Annuler" type="button" active={true} />
        </div>
      </div>
    </form>
  );
}
