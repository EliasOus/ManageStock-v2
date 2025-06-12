import InfoBloc from "@/components/InfoBlock";
import InputForm from "@/components/InputForm";
import style from "./utilisateur.module.css";
import { prisma } from "@/lib/prisma";
import formaterData from "@/actions/format-data";

export default async function Utilisateur() {
  const inputFields = [
    { name: "nom", placeholder: "Nom" },
    { name: "prenom", placeholder: "Prenom" },
    { name: "nomUtilisateur", placeholder: "Nom D'utilisateur" },
    { name: "Password", placeholder: "Mot De Passe" },
    { name: "poste", placeholder: "Poste" },
  ];

  const utilisateurs = await prisma.utilisateur.findMany({
    select: {
      id: true,
      nom: true,
      prenom: true,
      nomUtilisateur: true,
      motDePasse: true,
      poste: true,
    },
  });

  const utilisateursFormater = await formaterData(utilisateurs);
  return (
    <>
      <h1 className={style.titre}>Gestion d'utilisateur</h1>
      <div className={style.inputform}>
        <InputForm inputFields={inputFields} />
      </div>
      <div>
        <InfoBloc
          dataType={"utilisateur"}
          defaultTitle={"Utilisateurs"}
          defaultHeaders={[
            "Nom",
            "Prenom",
            "Nom utilisateur",
            "Mot de passe",
            "Poste",
          ]}
          data={utilisateursFormater}
        />
      </div>
    </>
  );
}
