"use client"
import style from "./ReseauxSociau.module.css";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";

export default function ReseauxSociau() {

  const socialLoginHandler = (provider) =>{
    signIn(provider, {redirectTo : "/dashboard"})
  }

  return (
    <div className={style.reseauxSociau}>
      <div className={style.google}>
        <FcGoogle />
        Continuer avec Google
      </div>
      <div onClick={() => socialLoginHandler("github")} className={style.github}>
        <FaGithub />
        Continuer avec GitHub
      </div>
    </div>
  );
}
