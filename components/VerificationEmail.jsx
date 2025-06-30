"use client";

import verificationEmailAction from "@/actions/verification-action";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { FcApproval } from "react-icons/fc";
import { FcHighPriority } from "react-icons/fc";
import style from "./VerificationEmail.module.css";
import Button from "./Button";

export default function VerificationEmail() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await verificationEmailAction(token);
        if (res.status === "success") {
          setStatus("success");
          setMessage(res.message);
        } else {
          setStatus("error");
          setMessage(res.message);
        }
      } catch (err) {
        setStatus("error");
        setMessage("Une erreur est survenue.");
      }
    };

    if (token) {
      verify();
    } else {
      setStatus("error");
      setMessage("Token manquant.");
    }
  }, [token]);

  return (
    <>
      {status === "loading" && <p>Vérification en cours...</p>}
      {status === "success" && (
        <div className={style.contenerEmail}>
          <h2>Félicitation!</h2>
          <p>{message}</p>
          <FcApproval />
          <Button texte={"Se Connecte"} active={true} goToUrl={"/login"} />
        </div>
      )}
      {status === "error" && (
        <div className={style.contenerEmail}>
          <h2>Oops!</h2>
          <p>{message}</p>
          <FcHighPriority />
        </div>
      )}
    </>
  );
}
