const express = require("express");
const bodyParser = require("body-parser");
const MessagingResponse = require("twilio").twiml.MessagingResponse;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// Ruta que recibe mensajes
app.post("/webhook", (req, res) => {
  const twiml = new MessagingResponse();
  const msg = twiml.message();

  const userMessage = req.body.Body.trim().toLowerCase();

  if (userMessage === "hola") {
    msg.body(
      `¡Hola! 👋 Gracias por escribir. Soy el asistente del equipo de campaña. ¿En qué puedo ayudarte hoy?\n\nResponde con un número:\n1️⃣ Información del candidato\n2️⃣ Próximos eventos\n3️⃣ Cómo puedo ayudar\n4️⃣ Salir`
    );
  } else if (userMessage === "1") {
    msg.body(`Nuestro candidato tiene una trayectoria sólida en el servicio público. Ha trabajado por la educación, la seguridad y el desarrollo de nuestra región.`);
  } else if (userMessage === "2") {
    msg.body(`📅 Próximo evento: Reunión comunitaria el sábado a las 10am en el parque principal. ¡Te esperamos!`);
  } else if (userMessage === "3") {
    msg.body(`💪 Puedes apoyar compartiendo nuestras propuestas, asistiendo a eventos o siendo voluntario. ¿Quieres que alguien de nuestro equipo te contacte?`);
  } else if (userMessage === "4" || userMessage === "salir") {
    msg.body(`¡Gracias por tu interés! Estamos en contacto. 🇨🇴`);
  } else {
    msg.body(`No entendí tu mensaje. Por favor responde con un número del 1 al 4.`);
  }

  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor funcionando en puerto ${PORT}`);
});
