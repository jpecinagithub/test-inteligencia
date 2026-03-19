# specs.md — Plataforma de Test de Inteligencia cronometrado (15 minutos)

## 1. Visión general del proyecto

Construir una aplicación web responsive que permita a un usuario registrarse, autenticarse y realizar un **test de inteligencia completo, cronometrado y no interrumpible**, con una duración total de **15 minutos**. El test combinará distintas áreas cognitivas y un bloque breve de personalidad, generando una experiencia de evaluación dinámica, exigente y con presión temporal real.

La plataforma deberá seleccionar preguntas de forma variable desde un pool amplio, corregir automáticamente la prueba al finalizar y mostrar un resultado estructurado al usuario. El sistema estará desarrollado con:

- **Frontend:** Vite + React
- **Autenticación y backend gestionado:** Firebase
- **Diseño:** responsive, mobile-first
- **Persistencia:** Firebase Authentication + Firestore
- **Opcional futuro:** Firebase Functions para lógica sensible o scoring avanzado

---

## 2. Objetivo del producto

El objetivo es ofrecer una experiencia de evaluación rápida, seria y psicológicamente intensa, donde:

- el usuario se enfrente a distintas dimensiones cognitivas,
- el factor tiempo forme parte esencial de la medición,
- cada intento tenga variabilidad gracias a un banco amplio de preguntas,
- el sistema calcule automáticamente resultados globales y por áreas,
- el usuario reciba feedback al finalizar.

No se busca solo “hacer preguntas”, sino diseñar una experiencia que transmita sensación de reto, urgencia y evaluación real.

---

## 3. Objetivos funcionales clave

### 3.1 Para el usuario final
El usuario podrá:

- crear una cuenta,
- iniciar sesión,
- recuperar contraseña,
- acceder a su panel,
- iniciar un test de 15 minutos,
- responder preguntas de distintas áreas,
- ver un contador regresivo constante,
- enviar o finalizar automáticamente el test al agotarse el tiempo,
- recibir el resultado corregido inmediatamente,
- consultar intentos anteriores si se decide incluir historial.

### 3.2 Para el sistema
El sistema deberá:

- autenticar de forma robusta con Firebase,
- seleccionar preguntas aleatorias bajo reglas definidas,
- mezclar áreas dentro del mismo examen,
- controlar estrictamente el tiempo total,
- impedir pausas durante el test,
- guardar respuestas y resultados,
- calcular puntuaciones por área y puntuación total,
- garantizar una experiencia consistente en desktop y móvil.

---

## 4. Concepto del test

## 4.1 Duración total
- **15 minutos exactos**
- cronómetro regresivo visible todo el tiempo
- una vez iniciado, el test queda en estado activo y no puede pausarse

## 4.2 Filosofía de la experiencia
La presión del tiempo forma parte del diseño del producto. La sensación deseada es:

- urgencia,
- foco,
- velocidad de procesamiento,
- tolerancia al estrés,
- toma de decisiones bajo límite temporal.

Esto implica que la UX no debe sentirse relajada ni “académica”, sino más cercana a una prueba real de evaluación rápida.

## 4.3 Estructura general del examen
El test combinará preguntas de:

1. **Inteligencia matemática**
2. **Inteligencia lingüística**
3. **Inteligencia espacial / visual**
4. **Razonamiento lógico**
5. **Bloque breve de personalidad**

> Nota de producto: el bloque de personalidad no debe mezclarse con el “CI” como si fuera la misma métrica. Debe presentarse como un complemento de perfil, no como inteligencia pura. Aun así, sí formará parte de la experiencia total del examen.

---

## 5. Áreas a evaluar y especificación de contenidos

## 5.1 Inteligencia matemática
Esta sección medirá capacidad de razonamiento cuantitativo, cálculo mental y reconocimiento de patrones numéricos.

### Subáreas
- series numéricas
- operaciones rápidas
- proporciones
- porcentajes
- comparaciones cuantitativas
- lógica aritmética
- problemas cortos de tiempo / cantidad / relación

### Objetivo de medición
- rapidez de cálculo
- razonamiento abstracto con números
- capacidad de detectar reglas
- resolución bajo presión

### Tipos de preguntas
- opción múltiple
- respuesta única correcta
- comparación entre dos expresiones
- completar secuencia

