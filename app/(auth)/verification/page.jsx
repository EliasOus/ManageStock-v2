// import { useSearchParams } from "next/navigation";
// import { useState } from "react";

// export default function VerificationPage() {
//   const searchParams = useSearchParams();
//   const token = searchParams.get("token");
//   const [status, setStatus] = useState<"loading" | "success" | "error">("loading");


//   return (
//     <div>
//       <p>Email vérifié avec succès ! Vous pouvez maintenant vous connecter.</p>
//     </div>
//   );
// }


"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function VerificationPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const [status, setStatus] = useState("loading")

  useEffect(() => {
    if (token) {
      // Ici, tu pourrais envoyer une requête vers ton backend pour valider le token
      console.log("Token reçu :", token)
      setStatus("success")
    } else {
      setStatus("error")
    }
  }, [token])

  return (
    <div className="p-4">
      {status === "loading" && <p>Vérification en cours...</p>}
      {status === "success" && (
        <p className="text-green-600 dark:text-green-400">
            Email vérifié avec succès ! Vous pouvez maintenant vous connecter.
        </p>
      )}
      {status === "error" && (
        <p className="text-red-600 dark:text-red-400">
            Lien de vérification invalide ou expiré.
        </p>
      )}
    </div>
  )
}
