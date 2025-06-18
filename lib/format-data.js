export default function formaterData(data) {
  if (!Array.isArray(data)) {
    console.error("format-data.js — data n'est pas un tableau :", data);
    return [];
  }

  return data.map((item) => {
    const result = {};
    const entries = Object.entries(item);

    entries.forEach(([key, value]) => {
      if (key === "createdAt" || key === "description") {
        // On ignore ces champs
        return;
      } else if (typeof value === "object" && value !== null) {
        const values = Object.entries(value);
        values.forEach(([cle, valeur]) => {
          if (cle !== "createdAt" && cle !== "description") {
            result[cle] = valeur;
          }
        });
      } else {
        result[key] = value;
      }
    });

    return result;
  });
}