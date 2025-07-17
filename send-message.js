require("dotenv").config(); // Cargar variables del archivo .env

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromWhatsApp = process.env.TWILIO_WHATSAPP_NUMBER;
const toWhatsApp = process.env.TO_NUMBER;

const client = require("twilio")(accountSid, authToken);

client.messages
  .create({
    from: fromWhatsApp,
    to: toWhatsApp,
    body: `¡Hey! 👋 Bienvenid@ al movimiento que está dando de qué hablar 💥
Soy Samuel Romero, y si estás aquí es porque te interesa transformar este país desde la cultura, la innovación y la tecnología.

¿Te gustaría sumarte a esta red de jóvenes que quieren cambiar el juego? 🎮🔥

👉🏼 ¿Aceptas que te haga unas preguntas rápidas para conectarte a nuestra red? 

👉 Responde: *Sí* o *No*

(Nuestra política de protección de datos cumple con la ley 1581: https://bit.ly/PoliticaDeDatosSamuelRomero)`,
  })
  .then((message) => console.log("✅ Mensaje enviado:", message.sid))
  .catch((err) => console.error("❌ Error al enviar:", err));