### Ejemplos de estilo
- ¿Qué número sigue en la serie?
- Si un valor aumenta un 20% y luego baja un 10%, ¿cuál es el cambio neto?
- ¿Qué relación numérica rompe el patrón?

### Dificultad
- baja, media y alta
- mezcla progresiva
- algunas preguntas deben ser fáciles para generar ritmo
- otras deben elevar presión cognitiva

---

## 5.2 Inteligencia lingüística
Esta sección medirá comprensión verbal, analogías, vocabulario contextual, inferencia y precisión semántica.

### Subáreas
- analogías verbales
- sinónimos y antónimos
- comprensión breve
- detección de palabra intrusa
- razonamiento verbal
- relación entre conceptos
- interpretación de frases cortas

### Objetivo de medición
- comprensión del lenguaje
- flexibilidad verbal
- precisión conceptual
- velocidad de interpretación

### Tipos de preguntas
- opción múltiple
- completar analogías
- identificar palabra que no encaja
- pequeña inferencia textual

### Ejemplos de estilo
- Libro es a leer como cuchillo es a...
- ¿Qué palabra se aproxima más al significado de X?
- ¿Cuál de estas opciones no pertenece al grupo?

---

## 5.3 Inteligencia espacial / visual
Esta sección evaluará la capacidad de manipular mentalmente formas, detectar simetrías, rotaciones, secuencias visuales y relaciones geométricas simples.

### Subáreas
- rotación mental
- secuencias de figuras
- matrices visuales
- simetría
- piezas encajables
- identificación de patrones espaciales
- orientación visual

### Objetivo de medición
- percepción visual estructurada
- rotación mental
- identificación rápida de diferencias y patrones
- razonamiento no verbal

### Tipos de preguntas
- imagen + 4 opciones
- matriz incompleta
- figura que completa una secuencia
- elegir la figura rotada equivalente
- detectar figura distinta

### Requisitos técnicos
- imágenes optimizadas
- carga rápida
- visualización clara en móvil
- contraste suficiente
- no depender de elementos demasiado pequeños

---

## 5.4 Razonamiento lógico
Esta sección medirá deducción, inducción, reglas abstractas y consistencia formal.

### Subáreas
- lógica condicional
- clasificación por reglas
- matrices lógicas
- relaciones entre elementos
- deducción básica
- silogismos simples
- detección de patrones de cambio

### Objetivo de medición
- pensamiento estructurado
- inferencia lógica
- detección de reglas abstractas
- consistencia en decisiones rápidas

### Tipos de preguntas
- opción múltiple
- si-entonces
- silogismos
- clasificación de conjuntos
- secuencias lógicas

---

## 5.5 Test breve de personalidad
Este bloque no debe presentarse como diagnóstico clínico ni como evaluación psicológica profesional. Debe ser un complemento ligero orientado a perfil conductual general.

### Propósito
- enriquecer la experiencia
- ofrecer feedback adicional
- identificar tendencias generales de comportamiento ante retos

### Dimensiones sugeridas
- orientación analítica
- impulsividad vs reflexión
- persistencia
- tolerancia a presión
- preferencia verbal vs visual
- seguridad en la toma de decisiones

### Formato recomendado
- afirmaciones tipo Likert
- escala de 1 a 5
- bloque corto para no romper ritmo
- máximo 5 a 8 preguntas

### Consideración UX
Este bloque puede situarse:
- al final, para no contaminar rendimiento cognitivo,
- o intercalado mínimamente si se busca más tensión.

**Recomendación:** ponerlo al final del test, manteniendo el cronómetro activo.

---

## 6. Diseño del contenido del examen

## 6.1 Pool amplio de preguntas
El sistema debe contar con un banco suficientemente amplio para que cada intento se perciba diferente.

### Requisitos del pool
- mínimo 100 preguntas por área cognitiva en primera versión deseable
- personalidad: mínimo 20–30 ítems reutilizables
- cada pregunta tendrá:
  - id único
  - área
  - subárea
  - nivel de dificultad
  - enunciado
  - opciones
  - respuesta correcta
  - explicación opcional
  - tiempo estimado teórico
  - etiquetas

### Objetivo del pool
- reducir repetición
- permitir tests dinámicos
- facilitar futuras expansiones
- habilitar analítica por tipos de pregunta

## 6.2 Selección aleatoria por intento
Cada test generado deberá seguir reglas, no una aleatoriedad pura.

