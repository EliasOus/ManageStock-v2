import style from "./ReseauxSociau.module.css";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function ReseauxSociau() {
  return (
    <div className={style.reseauxSociau}>
      <div className={style.google}>
        <FcGoogle />
        Continuer avec Google
      </div>
      <div className={style.github}>
        <FaGithub />
        Continuer avec GitHub
      </div>
    </div>
  );
}
