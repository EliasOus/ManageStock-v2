import VerificationEmail from "@/components/VerificationEmail";
import style from "./page.module.css"

export default function VerificationPage() {

  return (
    <div className={style.contener}>
      <VerificationEmail />
    </div>
  );
}
