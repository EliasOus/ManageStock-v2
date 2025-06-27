import style from "./SuccesEmail.module.css";
import { FaCheckCircle } from "react-icons/fa";

/**
 * Composant affiche un message de confirmation pour informer l'utilisateur que son message a été envoyé avec succès.
 * @returns
 */
export default function SeccesEmail() {
  return (
    <div className={style.body}>
      <span></span>
      <div className={style.contenaire}>
        <h1>Merci ! </h1>
        <p>Nous vous recontacterons dans les prochaines 24h</p>
        <FaCheckCircle className={style.logo} />
      </div>
    </div>
  );
}
