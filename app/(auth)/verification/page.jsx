import VerificationEmail from "@/components/VerificationEmail";
import style from "./page.module.css"
import { Suspense } from "react";

export default function VerificationPage() {

  return (
    <div className={style.contener}>
      <Suspense fallback={<div>Chargement...</div>}>
        <VerificationEmail />
      </Suspense>
    </div>
  );
}
