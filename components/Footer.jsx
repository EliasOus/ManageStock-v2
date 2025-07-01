import Image from "next/image";
import logo from "@/public/Logo-White.png";
import facebook from "@/public/facebook.svg";
import instagram from "@/public/instagram.svg";
import twitter from "@/public/twitter.svg";
import whatsapp from "@/public/whatsapp.svg";
import style from "./Footer.module.css";
import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className={style.footer}>
        <div className={style.info}>
          <Image src={logo} alt="logo de site web" className={style.Image} />
          <p>
            Simplifier la gestion des stocks pour aider les entreprises à
            optimiser leurs inventaires et améliorer leurs performances
          </p>
          <h4>801 Aviation Pkwy, Ottawa, ON K1J 1H2</h4>
        </div>
        <div className={style.liens}>
          <h4>Liens Pratiques :</h4>
          <Link href="#">Accueil</Link>
          <Link href="/#Apropos">À propos</Link>
          <Link href="/contactez-nous">Contact</Link>
          <Link href="/#Faq">FAQ</Link>
        </div>
        <div className={style.reseaux}>
          <h4>Réseaux sociaux :</h4>
          <div>
            <Link href="#">
              <Image src={facebook} alt="logo facebook" />
            </Link>
            <Link href="#">
              <Image src={instagram} alt="logo instagram" />
            </Link>
            <Link href="#">
              <Image src={twitter} alt="logo twitter" />
            </Link>
            <Link href="#">
              <Image src={whatsapp} alt="logo whatsapp" />
            </Link>
          </div>
        </div>
        <div className={style.contact}>
          <h4>Nous contacter :</h4>
          <h4>contact@managestock.com</h4>
        </div>
      </div>
    </footer>
  );
}
