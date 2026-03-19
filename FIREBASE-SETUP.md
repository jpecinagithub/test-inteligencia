# Configuración de Firebase - Test de Inteligencia

## Proyecto Creado ✓

- **Project ID:** `test-inteligencia-pro`
- **Project Number:** 309953578829
- **App ID:** `1:309953578829:web:1aa37552cac9041c7e1904`

## Estado de Configuración

| Servicio | Estado | Acción Requerida |
|----------|--------|------------------|
| Firebase Project | ✓ Creado | - |
| Web App | ✓ Configurada | - |
| Firestore | ✓ Habilitado | - |
| Firestore Rules | ✓ Desplegadas | - |
| Authentication | ⚠️ Manual | Habilitar Email/Password |

## Pasos para Completar la Configuración

### 1. Habilitar Authentication (Requerido)

1. Abre el navegador en:
   ```
   https://console.firebase.google.com/project/test-inteligencia-pro/authentication/providers
   ```

2. Inicia sesión con tu cuenta de Google

3. Haz clic en **"Comenzar"** (si es la primera vez)

4. En la tabla de proveedores, busca **"Correo electrónico"** y haz clic en el icono de editar (lápiz)

5. Habilita **"Correo electrónico/contraseña"**:
   - ✅ Habilitar "Correo electrónico/contraseña"
   - ❌ Deshabilitar "Vínculo de correo electrónico (sin contraseña)"

6. Haz clic en **"Guardar"**

### 2. Configurar Firestore (Ya está hecho ✓)

Las reglas de seguridad ya están desplegadas. No necesitas hacer nada.

### 3. Configurar Variables de Entorno

El archivo `.env` ya tiene las credenciales de Firebase:

```env
VITE_FIREBASE_API_KEY=AIzaSyBGYlc7aMd7stAq7cIga8B215sbQozNMYE
VITE_FIREBASE_AUTH_DOMAIN=test-inteligencia-pro.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=test-inteligencia-pro
VITE_FIREBASE_STORAGE_BUCKET=test-inteligencia-pro.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=309953578829
VITE_FIREBASE_APP_ID=1:309953578829:web:1aa37552cac9041c7e1904
```

### 4. Configurar Email (Opcional para enviar resultados)

1. Edita el archivo `.env`:
   ```env
   SMTP_USER=tu_email@gmail.com
   SMTP_PASS=tu_app_password
   ```

2. Para Gmail, necesitas crear una "App Password":
   - Ve a https://myaccount.google.com/security
   - Busca "Contraseñas de aplicaciones" (en " signing in to Google")
   - Crea una nueva contraseña para "Mail"
   - Usa esa contraseña en `SMTP_PASS`

## Ejecutar el Proyecto

```bash
# 1. Instalar dependencias
npm install

# 2. Ejecutar en modo desarrollo
npm run dev
```

El proyecto estará disponible en: http://localhost:5173

## Verificar Configuración

Después de habilitar Authentication, verifica que todo funciona:

1. Abre http://localhost:5173
2. Haz clic en "Registrarse"
3. Crea una cuenta de prueba
4. Verifica que puedes iniciar sesión
5. Intenta hacer el test

## Solución de Problemas

### Error: "Firebase Auth not enabled"
- Ve a la consola de Firebase
- Authentication > Proveedores
- Asegúrate de que "Correo electrónico/contraseña" esté habilitado

### Error: "Missing or insufficient permissions"
- Las reglas de Firestore están configuradas
- Asegúrate de estar logueado
- Los usuarios solo pueden leer/escribir sus propios datos

### Error: "Email not sent"
- Verifica las credenciales SMTP en `.env`
- Asegúrate de usar una App Password (no tu contraseña normal)
- Verifica que IMAP esté habilitado en tu cuenta de Gmail
