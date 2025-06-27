import InfoBloc from "@/components/InfoBlock";
import InputForm from "@/components/InputForm";
import style from "./utilisateur.module.css";
import { prisma } from "@/lib/prisma";
import formaterData from "@/lib/format-data";
import { inputSafeUtilisateur } from "@/actions/utilisateur-action";

export default async function Utilisateur() {
  const inputFields = [
    { name: "name", placeholder: "nom Complet" },
    { name: "nomUtilisateur", placeholder: "Nom D'utilisateur" },
    { name: "motDePasse", placeholder: "Mot De Passe" },
    { name: "poste", placeholder: "Poste" },
  ];

  const utilisateurs = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      nomUtilisateur: true,
      motDePasse: true,
      poste: true,
    },
  });

  const utilisateursFormater = formaterData(utilisateurs);
  return (
    <>
      <h1 className={style.titre}>Gestion d'utilisateur</h1>
      <div className={style.inputform}>
        <InputForm
          inputFields={inputFields}
          ActionFunction={inputSafeUtilisateur}
        />
      </div>
      <div>
        <InfoBloc
          dataType={"utilisateur"}
          defaultTitle={"Utilisateurs"}
          defaultHeaders={[
            "Nom",
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
