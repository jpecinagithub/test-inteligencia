# Plan de Trabajo - Test de Inteligencia Profesional

## Resumen del Proyecto
Plataforma de test de inteligencia cronometrado (15 minutos) con Vite + React + Node + Firebase. Incluye autenticación completa, test multi-área, scoring automático y envío de resultados por email.

---

## FASE 1: Estructura y Configuración (Días 1-2)

### 1.1 Proyecto Frontend (Vite + React)
```
test-inteligencia/
├── src/
│   ├── components/         # Componentes reutilizables
│   │   ├── auth/           # Login, Register, ForgotPassword
│   │   ├── test/           # Timer, Question, Progress
│   │   ├── results/        # ScoreCard, RadarChart
│   │   └── ui/             # Button, Input, Modal
│   ├── pages/              # Vistas principales
│   │   ├── Home.jsx
│   │   ├── Dashboard.jsx
│   │   ├── PreTest.jsx
│   │   ├── Test.jsx
│   │   └── Results.jsx
│   ├── context/            # Estado global
│   │   ├── AuthContext.jsx
│   │   └── TestContext.jsx
│   ├── services/           # Firebase, API calls
│   ├── hooks/              # useTimer, useTest
│   ├── data/               # Banco de preguntas
│   └── styles/            # CSS/Tailwind
├── server/                 # Backend Node.js
│   ├── index.js           # Express server
│   ├── routes/
│   │   └── email.js       # Envío de emails
│   └── services/
│       └── nodemailer.js
└── firebase.json
```

### 1.2 Configuración Firebase
- Firebase Authentication (email/password)
- Cloud Firestore (usuarios, intentos, preguntas)
- Reglas de seguridad para isolate data

### 1.3 Variables de Entorno (.env)
```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

# Email API (Nodemailer)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tuemail@gmail.com
SMTP_PASS=tu-app-password
FRONTEND_URL=http://localhost:5173
```

---

## FASE 2: Sistema de Autenticación (Días 2-3)

### 2.1 Funcionalidades
- [x] Registro con email/password
- [x] Login con validación
- [x] Recuperación de contraseña (Firebase)
- [x] Persistencia de sesión
- [x] Protección de rutas
- [x] Logout

### 2.2 Páginas
- `/auth/login`
- `/auth/register`
- `/auth/forgot-password`

---

## FASE 3: Banco de Preguntas (Días 3-4)

### 3.1 Estructura de Preguntas
```javascript
{
  id: "math_001",
  area: "matematica",
  subarea: "series",
  difficulty: 1-3,
  prompt: "¿Cuál es el siguiente número?",
  options: ["A", "B", "C", "D"],
  correctAnswer: 0,
  imageUrl: null,
  estimatedSeconds: 30
}
```

### 3.2 Distribución
- Matemática: 25 preguntas
- Lingüística: 25 preguntas
- Espacial: 25 preguntas
- Lógica: 25 preguntas
- Personalidad: 20 preguntas

**Total pool inicial: 120 preguntas**

---

## FASE 4: Motor de Test (Días 4-6)

### 4.1 Reglas de Selección
- 5-6 preguntas por área cognitiva
- 4-6 preguntas de personalidad
- Mezcla aleatoria con distribución equilibrada
- Sin repeticiones dentro del intento

### 4.2 Temporizador
- 15 minutos exactos (900 segundos)
- Sincronización con servidor (Firestore timestamp)
- Persistencia del estado al recargar
- Finalización automática al agotarse

### 4.3 Estados del Test
```
INICIADO → EN_PROGRESO → FINALIZADO/EXPIRADO
```

---

## FASE 5: Scoring y Resultados (Días 6-7)

### 5.1 Cálculo de Puntuación
```
Puntuación Total = Σ(aciertos × peso_dificultad)
Puntuación por Área = aciertos_area / total_area × 100
```

### 5.2 Perfil de Personalidad
- Orientación analítica
- Impulsividad vs Reflexión
- Persistencia
- Tolerancia a presión

### 5.3 Envío de Email
- Nodemailer con SMTP
- Plantilla HTML con resultados
- Incluir: score total, áreas, perfil

---

## FASE 6: UI/UX y Responsive (Días 7-8)

### 6.1 Principios de Diseño
- Mobile-first
- Timer siempre visible
- Progreso claro
- Feedback visual en cambios de tiempo
- Sin distracciones durante el test

### 6.2 Colores
```
Primario: #3B82F6 (Azul profesional)
Secundario: #10B981 (Verde éxito)
Alerta: #EF4444 (Rojo tiempo bajo)
Fondo: #0F172A (Oscuro profesional)
```

---

## Timeline Estimado

| Fase | Descripción | Días |
|------|-------------|------|
| 1 | Estructura y Config | 2 |
| 2 | Autenticación | 2 |
| 3 | Banco de Preguntas | 2 |
| 4 | Motor de Test | 3 |
| 5 | Scoring y Email | 2 |
| 6 | UI/UX Responsive | 2 |

**Total estimado: 13 días laborables**

---

## Entregables MVP

1. ✅ Autenticación funcional (registro, login, recuperación)
2. ✅ Dashboard con botón de inicio
3. ✅ Test de 15 minutos no pausable
4. ✅ Pool de 120+ preguntas
5. ✅ Scoring automático
6. ✅ Resultados visuales + email
7. ✅ Diseño responsive
8. ✅ Persistencia de intentos en Firestore
