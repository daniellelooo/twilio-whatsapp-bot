# 🤖 SamuelBot – WhatsApp Chatbot con Twilio + Dialogflow

Este es un bot conversacional para WhatsApp diseñado para campañas de participación juvenil. Usa **Twilio**, **Dialogflow** y Node.js para interactuar con los usuarios, recolectar datos y brindar una experiencia personalizada.

---

## 🧩 Tecnologías utilizadas

- [Node.js](https://nodejs.org/)
- [Twilio API para WhatsApp](https://www.twilio.com/whatsapp)
- [Dialogflow ES (Google Cloud)](https://dialogflow.cloud.google.com/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [Ngrok](https://ngrok.com/) (para pruebas locales)

---

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/twilio-whatsapp-bot.git
cd twilio-whatsapp-bot
```

### 2. Instalar dependencias

```bash
npm install
```

---

## 🛠 Configuración

### 3. Crear archivo `.env`

Crea un archivo llamado `.env` en la raíz del proyecto con este contenido:

```env
TWILIO_SID=ACXXXXXXXXXXXXXXXXXXXXXXXXXXXX
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_PHONE_NUMBER=+14155238886
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
TO_NUMBER=whatsapp:+5731XXXXXXXX
DIALOGFLOW_PROJECT_ID=tu-id-de-proyecto
```

> Reemplaza los valores con tus datos reales de Twilio y Dialogflow.

---

## 🔑 Obtener las credenciales necesarias

### Twilio (WhatsApp)

1. Crea una cuenta en https://twilio.com
2. Ve a la sección [Console](https://console.twilio.com/)
3. Copia tu **SID** y **AUTH TOKEN**
4. Activa el Sandbox de WhatsApp aquí: https://www.twilio.com/console/sms/whatsapp/learn
5. Guarda el número asignado y tu mensaje de verificación

### Dialogflow (Google Cloud)

1. Ve a https://console.cloud.google.com/
2. Crea un proyecto y habilita la **Dialogflow API**
3. Ve a **IAM y administración → Cuentas de servicio**
4. Crea una cuenta con el rol: `Dialogflow API Client`
5. Descarga el archivo `.json` de claves
6. Guarda el archivo como `key.json` en la raíz del proyecto

---

## 🧠 Intents requeridos en Dialogflow

Crea los siguientes intents con sus parámetros:

| Intent             | Parámetro      | Tipo         |
|--------------------|----------------|--------------|
| Consentimiento     |                |              |
| NombreUsuario      | `nombre`       | `@sys.any`   |
| EdadUsuario        | `edad`         | `@sys.number`|
| CedulaUsuario      | `cedula`       | `@sys.any`   |
| CiudadUsuario      | `ciudad`       | `@sys.any`   |
| RolUsuario         | `rol`          | `@sys.any`   |
| Despedida          |                |              |

> Marca la opción **"Enable webhook call for this intent"** en cada uno.

---

## 🧪 Ejecutar en local

### 1. Iniciar el servidor del bot

```bash
node dialogflow-bot.js
```

### 2. Exponer el servidor con ngrok (opcional)

```bash
npx ngrok http 3000
```

Copia el enlace HTTPS generado y pégalo en tu consola de Twilio Sandbox:
```
https://xxxxxx.ngrok.io/webhook
```

---

## 💬 Enviar el primer mensaje (inicio del flujo)

Ejecuta:

```bash
node send-message.js
```

Este archivo envía el mensaje inicial para empezar la conversación.

---

## 📦 Estructura del proyecto

```
📁 twilio-whatsapp-bot/
├── .env
├── key.json
├── dialogflow-bot.js
├── send-message.js
├── package.json
├── README.md
└── ...
```

---

## 🔐 Seguridad y privacidad

- Este bot recopila datos sensibles (nombre, edad, cédula, ciudad).
- Asegúrate de:
  - Tener una **política de privacidad** visible.
  - Obtener consentimiento explícito.
  - No subir `.env` ni `key.json` al repositorio público.

---

## ☁️ Despliegue en producción

Puedes subir este bot a:

- [Railway](https://railway.app/)
- [Render](https://render.com/)
- [Google Cloud Run](https://cloud.google.com/run)
- VPS con PM2 y Node.js

---

## 📝 Licencia

MIT – Este proyecto fue desarrollado con fines educativos y sociales para promover la participación juvenil en Colombia.

---

## 🙌 Créditos

Desarrollado por **Daniel León** con acompañamiento técnico personalizado y soporte continuo.
