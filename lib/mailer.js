import nodemailer from "nodemailer";

export async function sendVerificationEmail(toEmail, token) {
  // Crée le transporteur SMTP avec Gmail et mot de passe d'application
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.PASS_EMAIL,
    },
    secure: true,
    tls: {
      rejectUnauthorized: false,
    },
  });

  const lien = `${process.env.DOMAIN}/verification?token=${token}`;

  // Définir le contenu du mail
  const mailOptions = {
    from: `"ManageStock" ${process.env.USER_EMAIL}`,
    to: toEmail,
    subject: "Confirme ton inscription",
    html: `
    <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
        <p>Bonjour,</p>

        <p>Merci de vous être inscrit sur notre plateforme !</p>

        <p>Pour valider votre adresse email et activer votre compte, veuillez cliquer sur le lien ci-dessous :</p>

        <p>
            <a href="${lien}" style="color: #1a73e8; text-decoration: none;">
            ${lien}
            </a>
        </p>

        <p>Si vous n’êtes pas à l’origine de cette demande, vous pouvez ignorer cet email.</p>

        <p style="margin-top: 30px;">Cordialement,<br />
        L’équipe <strong>ManageStock</strong></p>
    </div>
    `,
  };

  // Envoyer le mail
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
  }
}

export async function sendEmail(data) {
  // Crée le transporteur SMTP avec Gmail et mot de passe d'application
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.PASS_EMAIL,
    },
    secure: true,
    tls: {
      rejectUnauthorized: false,
    },
  });

  // Définir le contenu du mail
  const mailOptions = {
    from: `"ManageStock" ${process.env.USER_EMAIL}`,
    to: process.env.USER_EMAIL,
    subject: `Nouveau message de ${data.name}: ${data.emailObject}`,
    text: `De: ${data.name} || ${data.nomEntreprise} (${data.email})\n\nMessage:\n${data.emailMessage}`,
  };

  // Envoyer le mail
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
  }
  
}
