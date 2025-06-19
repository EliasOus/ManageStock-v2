import { connexion } from "@/actions/connexion-action";
import styles from "./page.module.css";
import Login from "@/components/login";

export default function Connexion() {
  return (
    <>
      <Login functionAction={connexion}/>
    </>
  );
}
