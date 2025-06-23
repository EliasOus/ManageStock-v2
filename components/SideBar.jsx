"use client";
import style from "./Sidebar.module.css";
import Image from "next/image";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { IoHomeOutline, IoSearch } from "react-icons/io5";
import { BsBoxSeam } from "react-icons/bs";
import { GiBoxUnpacking } from "react-icons/gi";
import { MdOutlineInventory2, MdOutlineLogout } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { deconnexion } from "@/actions/connexion-action";

/**
 * Composant SideBar
 *
 * Ce composant affiche une barre latérale de navigation pour le tableau de bord.
 * Il met en surbrillance l'élément actif en fonction de l'URL actuelle.
 *
 * Utilise `usePathname()` pour récupérer l'URL et applique une classe spécifique
 * aux liens actifs.
 */
export default function SideBar({ session }) {
  // Récupération du chemin actuel pour déterminer l'élément actif
  const url = usePathname();

  return (
    <div className={style.sideBar}>
      <div className={style.titre}>
        <h2>bienvenue</h2>
        {session && (
          <p>
            {session.user.nom} {session.user.prenom}
          </p>
        )}
      </div>

      <nav>
        <ul>
          <li>
            {url === "/dashboard" ? (
              <div className={style.selection}>
                <span className={style.circleH}></span>
                <span className={style.circleB}></span>
                <IoHomeOutline
                  className={style.sideBarLogo}
                  style={{ color: "black" }}
                />
                <Link href="/dashboard">Accueil</Link>
              </div>
            ) : (
              <div>
                <IoHomeOutline className={style.sideBarLogo} />
                <Link href="/dashboard">Accueil</Link>
              </div>
            )}
          </li>
          <li>
            {url === "/dashboard/recherche" ? (
              <div className={style.selection}>
                <span className={style.circleH}></span>
                <span className={style.circleB}></span>
                <IoSearch
                  className={style.sideBarLogo}
                  style={{ color: "black" }}
                />
                <Link href="/dashboard/recherche">Recherche Article</Link>
              </div>
            ) : (
              <div>
                <IoSearch className={style.sideBarLogo} />
                <Link href="/dashboard/recherche">Recherche Article</Link>
              </div>
            )}
          </li>
          <li>
            {url === "/dashboard/receptions" ? (
              <div className={style.selection}>
                <span className={style.circleH}></span>
                <span className={style.circleB}></span>
                <BsBoxSeam
                  className={style.sideBarLogo}
                  style={{ color: "black" }}
                />
                <Link href="/dashboard/receptions">
                  Gestions des Réceptions
                </Link>
              </div>
            ) : (
              <div>
                <BsBoxSeam className={style.sideBarLogo} />
                <Link href="/dashboard/receptions">
                  Gestions des Réceptions
                </Link>
              </div>
            )}
          </li>
          <li>
            {url === "/dashboard/retours" ? (
              <div className={style.selection}>
                <span className={style.circleH}></span>
                <span className={style.circleB}></span>
                <GiBoxUnpacking
                  className={style.sideBarLogo}
                  style={{ color: "black" }}
                />
                <Link href="/dashboard/retours">Traitement des Retours</Link>
              </div>
            ) : (
              <div>
                <GiBoxUnpacking className={style.sideBarLogo} />
                <Link href="/dashboard/retours">Traitement des Retours</Link>
              </div>
            )}
          </li>
          <li>
            {url === "/dashboard/inventaire" ? (
              <div className={style.selection}>
                <span className={style.circleH}></span>
                <span className={style.circleB}></span>
                <MdOutlineInventory2
                  className={style.sideBarLogo}
                  style={{ color: "black" }}
                />
                <Link href="/dashboard/inventaire">Article & Inventaire</Link>
              </div>
            ) : (
              <div>
                <MdOutlineInventory2 className={style.sideBarLogo} />
                <Link href="/dashboard/inventaire">Article & Inventaire</Link>
              </div>
            )}
          </li>
          <li>
            {url === "/dashboard/utilisateurs" ? (
              <div className={style.selection}>
                <span className={style.circleH}></span>
                <span className={style.circleB}></span>
                <FiUsers
                  className={style.sideBarLogo}
                  style={{ color: "black" }}
                />
                <Link href="/dashboard/utilisateurs">
                  Gestion des Utilisateurs
                </Link>
              </div>
            ) : (
              <div>
                <FiUsers className={style.sideBarLogo} />
                <Link href="/dashboard/utilisateurs">
                  Gestion des Utilisateurs
                </Link>
              </div>
            )}
          </li>
        </ul>
        <form action={deconnexion}>
          <button type="submit" className={style.btnDeconexion}>
            <MdOutlineLogout className={style.sideBarLogo} />
            Déconnexion
          </button>
        </form>
        {/* <Link href="/">Déconnexion</Link> */}
      </nav>
    </div>
  );
}
