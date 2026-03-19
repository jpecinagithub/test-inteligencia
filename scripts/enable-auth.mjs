import { chromium } from 'playwright';

const FIREBASE_CONSOLE_URL = 'https://console.firebase.google.com/project/test-inteligencia-pro/authentication/providers';

async function enableAuth() {
  console.log('Iniciando automatización de Firebase...\n');
  
  const browser = await chromium.launch({ 
    headless: false,
    args: ['--disable-blink-features=AutomationControlled']
  });
  
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 }
  });
  
  const page = await context.newPage();
  
  try {
    console.log('1. Abriendo Firebase Console...');
    await page.goto(FIREBASE_CONSOLE_URL, { waitUntil: 'networkidle' });
    
    // Esperar a que cargue la página
    await page.waitForTimeout(2000);
    
    // Tomar snapshot para ver el estado
    const content = await page.content();
    
    if (content.includes('signin') || content.includes('login')) {
      console.log('⚠️  Se requiere iniciar sesión en Google');
      console.log('\nPor favor:');
      console.log('1. Inicia sesión con tu cuenta de Google en el navegador que se abrió');
      console.log('2. Navega manualmente a: Authentication > Proveedores');
      console.log('3. Habilita "Correo electrónico/contraseña"');
      console.log('\nAlternativamente, puedes abrir este enlace manualmente:');
      console.log(FIREBASE_CONSOLE_URL);
      
      // Esperar a que el usuario complete el login
      await page.waitForURL('**/authentication/**', { timeout: 0 });
    }
    
    console.log('\n2. Verificando estado de Authentication...');
    
    // Buscar el proveedor de Email/Password
    const emailProvider = await page.locator('text=Correo electrónico').first();
    
    if (await emailProvider.isVisible({ timeout: 5000 })) {
      console.log('✓ Proveedor "Correo electrónico" encontrado');
      
      // Buscar el botón de editar/habilitar
      const editButton = await page.locator('[data-testid="edit-icon"], .edit-icon, button:has-text("Editar")').first();
      
      if (await editButton.isVisible({ timeout: 2000 })) {
        await editButton.click();
        await page.waitForTimeout(1000);
      }
      
      // Buscar toggle o checkbox para habilitar
      const enableToggle = await page.locator('role=switch[name*="Habilitar"], role=checkbox[name*="contraseña"]').first();
      
      if (await enableToggle.isVisible({ timeout: 2000 })) {
        const isChecked = await enableToggle.isChecked();
        if (!isChecked) {
          await enableToggle.click();
          console.log('✓ Email/Password habilitado');
        } else {
          console.log('✓ Email/Password ya estaba habilitado');
        }
      } else {
        console.log('⚠️  No se encontró el toggle. Intentando otro método...');
        
        // Intentar hacer clic en el provider para abrir modal
        await emailProvider.click();
        await page.waitForTimeout(1500);
        
        // Buscar input o toggle en modal
        const modalToggle = await page.locator('input[type="checkbox"], role=switch').first();
        if (await modalToggle.isVisible({ timeout: 2000 })) {
          await modalToggle.click();
        }
      }
      
      // Buscar botón guardar
      const saveButton = await page.locator('button:has-text("Guardar")').first();
      if (await saveButton.isVisible({ timeout: 2000 })) {
        await saveButton.click();
        console.log('✓ Configuración guardada');
      }
      
    } else {
      console.log('⚠️  Proveedor no encontrado en la página');
      console.log('\nPor favor configura manualmente:');
      console.log(FIREBASE_CONSOLE_URL);
    }
    
    console.log('\n✓ Proceso completado');
    
  } catch (error) {
    console.error('Error:', error.message);
    console.log('\nPor favor configura Authentication manualmente:');
    console.log(FIREBASE_CONSOLE_URL);
  } finally {
    await browser.close();
  }
}

enableAuth();
