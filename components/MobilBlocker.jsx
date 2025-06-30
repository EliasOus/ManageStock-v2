// "use client"
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";

// export default function MobilBlocker() {
//   const router = useRouter();

//   useEffect(() => {
//     // Fonction pour vérifier la largeur et rediriger si besoin
//     function checkWidth() {
//       if (window.innerWidth < 1024 && router.pathname !== "/mobile-only") {
//         router.replace("/mobile-only");
//       }
//     }

//     checkWidth();

//     // Vérifie à chaque redimensionnement de la fenêtre
//     window.addEventListener("resize", checkWidth);

//     return () => {
//       window.removeEventListener("resize", checkWidth);
//     };
//   }, [router]);

//   return null;
// }

"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function MobilBlocker() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    function checkWidth() {
      const width = window.innerWidth;

      if (width < 1024 && pathname !== "/mobile-only") {
        router.replace("/mobile-only");
      } else if (width >= 1024 && pathname === "/mobile-only") {
        router.replace("/");
      }
    }

    // Vérifie immédiatement
    checkWidth();

    // Puis à chaque redimensionnement
    window.addEventListener("resize", checkWidth);

    return () => {
      window.removeEventListener("resize", checkWidth);
    };
  }, [pathname, router]);

  return null;
}
