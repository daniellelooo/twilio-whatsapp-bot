// send-message.js

const twilio = require('twilio');

// Reemplaza con tus credenciales reales (las encuentras en https://www.twilio.com/console)
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = new twilio(accountSid, authToken);

// Reemplaza con tu número Sandbox (remitente) y tu número de WhatsApp (destinatario)
const from = 'whatsapp:+14155238886';
const to = 'whatsapp:+573115807057'; // Tu número en formato internacional

const mensaje = `
🌟 ¡Tu voz importa!

Únete a nuestra campaña por un cambio real. 
Con tu apoyo, podemos construir un mejor futuro para todos.

✅ Comparte
✅ Participa
✅ Sé parte del cambio

#TuVozCuenta
`;

client.messages
  .create({
    from,
    to,
    body: mensaje,
  })
  .then(message => {
    console.log('Mensaje enviado con SID:', message.sid);
  })
  .catch(error => {
    console.error('Error al enviar el mensaje:', error);
  });
