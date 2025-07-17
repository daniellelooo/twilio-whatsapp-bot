const express = require('express');
const bodyParser = require('body-parser');
const { SessionsClient } = require('@google-cloud/dialogflow');
const dotenv = require('dotenv');
const twilio = require('twilio');

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
const projectId = process.env.DIALOGFLOW_PROJECT_ID;

const sessionClient = new SessionsClient({
  keyFilename: './key.json',
});

// Estado temporal de los usuarios (en memoria)
const estadosUsuarios = {}; // { 'whatsapp:+57300...': 0, 1, 2, ... }

app.post('/webhook', async (req, res) => {
  const message = req.body.Body;
  const from = req.body.From;
  const lowerMessage = message.toLowerCase();

  // Obtener estado actual del usuario (default: 0 - Consentimiento)
  let estado = estadosUsuarios[from] || 0;
  let replyText = '';

  try {
    // Paso 0: Consentimiento
    if (estado === 0) {
      if (lowerMessage.includes('sí') || lowerMessage.includes('si')) {
        replyText = 'Genial 🎉 Vamos a empezar.\n👉 Por favor, dime tu nombre completo:\nEjemplo: Ana Torres';
        estadosUsuarios[from] = 1;
      } else if (lowerMessage.includes('no')) {
        replyText = '¡Gracias por tu tiempo! Si cambias de opinión, aquí estaré. 💬';
      } else {
        replyText = 'Por favor responde con "sí" o "no". 🙏';
      }
    }

    // Paso 1: Nombre completo
    else if (estado === 1) {
      if (message.length >= 5) {
        replyText = `¡Bien ahí, ${message}! Ahora dime, ¿cuántos años tienes?`;
        estadosUsuarios[from] = 2;
      } else {
        replyText = 'Por favor dime tu nombre completo (mínimo nombre y apellido).';
      }
    }

    // Paso 2: Edad
    else if (estado === 2) {
      const edad = parseInt(message);
      if (!isNaN(edad) && edad > 0 && edad < 120) {
        replyText = 'Perfecto. 📄 Ahora, tu número de cédula por favor (la cuidamos full):';
        estadosUsuarios[from] = 3;
      } else {
        replyText = 'Por favor escribe tu edad en números. Ejemplo: 18';
      }
    }

    // Paso 3: Cédula
    else if (estado === 3) {
      const cedula = message.replace(/\D/g, '');
      if (cedula.length >= 6 && cedula.length <= 12) {
        replyText = '¿Y en qué ciudad estás viviendo?';
        estadosUsuarios[from] = 4;
      } else {
        replyText = 'Por favor ingresa un número de cédula válido. 🙏';
      }
    }

    // Paso 4: Ciudad
    else if (estado === 4) {
      if (message.length >= 3) {
        replyText = `🚀 ¡Listo crack! Estás oficialmente en la red de Samuel.\n\n🗳️ Tu participación cuenta.\n¿Quieres ser parte de nuestro equipo como *testigo electoral* o *voluntari@*?\n\n🧭 Selecciona una opción 👇`;
        estadosUsuarios[from] = 5;
      } else {
        replyText = 'Por favor indica una ciudad válida.';
      }
    }

    // Paso 5: Opcional — puede continuar con otras preguntas o menú
    else {
      replyText = '💬 ¡Gracias por participar! Si quieres hacer otra cosa, escribe *menú*.';
    }

    // Enviar respuesta por WhatsApp
    await twilioClient.messages.create({
      body: replyText,
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to: from,
    });

    res.status(204).end();
  } catch (error) {
    console.error('❌ Error al procesar el mensaje:', error);
    res.sendStatus(500);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🟢 Servidor escuchando en el puerto ${PORT}`);
});
