import { inscription } from "@/actions/inscription-action";
import styles from "./page.module.css";
import Login from "@/components/login";

export default function Inscription() {

  return (
    <>
      <Login functionAction={inscription}/>
    </>
  );
}