### Reglas de ensamblado sugeridas
- total estimado: entre 22 y 30 preguntas según longitud media
- distribución equilibrada entre áreas
- mezcla de dificultad
- evitar exceso de preguntas muy largas
- garantizar presencia de todas las áreas principales
- bloque de personalidad fijo o semialeatorio al final

### Ejemplo orientativo
- matemática: 5–6
- lingüística: 5–6
- espacial: 5–6
- lógica: 5–6
- personalidad: 4–6

---

## 7. Cronometría y presión temporal

## 7.1 Regla principal
Desde el momento en que el usuario pulse **“Comenzar test”**, el examen entra en curso y ya no puede detenerse.

## 7.2 Requisitos del temporizador
- cuenta atrás global de 15:00
- visible en cabecera fija
- actualización en tiempo real
- avisos visuales en hitos críticos:
  - 5 minutos restantes
  - 2 minutos restantes
  - 1 minuto restante
  - últimos 30 segundos

## 7.3 Comportamientos obligatorios
- si el usuario recarga, el test debe reanudarse en curso con tiempo real restante
- si cierra la pestaña y vuelve, el sistema debe recuperar el intento activo si el tiempo no terminó
- si el tiempo se agota, el examen se envía automáticamente
- no debe existir botón de pausa
- opcional: aviso si intenta salir de la página

## 7.4 Estado emocional buscado
La UX debe reforzar el carácter contrarreloj:
- temporizador siempre visible
- diseño limpio pero tenso
- progreso visible
- microcopys breves y directos
- evitar pantallas relajadas o demasiado ornamentales

---

## 8. Corrección y resultados

## 8.1 Corrección automática
Al finalizar, el sistema deberá corregir automáticamente todas las preguntas objetivas.

### Para preguntas cognitivas
- puntuación por acierto
- posible ponderación por dificultad
- cálculo por área
- cálculo global

### Para personalidad
- agrupación por rasgos
- interpretación simple
- sin lenguaje clínico

## 8.2 Entrega de resultado al usuario
Nada más terminar el test, el usuario verá:

- puntuación global
- rendimiento por áreas
- resumen interpretativo
- fortalezas principales
- áreas más débiles
- perfil breve de personalidad
- opcional: comparación con medias futuras

## 8.3 Presentación de resultados
### Pantalla de resultado recomendada
- puntuación total
- barras o radar por áreas
- bloque de insight textual
- mensaje motivador o interpretativo
- botón para volver al dashboard

## 8.4 Explicaciones
Para primera versión:
- mostrar solo resultado y áreas
- no necesariamente mostrar explicación de cada pregunta

Para versión futura:
- revisión detallada de respuestas
- explicación por pregunta
- recomendaciones de mejora

---

## 9. Flujos principales de usuario

## 9.1 Registro
El usuario podrá:
- crear cuenta con email y contraseña
- validar formato
- recibir mensajes claros de error
- quedar autenticado al completar el registro

## 9.2 Login
El usuario podrá:
- iniciar sesión con email y contraseña
- acceder a la app si credenciales correctas
- ver errores claros si no lo son

## 9.3 Recuperación de contraseña
El usuario podrá:
- introducir su email
- recibir enlace de recuperación vía Firebase

## 9.4 Inicio de test
Flujo:
1. usuario autenticado entra al dashboard
2. pulsa “Comenzar test”
3. ve pantalla previa con instrucciones
4. confirma inicio
5. comienza la cuenta atrás
6. se crea un intento en Firestore con timestamp y estado activo

## 9.5 Durante el test
- responder preguntas una a una o en bloques
- ver tiempo restante
- ver progreso
- navegar según diseño definido
- no pausar
- envío automático al acabar tiempo

## 9.6 Finalización
- envío manual antes de tiempo o automático al llegar a cero
- corrección
- guardado del resultado
- render de pantalla final

---

## 10. Requisitos funcionales detallados

## 10.1 Autenticación robusta con Firebase
### Debe incluir
- registro con email y contraseña
- login con email y contraseña
- recuperación de contraseña
- persistencia de sesión
- protección de rutas privadas
- cierre de sesión
- manejo correcto de errores

### Consideraciones
- validación fuerte en frontend
- mensajes de error comprensibles
- manejo de estados de carga
- protección frente a accesos no autenticados

