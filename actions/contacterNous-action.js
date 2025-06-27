"use server";
import { sendEmail } from "@/lib/mailer";
import { redirect } from "next/navigation";

export default async function contactezServeur(valideData) {
  const { name, email, telephone, nomEntreprise, emailObjet, emailMessage } =
    valideData.data;

  const validedata = {
    name: name,
    email: email,
    telephone: telephone,
    nomEntreprise: nomEntreprise,
    emailObjet: emailObjet,
    emailMessage: emailMessage,
  };
  console.log(
    "email emnvoye super ****************** " +
      JSON.stringify(validedata, null, 2)
  );
  await sendEmail(validedata);
  redirect("/contactez-nous/succes");
}
