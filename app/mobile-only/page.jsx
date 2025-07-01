import MobilBlocker from "@/components/MobilBlocker";
import styles from "./page.module.css";
import { FaApple } from "react-icons/fa";
import Image from "next/image";

export default function PageMobileOnly() {
  return (
    <>
      <MobilBlocker />
      <main className={styles.pageMobile}>
        <h1 className={styles.titre}>
          {"Ce site n'est pas disponible en version mobile"}
        </h1>
        <p className={styles.message}>
          Pour continuer, veuillez télécharger notre application mobile.
        </p>
        <div className={styles.boutons}>
          <a
            href="https://play.google.com/store/apps/details?id=ton.app.id"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.bouton}
            aria-label="Télécharger sur Google Play"
          >
            <Image
              src="/google-play-store.png"
              alt="Logo Google Play"
              className={styles.logo}
              width={500}
              height={500}
            />
            Google Play
          </a>
          <a
            href="https://apps.apple.com/app/idtonappid"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.bouton}
            aria-label="Télécharger sur App Store"
          >
            <FaApple />
            App Store
          </a>
        </div>
      </main>
    </>
  );
}