## 10.2 Gestión de intentos de test
Cada intento deberá almacenar:
- id de usuario
- fecha de inicio
- fecha de finalización
- tiempo total permitido
- tiempo consumido
- estado: activo / finalizado / expirado
- preguntas servidas en ese intento
- respuestas del usuario
- resultado calculado
- métricas por área

## 10.3 Motor de selección de preguntas
Debe:
- seleccionar desde el banco según reglas
- evitar repeticiones dentro del mismo intento
- mantener equilibrio por áreas
- permitir ampliar reglas en el futuro

## 10.4 Motor de scoring
Debe:
- validar respuestas
- sumar aciertos
- agrupar por área
- devolver estructura lista para mostrar en UI

---

## 11. Requisitos no funcionales

## 11.1 Responsive
La aplicación debe funcionar bien en:
- móvil
- tablet
- desktop

### Requisitos UX responsive
- botones grandes y tocables
- temporizador visible sin invadir
- preguntas visuales legibles
- opciones fácilmente seleccionables
- layouts adaptables

## 11.2 Rendimiento
- carga rápida inicial
- imágenes optimizadas
- navegación fluida
- transiciones ligeras
- mínima latencia en recuperación de intento

## 11.3 Seguridad
- reglas de seguridad de Firestore
- datos aislados por usuario
- protección de rutas
- validación de escritura
- no exponer respuestas correctas en cliente de forma trivial si se puede evitar

## 11.4 Accesibilidad
- contraste adecuado
- foco visible
- labels claros
- navegación razonable con teclado
- textos legibles

---

## 12. Arquitectura tecnológica propuesta

## 12.1 Stack
- **Frontend:** Vite + React
- **Estilos:** CSS Modules, Tailwind o combinación definida
- **Routing:** React Router
- **Estado:** Context API / Zustand / Redux Toolkit según complejidad final
- **Backend as a Service:** Firebase
- **Auth:** Firebase Authentication
- **Database:** Cloud Firestore
- **Hosting opcional:** Firebase Hosting

## 12.2 Módulos principales
- módulo de autenticación
- módulo de dashboard
- módulo de test engine
- módulo de temporizador
- módulo de scoring
- módulo de resultados
- módulo de historial
- módulo de administración futura

---

## 13. Modelo de datos propuesto

## 13.1 Colección `users`
Campos orientativos:
- uid
- name
- email
- createdAt
- lastLoginAt
- profileSettings

## 13.2 Colección `questions`
Campos:
- id
- area
- subarea
- difficulty
- type
- prompt
- options
- correctAnswer
- imageUrl (si aplica)
- explanation
- active
- tags
- estimatedSeconds

## 13.3 Colección `testTemplates` o configuración
Campos:
- id
- active
- totalDurationSeconds
- distributionRules
- personalityEnabled
- scoringRules

## 13.4 Colección `attempts`
Campos:
- id
- userId
- startedAt
- finishedAt
- expiresAt
- status
- questionIds
- questionSnapshot
- answers
- remainingTimeAtLastSync
- finalScore
- areaScores
- personalitySummary
- resultSummary

> Recomendación: guardar snapshot de preguntas en el intento para evitar inconsistencias si el pool cambia después.

---

## 14. Pantallas de la aplicación

## 14.1 Landing / Home
- propuesta de valor
- CTA para registrarse
- CTA para iniciar sesión
- breve explicación del test

## 14.2 Registro
- formulario de alta
- enlace a login

## 14.3 Login
- email
- contraseña
- recordar acceso si procede
- enlace a recuperación

## 14.4 Recuperar contraseña
- formulario simple
- confirmación de envío

## 14.5 Dashboard
- bienvenida
- botón comenzar test
- explicación breve
- historial de intentos opcional

## 14.6 Pantalla pre-test
- instrucciones
- duración total
- advertencia de no pausa
- confirmación de inicio

## 14.7 Pantalla del examen
- temporizador fijo
- progreso
- pregunta actual
- opciones
- navegación
- CTA siguiente / finalizar

## 14.8 Pantalla de resultado
- score global
- scores por área
- perfil breve
- CTA volver al panel

---

## 15. UX/UI guidelines

## 15.1 Principios visuales
- interfaz moderna y limpia
- sensación de seriedad y reto
- jerarquía visual clara
- énfasis en cronómetro y pregunta
- mínima distracción

