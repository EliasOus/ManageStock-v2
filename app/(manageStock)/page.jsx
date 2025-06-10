import styles from "./page.module.css";
import Image from "next/image";
import banner from "@/public/banner.png";
import Button from "@/components/Button";
import SectionEntreprises from "@/components/SectionEntreprise";
import AvantagePlateforme from "@/components/AvantagePlateforme";
import CarteDecouvr from "@/components/Carte1";
import FAQ from "@/components/FAQ";

import imgGestion from "@/public/imgGestion.png";
import imgGain from "@/public/imgGain.png";
import imgVisibilite from "@/public/imgVisibilite.png";
import imgChart from "@/public/chart-img.png";
import imgIdentifier from "@/public/identifiez-img.jpg";
import imgSuivez from "@/public/suivez-img.png";
import logoWhite from "@/public/Logo-White.png";
import { prisma } from "@/lib/prisma";

const test = await prisma.TestModel.findMany();

console.log("*************************** " + JSON.stringify(test, null, 2));

export default function Home() {
  return (
    <>
      <div className={styles.sectionBanner} id="Accueil">
        <Image src={banner} alt={"banner de la page d'accueil"} quality={100} />
        <div className={styles.hook}>
          <h1>
            Augmentez vos ventes grâce à des analyses de données puissantes
          </h1>
          <h3>
            Comprenez le potentiel des analyses de ventes pour améliorer les
            performances de votre équipe et atteindre vos objectifs de revenus.
            Un aperçu concis des métriques de vente pour suivre les progrès et
            identifier les axes d'amélioration.
          </h3>
          {/* <div onClick={goToLogin}> */}
          <Button
            texte={"Commencez Maintenant"}
            type="button"
            active={true}
            goToUrl={"/login"}
          />
          {/* </div> */}
        </div>
      </div>
      <div className={styles.sectionEntreprise}>
        <SectionEntreprises />
      </div>
      <div className={styles.sectionAventage}>
        <h1>Découvrez les avantages de ManageStock.</h1>
        <h3>La solution idéale pour les leaders des ventes de produits</h3>
        <div className={styles.carteAventage}>
          <AvantagePlateforme
            imageCarte={imgGestion}
            titre={"Gestion centralisée"}
            description={
              "Suivez et organisez vos stocks en temps réel depuis une seule plateforme intuitive."
            }
          />
          <AvantagePlateforme
            imageCarte={imgGain}
            titre={"Gain de temps"}
            description={
              "Automatisez les tâches répétitives et concentrez-vous sur la croissance de votre entreprise."
            }
          />
          <AvantagePlateforme
            imageCarte={imgVisibilite}
            titre={"Visibilité complète"}
            description={
              "Analysez vos performances avec des rapports détaillés pour une prise de décision éclairée."
            }
          />
        </div>
      </div>
      <div className={styles.sectionDecouver}>
        <CarteDecouvr
          titre={"Identifiez rapidement vos produits les plus performants"}
          paragraphe={
            "Grâce à ManageStock, analysez facilement les données de vente et isolez vos produits qui génèrent le plus de revenus. Prenez des décisions éclairées pour optimiser votre stratégie et maximiser vos profits."
          }
          texteButton={"Commencez Maintenant"}
          estVisible={true}
          activeButton={true}
          btnGoToUrl={"/login"}
          srcImage1={imgChart}
          srcImage2={imgIdentifier}
        />
        <CarteDecouvr
          titre={"Suivez l'activité de vos ventes et facilitez leur analyse."}
          paragraphe={
            "Suivez vos performances commerciales en temps réel et analysez vos données de vente avec des outils intuitifs, conçus pour simplifier la prise de décisions stratégiques."
          }
          texteButton={"Découvrez notre solution"}
          activeButton={true}
          btnGoToUrl={"/login"}
          srcImage2={imgSuivez}
          estInverse={true}
        />
      </div>
      <div className={styles.sectionApropo} id="Apropos">
        <h1>Qui sommes-nous ?</h1>
        <div className={styles.bannerAporpo}>
          <h3>
            Notre application est conçue pour simplifier la gestion des
            entreprises avec des solutions modernes et intuitives. Notre mission
            est d'aider nos clients à optimiser leurs performances et à
            atteindre leurs objectifs en toute simplicité.
          </h3>
          <Image src={logoWhite} alt={"logo managestock white"} />
        </div>
      </div>
      <div className={styles.sectionFaq} id="Faq">
        <h1>Questions Fréquentes</h1>
        <div className={styles.questions}>
          <FAQ
            question={
              "Est-ce que ManageStock est adapté à toutes les tailles d'entreprises ?"
            }
            response={
              "Oui, ManageStock est conçu pour s'adapter aux besoins de toutes les entreprises, que ce soit pour une petite entreprise ou une grande organisation. Nos fonctionnalités sont évolutives pour s'ajuster à votre croissance."
            }
          />
          <FAQ
            question={
              "Quels types de rapports sont disponibles sur ManageStock ?"
            }
            response={
              "ManageStock propose différents types de rapports, tels que les rapports de ventes, d'inventaire, de mouvements de stock et de performances des produits. Ces rapports aident à suivre l'état des stocks et à analyser les données commerciales."
            }
          />
          <FAQ
            question={
              "Puis-je gérer plusieurs magasins ou entrepôts avec ManageStock ?"
            }
            response={
              "Oui, ManageStock permet de gérer plusieurs magasins ou entrepôts en toute simplicité. Vous pouvez facilement suivre les stocks, les ventes et les mouvements de produits dans chacun de vos établissements."
            }
          />
          <FAQ
            question={"Est-ce que ManageStock propose une version mobile ?"}
            response={
              "Oui, ManageStock dispose d'une application mobile disponible sur le Play Store."
            }
          />
        </div>
      </div>
    </>
  );
}
