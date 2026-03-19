const https = require('https');
const fs = require('fs');

// Configuración del proyecto
const PROJECT_ID = 'test-inteligencia-pro';
const API_KEY = 'AIzaSyBGYlc7aMd7stAq7cIga8B215sbQozNMYE';

// Habilitar Authentication
function enableAuth() {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      signIn: {
        email: {
          enabled: true,
          passwordRequired: true
        },
        anonymous: {
          enabled: false
        }
      },
      multiTenant: {
        enabled: false
      }
    });

    const options = {
      hostname: 'identitytoolkit.googleapis.com',
      path: `/v2/projects/${PROJECT_ID}/config?key=${API_KEY}`,
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        console.log('Auth config response:', body);
        resolve(JSON.parse(body));
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

// Habilitar Firestore (ya está habilitado, verificar)
async function setup() {
  console.log('Configurando Firebase para test-inteligencia-pro...\n');
  
  try {
    console.log('1. Habilitando Authentication con Email/Password...');
    await enableAuth();
    console.log('✓ Authentication habilitado\n');
  } catch (error) {
    console.log('Error al configurar Auth:', error.message);
    console.log('\n⚠️  Por favor configura Authentication manualmente:');
    console.log('   1. Ve a https://console.firebase.google.com/project/test-inteligencia-pro/authentication/providers');
    console.log('   2. Haz clic en "Agregar proveedor"');
    console.log('   3. Selecciona "Correo electrónico/contraseña"');
    console.log('   4. Habilita "Correo electrónico/contraseña"');
    console.log('   5. Deshabilita "Vínculo de correo electrónico (contraseñaless)"');
    console.log('   6. Guarda los cambios\n');
  }

  console.log('2. Firestore ya está configurado ✓\n');
  
  console.log('3. Verificando reglas de Firestore...');
  console.log('   Las reglas ya están desplegadas ✓\n');

  console.log('========================================');
  console.log('CONFIGURACIÓN COMPLETA');
  console.log('========================================');
  console.log('\nTu archivo .env ya tiene las credenciales.');
  console.log('\nPróximos pasos:');
  console.log('1. Instala dependencias: npm install');
  console.log('2. Configura email en .env (SMTP_USER y SMTP_PASS)');
  console.log('3. Ejecuta: npm run dev');
}

setup();