## 15.2 Elementos emocionales
- cuenta atrás visible
- mensajes breves
- progreso claro
- alertas visuales suaves al bajar el tiempo

## 15.3 Responsive
En móvil:
- pregunta visible sin exceso de scroll
- opciones grandes
- temporizador compacto
- imagen ajustada correctamente

---

## 16. Lógica de no pausa

## 16.1 Regla de producto
El test no puede detenerse una vez iniciado.

## 16.2 Implementación esperada
- al iniciar, se guarda `startedAt` y `expiresAt`
- el tiempo restante se calcula desde servidor o desde marca persistida
- si el usuario abandona la página, el tiempo sigue corriendo
- al volver, se recalcula tiempo restante
- si `now >= expiresAt`, intento finaliza automáticamente

## 16.3 Prevención de abuso
- no confiar solo en estado local
- persistir timestamps en Firestore
- usar hora consistente del sistema
- opcional futuro: Cloud Functions para validación adicional

---

## 17. Administración futura del banco de preguntas

Aunque no sea prioridad del MVP, conviene diseñar pensando en un panel admin futuro.

### Capacidades futuras
- crear preguntas
- editar preguntas
- activar/desactivar preguntas
- subir imágenes
- clasificar por dificultad
- ver métricas de rendimiento por pregunta

---

## 18. Analítica futura recomendada

- porcentaje de acierto por área
- tiempo medio por pregunta
- abandono antes de iniciar
- distribución de resultados
- preguntas demasiado fáciles o demasiado difíciles
- correlación entre áreas

---

## 19. Roadmap sugerido

## Fase 1 — MVP funcional
- autenticación Firebase
- dashboard
- pool inicial de preguntas
- test de 15 minutos
- temporizador no pausables
- scoring automático
- pantalla de resultados
- responsive básico sólido

## Fase 2 — Mejora de experiencia
- historial de intentos
- gráficos por área
- mejor feedback final
- revisión de preguntas
- mejor randomización

## Fase 3 — Escalado
- panel admin
- analítica
- ranking o benchmarking
- exportación de resultados
- modo premium o pruebas especializadas

---

## 20. Criterios de aceptación del MVP

El MVP se considerará válido si:

1. un usuario puede registrarse, iniciar sesión y recuperar contraseña;
2. el usuario puede iniciar un test de 15 minutos;
3. al iniciarlo, el test no puede pausarse;
4. el tiempo sigue corriendo aunque el usuario recargue;
5. el examen se compone de varias áreas cognitivas y personalidad;
6. el sistema selecciona preguntas variables desde un pool;
7. al terminar, se corrige automáticamente;
8. el usuario ve sus resultados finales;
9. la app funciona correctamente en móvil y desktop.

---

## 21. Riesgos y decisiones de diseño

## Riesgos
- pool inicial insuficiente y repetitivo
- preguntas visuales poco legibles en móvil
- exposición excesiva de respuestas en frontend
- inconsistencias de tiempo si no se persiste bien el intento
- mezclar personalidad con “inteligencia” de forma confusa

## Decisiones recomendadas
- separar claramente resultado cognitivo y perfil de personalidad
- usar snapshot de preguntas por intento
- priorizar fiabilidad del temporizador desde el inicio
- diseñar UX con sensación de evaluación real

---

## 22. Recomendaciones de producto

1. **Separar el score cognitivo del perfil de personalidad.**
2. **Dar mucho peso al temporizador y a la persistencia del intento.**
3. **Construir un pool amplio desde el inicio o, al menos, una estructura escalable.**
4. **Mantener la corrección automática inmediata como valor principal.**
5. **Diseñar la interfaz para transmitir reto, claridad y urgencia.**

---

## 23. Entregable esperado de esta fase

En esta fase, el entregable es el documento de especificación funcional y técnica inicial del proyecto:

- visión del producto
- áreas a evaluar
- reglas del test
- estructura de autenticación
- lógica de temporización
- requisitos del frontend responsive
- base del modelo de datos
- roadmap de implementación

---

## 24. Próximo paso recomendado

Tras validar este `specs.md`, el siguiente paso ideal es crear:

1. la **arquitectura de carpetas del proyecto Vite React + Firebase**,
2. el **modelo de datos detallado de Firestore**,
3. y después un **plan de implementación por pantallas y componentes**.
