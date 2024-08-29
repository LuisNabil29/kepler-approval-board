const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  // Configurar según tu proveedor de correo
});

exports.sendVerificationEmail = async (email, token) => {
  const verificationLink = `http://yourapp.com/verify-email/${token}`;
  
  await transporter.sendMail({
    from: '"Kepler Approval Board" <noreply@yourapp.com>',
    to: email,
    subject: 'Verifica tu correo electrónico',
    html: `Por favor, haz clic en este enlace para verificar tu correo electrónico: <a href="${verificationLink}">${verificationLink}</a>`,
  });
};