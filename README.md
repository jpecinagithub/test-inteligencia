# Test de Inteligencia - Plataforma Profesional

Una aplicación web completa para evaluar la inteligencia cognitiva con un test cronometrado de 15 minutos.

## Características

- **Autenticación completa**: Registro, login, recuperación de contraseña con Firebase
- **Test cronometrado**: 15 minutos exactos no pausable con persistencia de estado
- **5 áreas de evaluación**:
  - Matemática (series, operaciones, porcentajes, problemas)
  - Lingüística (analogías, sinónimos, comprensión)
  - Espacial (rotación mental, patrones visuales)
  - Lógica (silogismos, deducciones, condicionales)
  - Personalidad (perfil conductual)
- **120+ preguntas** en el pool inicial
- **Scoring automático** por áreas con CI estimado
- **Envío de resultados por email** con plantilla profesional HTML
- **Diseño responsive** mobile-first
- **Persistencia Firestore** para retomar tests interrumpidos

## Stack Tecnológico

- **Frontend**: Vite + React 18 + React Router
- **Estilos**: Tailwind CSS
- **Backend**: Node.js + Express
- **Base de datos**: Firebase Firestore
- **Auth**: Firebase Authentication
- **Email**: Nodemailer con SMTP

## Requisitos Previos

- Node.js 18+
- npm o yarn
- Cuenta de Firebase (gratuita)
- Cuenta de Gmail con App Password (para envío de emails)

## Instalación

1. **Clona el repositorio**
```bash
git clone <repo-url>
cd test-inteligencia
```

2. **Instala dependencias**
```bash
npm install
```

3. **Configura Firebase**
   - Ve a [Firebase Console](https://console.firebase.google.com)
   - Crea un nuevo proyecto
   - Habilita Authentication con Email/Password
   - Crea una base de datos Firestore (modo test)
   - Copia las credenciales del proyecto

4. **Configura las variables de entorno**
```bash
cp .env.example .env
```
Edita `.env` con tus credenciales:

```env
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu_proyecto_id
VITE_FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu_email@gmail.com
SMTP_PASS=tu_app_password
FRONTEND_URL=http://localhost:5173
```

5. **Configura Firestore**
   - Copia `firestore.rules` a tu proyecto Firebase
   - Configura los índices con `firestore.indexes.json`

6. **Ejecuta el proyecto**
```bash
# Desarrollo (frontend + backend)
npm run dev:full

# Solo frontend
npm run dev

# Solo backend
npm run server
```

7. **Abre en tu navegador**
```
http://localhost:5173
```

## Configuración de Gmail para Emails

1. Ve a [Google Account Security](https://myaccount.google.com/security)
2. Activa "Less secure app access" O mejor:
3. Ve a "App passwords"
4. Genera una nueva contraseña para "Mail"
5. Usa esa contraseña en `SMTP_PASS`

## Estructura del Proyecto

```
test-inteligencia/
├── src/
│   ├── components/
│   │   ├── auth/
│   │   ├── test/       # Timer, Question, Progress
│   │   ├── results/
│   │   └── ui/
│   ├── context/        # AuthContext, TestContext
│   ├── pages/          # Home, Login, Register, Dashboard, Test, Results
│   ├── services/      # Firebase, API, Scoring
│   ├── data/          # questions.js
│   └── styles/
├── server/
│   ├── index.js       # Express server
│   ├── routes/        # Email routes
│   └── services/      # Nodemailer
├── public/
├── firebase.json
├── firestore.rules
└── .env
```

## Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el frontend (Vite) |
| `npm run server` | Inicia el backend (Express) |
| `npm run dev:full` | Inicia ambos (frontend + backend) |
| `npm run build` | Construye para producción |
| `npm run preview` | Vista previa de producción |

## API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/send-results` | Envía resultados por email |

### Body:
```json
{
  "email": "usuario@email.com",
  "results": {
    "totalScore": 85,
    "iqEstimate": 117,
    "areaScores": {...},
    "personalitySummary": {...},
    "summary": {...},
    "timeUsed": 720
  }
}
```

## Despliegue

### Firebase Hosting

1. Instala Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Inicializa: `firebase init hosting`
4. Construye: `npm run build`
5. Despliega: `firebase deploy`

### Render / Railway / Heroku

Configura las mismas variables de entorno en tu plataforma de hosting.

## Funcionalidades MVP

- [x] Registro e inicio de sesión
- [x] Recuperación de contraseña
- [x] Dashboard con historial
- [x] Test de 15 minutos cronometrado
- [x] 25 preguntas aleatorias por test
- [x] Persistencia de estado al recargar
- [x] Scoring automático por áreas
- [x] Perfil de personalidad
- [x] Resultados visuales detallados
- [x] Envío de email con resultados
- [x] Diseño responsive
- [x] Reglas de seguridad Firestore

## Roadmap

- [ ] Panel de administración
- [ ] Más preguntas en el pool
- [ ] Rankings globales
- [ ] Modo oscuro/claro
- [ ] Análisis de tendencias
- [ ] Exportación PDF de resultados

## Licencia

MIT
