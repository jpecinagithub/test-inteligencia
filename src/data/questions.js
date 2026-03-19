export const questionsPool = [
  // ============ MATEMÁTICA ============
  // Series numéricas
  {
    id: 'math_001',
    area: 'matematica',
    subarea: 'series',
    difficulty: 1,
    prompt: '¿Cuál es el siguiente número? 2, 4, 6, 8, ___',
    options: ['9', '10', '11', '12'],
    correctAnswer: 1
  },
  {
    id: 'math_002',
    area: 'matematica',
    subarea: 'series',
    difficulty: 2,
    prompt: '¿Qué número completa la serie? 3, 6, 11, 18, 27, ___',
    options: ['36', '38', '39', '42'],
    correctAnswer: 1
  },
  {
    id: 'math_003',
    area: 'matematica',
    subarea: 'series',
    difficulty: 2,
    prompt: 'Encuentra el patrón: 1, 1, 2, 3, 5, 8, ___',
    options: ['11', '12', '13', '15'],
    correctAnswer: 2
  },
  {
    id: 'math_004',
    area: 'matematica',
    subarea: 'series',
    difficulty: 3,
    prompt: '¿Qué número falta? 1, 4, 9, 16, ___, 36',
    options: ['20', '24', '25', '30'],
    correctAnswer: 2
  },
  {
    id: 'math_005',
    area: 'matematica',
    subarea: 'series',
    difficulty: 2,
    prompt: 'Completa: 5, 10, 20, 40, ___',
    options: ['60', '70', '80', '90'],
    correctAnswer: 2
  },
  {
    id: 'math_006',
    area: 'matematica',
    subarea: 'series',
    difficulty: 1,
    prompt: 'Continúa: 100, 90, 80, 70, ___',
    options: ['60', '65', '55', '50'],
    correctAnswer: 0
  },
  {
    id: 'math_007',
    area: 'matematica',
    subarea: 'series',
    difficulty: 3,
    prompt: 'Serie: 2, 6, 12, 20, 30, ___',
    options: ['40', '42', '44', '50'],
    correctAnswer: 1
  },
  {
    id: 'math_008',
    area: 'matematica',
    subarea: 'series',
    difficulty: 3,
    prompt: '¿Qué sigue? 1, 11, 21, 1211, 111221, ___',
    options: ['312211', '122121', '211211', '112211'],
    correctAnswer: 0
  },
  {
    id: 'math_009',
    area: 'matematica',
    subarea: 'series',
    difficulty: 2,
    prompt: 'Serie: 3, 9, 27, 81, ___',
    options: ['162', '243', '324', '216'],
    correctAnswer: 1
  },
  {
    id: 'math_010',
    area: 'matematica',
    subarea: 'series',
    difficulty: 3,
    prompt: '¿Qué número rompe el patrón? 2, 4, 8, 16, 24, 32',
    options: ['24', '8', '16', '32'],
    correctAnswer: 0
  },

  // Operaciones básicas
  {
    id: 'math_011',
    area: 'matematica',
    subarea: 'operaciones',
    difficulty: 1,
    prompt: '¿Cuánto es 15 + 27?',
    options: ['41', '42', '43', '44'],
    correctAnswer: 1
  },
  {
    id: 'math_012',
    area: 'matematica',
    subarea: 'operaciones',
    difficulty: 1,
    prompt: '¿Cuánto es 144 ÷ 12?',
    options: ['10', '11', '12', '14'],
    correctAnswer: 2
  },
  {
    id: 'math_013',
    area: 'matematica',
    subarea: 'operaciones',
    difficulty: 1,
    prompt: 'Resuelve: 156 - 89',
    options: ['65', '66', '67', '68'],
    correctAnswer: 2
  },
  {
    id: 'math_014',
    area: 'matematica',
    subarea: 'operaciones',
    difficulty: 2,
    prompt: '¿Cuánto es 7 × 8 + 12 ÷ 4?',
    options: ['56', '59', '62', '68'],
    correctAnswer: 1
  },
  {
    id: 'math_015',
    area: 'matematica',
    subarea: 'operaciones',
    difficulty: 2,
    prompt: '¿Cuál es el resultado de 2³ + 3²?',
    options: ['12', '13', '17', '19'],
    correctAnswer: 2
  },
  {
    id: 'math_016',
    area: 'matematica',
    subarea: 'operaciones',
    difficulty: 2,
    prompt: 'Si 3x + 7 = 22, ¿cuánto vale x?',
    options: ['3', '4', '5', '6'],
    correctAnswer: 2
  },
  {
    id: 'math_017',
    area: 'matematica',
    subarea: 'operaciones',
    difficulty: 2,
    prompt: 'Ana tiene el doble de manzanas que Pedro. Si Pedro tiene 15, ¿cuántas tiene Ana?',
    options: ['25', '30', '35', '40'],
    correctAnswer: 1
  },
  {
    id: 'math_018',
    area: 'matematica',
    subarea: 'operaciones',
    difficulty: 3,
    prompt: '¿Cuánto es (15 × 4) ÷ (3 + 2)?',
    options: ['10', '12', '14', '15'],
    correctAnswer: 1
  },
  {
    id: 'math_019',
    area: 'matematica',
    subarea: 'operaciones',
    difficulty: 3,
    prompt: 'Si compras 3 camisas a $40 cada una con 15% de descuento, ¿cuánto pagas?',
    options: ['$100', '$102', '$108', '$112'],
    correctAnswer: 1
  },
  {
    id: 'math_020',
    area: 'matematica',
    subarea: 'operaciones',
    difficulty: 3,
    prompt: '¿Qué número dividido por 5, más 3, es igual a 12?',
    options: ['35', '40', '45', '50'],
    correctAnswer: 2
  },

  // Porcentajes
  {
    id: 'math_021',
    area: 'matematica',
    subarea: 'porcentajes',
    difficulty: 1,
    prompt: '¿Cuál es el 25% de 80?',
    options: ['15', '20', '25', '30'],
    correctAnswer: 1
  },
  {
    id: 'math_022',
    area: 'matematica',
    subarea: 'porcentajes',
    difficulty: 1,
    prompt: '¿Cuánto es el 10% de 250?',
    options: ['20', '25', '30', '35'],
    correctAnswer: 1
  },
  {
    id: 'math_023',
    area: 'matematica',
    subarea: 'porcentajes',
    difficulty: 2,
    prompt: 'Si un producto de $200 aumenta 20% y luego disminuye 20%, ¿cuál es el precio final?',
    options: ['$200', '$192', '$196', '$180'],
    correctAnswer: 1
  },
  {
    id: 'math_024',
    area: 'matematica',
    subarea: 'porcentajes',
    difficulty: 3,
    prompt: 'Un artículo baja de $80 a $60. ¿Cuál es el porcentaje de descuento?',
    options: ['20%', '25%', '30%', '35%'],
    correctAnswer: 1
  },
  {
    id: 'math_025',
    area: 'matematica',
    subarea: 'porcentajes',
    difficulty: 2,
    prompt: '¿Qué porcentaje de 50 es 15?',
    options: ['20%', '25%', '30%', '35%'],
    correctAnswer: 2
  },
  {
    id: 'math_026',
    area: 'matematica',
    subarea: 'porcentajes',
    difficulty: 3,
    prompt: 'Si el precio de un artículo sube de $80 a $100, ¿cuál fue el porcentaje de aumento?',
    options: ['15%', '20%', '25%', '30%'],
    correctAnswer: 2
  },

  // Problemas aplicados
  {
    id: 'math_027',
    area: 'matematica',
    subarea: 'problemas',
    difficulty: 2,
    prompt: 'Si 4 trabajadores terminan una obra en 12 días, ¿cuántos días necesitan 6 trabajadores?',
    options: ['6 días', '8 días', '9 días', '10 días'],
    correctAnswer: 1
  },
  {
    id: 'math_028',
    area: 'matematica',
    subarea: 'problemas',
    difficulty: 2,
    prompt: 'Un tren viaja a 80 km/h. ¿Cuántos km recorrerá en 2.5 horas?',
    options: ['180 km', '200 km', '220 km', '160 km'],
    correctAnswer: 1
  },
  {
    id: 'math_029',
    area: 'matematica',
    subarea: 'problemas',
    difficulty: 2,
    prompt: 'Si pago $240 por un objeto con 20% de descuento, ¿cuál era el precio original?',
    options: ['$280', '$300', '$320', '$350'],
    correctAnswer: 1
  },
  {
    id: 'math_030',
    area: 'matematica',
    subarea: 'problemas',
    difficulty: 3,
    prompt: 'Un coche gasta 8 litros cada 100 km. ¿Cuántos litros gastará en 350 km?',
    options: ['24', '26', '28', '32'],
    correctAnswer: 2
  },
  {
    id: 'math_031',
    area: 'matematica',
    subarea: 'problemas',
    difficulty: 2,
    prompt: 'Si hoy es lunes, ¿qué día será dentro de 100 días?',
    options: ['Miércoles', 'Jueves', 'Viernes', 'Domingo'],
    correctAnswer: 1
  },
  {
    id: 'math_032',
    area: 'matematica',
    subarea: 'problemas',
    difficulty: 3,
    prompt: 'Tres amigos comparten una cuenta de $150. Si uno paga el doble que los otros dos (que pagan igual), ¿cuánto paga cada uno?',
    options: ['$30 y $60', '$25 y $50', '$20 y $40', '$35 y $70'],
    correctAnswer: 0
  },

  // Comparaciones y fracciones
  {
    id: 'math_033',
    area: 'matematica',
    subarea: 'comparaciones',
    difficulty: 1,
    prompt: '¿Qué fracción es mayor: 3/4 o 5/6?',
    options: ['3/4', '5/6', 'Son iguales', 'No se puede comparar'],
    correctAnswer: 1
  },
  {
    id: 'math_034',
    area: 'matematica',
    subarea: 'comparaciones',
    difficulty: 1,
    prompt: 'Ordena de menor a mayor: 0.5, 0.75, 0.25, 0.6',
    options: ['0.25, 0.5, 0.6, 0.75', '0.5, 0.25, 0.6, 0.75', '0.75, 0.6, 0.5, 0.25', '0.25, 0.6, 0.5, 0.75'],
    correctAnswer: 0
  },
  {
    id: 'math_035',
    area: 'matematica',
    subarea: 'comparaciones',
    difficulty: 2,
    prompt: '¿Qué es mayor: 2/3 de 60 o 3/4 de 56?',
    options: ['2/3 de 60', '3/4 de 56', 'Son iguales', 'No se puede saber'],
    correctAnswer: 0
  },
  {
    id: 'math_036',
    area: 'matematica',
    subarea: 'comparaciones',
    difficulty: 2,
    prompt: 'Si √x = 8, ¿cuánto es x?',
    options: ['54', '64', '72', '81'],
    correctAnswer: 1
  },
  {
    id: 'math_037',
    area: 'matematica',
    subarea: 'comparaciones',
    difficulty: 3,
    prompt: '¿Cuál es mayor: π² o 2π?',
    options: ['π²', '2π', 'Son iguales', 'Depende de π'],
    correctAnswer: 0
  },

  // Geometría
  {
    id: 'math_038',
    area: 'matematica',
    subarea: 'geometria',
    difficulty: 2,
    prompt: 'Un rectángulo mide 8 cm de largo y 5 cm de ancho. ¿Cuál es su perímetro?',
    options: ['26 cm', '40 cm', '13 cm', '20 cm'],
    correctAnswer: 0
  },
  {
    id: 'math_039',
    area: 'matematica',
    subarea: 'geometria',
    difficulty: 2,
    prompt: '¿Cuántos lados tiene un polígono regular con 5 ángulos internos?',
    options: ['3', '4', '5', '6'],
    correctAnswer: 2
  },
  {
    id: 'math_040',
    area: 'matematica',
    subarea: 'geometria',
    difficulty: 3,
    prompt: 'El área de un círculo es 64π. ¿Cuál es su radio?',
    options: ['6', '8', '10', '12'],
    correctAnswer: 1
  },
  {
    id: 'math_041',
    area: 'matematica',
    subarea: 'geometria',
    difficulty: 3,
    prompt: 'En un triángulo rectángulo, los catetos miden 3 y 4. ¿Cuánto mide la hipotenusa?',
    options: ['5', '6', '7', '25'],
    correctAnswer: 0
  },
  {
    id: 'math_042',
    area: 'matematica',
    subarea: 'geometria',
    difficulty: 3,
    prompt: '¿Cuántos cuadrados hay en un tablero de ajedrez (8x8)?',
    options: ['64', '128', '204', '256'],
    correctAnswer: 2
  },

  // ============ LINGÜÍSTICA ============
  // Analogías
  {
    id: 'ling_001',
    area: 'linguistica',
    subarea: 'analogias',
    difficulty: 1,
    prompt: 'Perro es a camada como gato es a ___',
    options: ['manada', 'camada', 'niñada', 'piara'],
    correctAnswer: 2
  },
  {
    id: 'ling_002',
    area: 'linguistica',
    subarea: 'analogias',
    difficulty: 2,
    prompt: 'Pluma es a escribir como pincel es a ___',
    options: ['dibujar', 'pintar', 'crear', 'colorear'],
    correctAnswer: 1
  },
  {
    id: 'ling_003',
    area: 'linguistica',
    subarea: 'analogias',
    difficulty: 2,
    prompt: 'Mariposa es a insecto como águila es a ___',
    options: ['ave', 'planeador', 'rapaz', 'cielo'],
    correctAnswer: 0
  },
  {
    id: 'ling_004',
    area: 'linguistica',
    subarea: 'analogias',
    difficulty: 2,
    prompt: 'Dedo es a mano como hoja es a ___',
    options: ['árbol', 'libro', 'flor', 'rama'],
    correctAnswer: 1
  },
  {
    id: 'ling_005',
    area: 'linguistica',
    subarea: 'analogias',
    difficulty: 3,
    prompt: 'Ojos es a ver como oídos es a ___',
    options: ['cabeza', 'tocar', 'oír', 'equilibrio'],
    correctAnswer: 2
  },
  {
    id: 'ling_006',
    area: 'linguistica',
    subarea: 'analogias',
    difficulty: 2,
    prompt: 'Compositor es a música como arquitecto es a ___',
    options: ['construcción', 'diseño', 'edificios', 'planos'],
    correctAnswer: 1
  },
  {
    id: 'ling_007',
    area: 'linguistica',
    subarea: 'analogias',
    difficulty: 3,
    prompt: 'Capítulo es a libro como escena es a ___',
    options: ['teatro', 'película', 'actriz', 'obra'],
    correctAnswer: 1
  },
  {
    id: 'ling_008',
    area: 'linguistica',
    subarea: 'analogias',
    difficulty: 2,
    prompt: 'Guante es a mano como calcetín es a ___',
    options: ['pie', 'cama', 'ropa', 'zapato'],
    correctAnswer: 0
  },
  {
    id: 'ling_009',
    area: 'linguistica',
    subarea: 'analogias',
    difficulty: 3,
    prompt: 'Sedimento es a río como polvo es a ___',
    options: ['aire', 'casa', 'viento', 'torre'],
    correctAnswer: 2
  },

  // Sinónimos
  {
    id: 'ling_011',
    area: 'linguistica',
    subarea: 'sinonimos',
    difficulty: 1,
    prompt: '¿Cuál es un sinónimo de "alegre"?',
    options: ['Triste', 'Contento', 'Enojado', 'Asustado'],
    correctAnswer: 1
  },
  {
    id: 'ling_012',
    area: 'linguistica',
    subarea: 'sinonimos',
    difficulty: 1,
    prompt: '¿Cuál es un sinónimo de "grande"?',
    options: ['Pequeño', 'Enorme', 'Mediano', 'Diminuto'],
    correctAnswer: 1
  },
  {
    id: 'ling_013',
    area: 'linguistica',
    subarea: 'sinonimos',
    difficulty: 2,
    prompt: '¿Cuál es un sinónimo de "abrumador"?',
    options: ['Moderado', 'Esencial', 'Avasallador', 'Insignificante'],
    correctAnswer: 2
  },
  {
    id: 'ling_014',
    area: 'linguistica',
    subarea: 'sinonimos',
    difficulty: 2,
    prompt: '¿Cuál es un sinónimo de "sutil"?',
    options: ['Grueso', 'Delicado', 'Rugoso', 'Fuerte'],
    correctAnswer: 1
  },
  {
    id: 'ling_015',
    area: 'linguistica',
    subarea: 'sinonimos',
    difficulty: 3,
    prompt: '¿Cuál es un sinónimo de "efímero"?',
    options: ['Eterno', 'Breve', 'Firme', 'Sólido'],
    correctAnswer: 1
  },
  {
    id: 'ling_016',
    area: 'linguistica',
    subarea: 'sinonimos',
    difficulty: 2,
    prompt: '¿Cuál es un sinónimo de "obsoleto"?',
    options: ['Moderno', 'Anticuado', 'Nuevo', 'Vigente'],
    correctAnswer: 1
  },
  {
    id: 'ling_017',
    area: 'linguistica',
    subarea: 'sinonimos',
    difficulty: 3,
    prompt: '¿Cuál es un sinónimo de "perenne"?',
    options: ['Temporal', 'Eterno', 'Caduco', 'Pasajero'],
    correctAnswer: 1
  },
  {
    id: 'ling_018',
    area: 'linguistica',
    subarea: 'sinonimos',
    difficulty: 2,
    prompt: '¿Cuál es un sinónimo de "audaz"?',
    options: ['Cobarde', 'Osado', 'Cauto', 'Tímido'],
    correctAnswer: 1
  },

  // Antónimos
  {
    id: 'ling_019',
    area: 'linguistica',
    subarea: 'antonimos',
    difficulty: 1,
    prompt: '¿Cuál es el antónimo de "oscuro"?',
    options: ['Negro', 'Gris', 'Claro', 'Sombreado'],
    correctAnswer: 2
  },
  {
    id: 'ling_020',
    area: 'linguistica',
    subarea: 'antonimos',
    difficulty: 1,
    prompt: '¿Cuál es el antónimo de "rápido"?',
    options: ['Veloz', 'Lento', 'Velozmente', 'Presto'],
    correctAnswer: 1
  },
  {
    id: 'ling_021',
    area: 'linguistica',
    subarea: 'antonimos',
    difficulty: 2,
    prompt: '¿Cuál es el antónimo de "frágil"?',
    options: ['Fuerte', 'Resistente', 'Sólido', 'Duro'],
    correctAnswer: 1
  },
  {
    id: 'ling_022',
    area: 'linguistica',
    subarea: 'antonimos',
    difficulty: 2,
    prompt: '¿Cuál es el antónimo de "explícito"?',
    options: ['Claro', 'Ambiguo', 'Definido', 'Preciso'],
    correctAnswer: 1
  },
  {
    id: 'ling_023',
    area: 'linguistica',
    subarea: 'antonimos',
    difficulty: 3,
    prompt: '¿Cuál es el antónimo de "sosiego"?',
    options: ['Calma', 'Tranquilidad', 'Turbación', 'Paz'],
    correctAnswer: 2
  },
  {
    id: 'ling_024',
    area: 'linguistica',
    subarea: 'antonimos',
    difficulty: 3,
    prompt: '¿Cuál es el antónimo de "efímero"?',
    options: ['Breve', 'Permanente', 'Corto', 'Fugaz'],
    correctAnswer: 1
  },

  // Intrusa (palabra que no pertenece)
  {
    id: 'ling_025',
    area: 'linguistica',
    subarea: 'intrusa',
    difficulty: 1,
    prompt: '¿Qué palabra NO pertenece? Manzana, plátano, naranja, escritorio',
    options: ['Manzana', 'Plátano', 'Naranja', 'Escritorio'],
    correctAnswer: 3
  },
  {
    id: 'ling_026',
    area: 'linguistica',
    subarea: 'intrusa',
    difficulty: 2,
    prompt: '¿Cuál NO es un animal marino? Tiburón, ballena, delfín, jirafa',
    options: ['Tiburón', 'Ballena', 'Delfín', 'Jirafa'],
    correctAnswer: 3
  },
  {
    id: 'ling_027',
    area: 'linguistica',
    subarea: 'intrusa',
    difficulty: 2,
    prompt: '¿Qué palabra NO pertenece? Río, lago, mar, árbol',
    options: ['Río', 'Lago', 'Mar', 'Árbol'],
    correctAnswer: 3
  },
  {
    id: 'ling_028',
    area: 'linguistica',
    subarea: 'intrusa',
    difficulty: 1,
    prompt: '¿Cuál NO es un color primario? Rojo, azul, verde, amarillo',
    options: ['Rojo', 'Azul', 'Verde', 'Amarillo'],
    correctAnswer: 2
  },
  {
    id: 'ling_029',
    area: 'linguistica',
    subarea: 'intrusa',
    difficulty: 2,
    prompt: '¿Cuál NO es un instrumento musical? Guitarra, violín, martillo, piano',
    options: ['Guitarra', 'Violín', 'Martillo', 'Piano'],
    correctAnswer: 2
  },
  {
    id: 'ling_030',
    area: 'linguistica',
    subarea: 'intrusa',
    difficulty: 2,
    prompt: '¿Qué NO es un metal? Oro, plata, cobre, madera',
    options: ['Oro', 'Plata', 'Cobre', 'Madera'],
    correctAnswer: 3
  },
  {
    id: 'ling_031',
    area: 'linguistica',
    subarea: 'intrusa',
    difficulty: 3,
    prompt: '¿Cuál NO es un lenguaje de programación? Python, Java, Photoshop, C++',
    options: ['Python', 'Java', 'Photoshop', 'C++'],
    correctAnswer: 2
  },

  // Comprensión verbal
  {
    id: 'ling_032',
    area: 'linguistica',
    subarea: 'comprension',
    difficulty: 2,
    prompt: '"El sabio no dice todo lo que sabe." ¿Qué significa esto?',
    options: ['Los sabios mienten', 'La prudencia es virtud del sabio', 'Los sabios no saben mucho', 'Es mejor callar'],
    correctAnswer: 1
  },
  {
    id: 'ling_033',
    area: 'linguistica',
    subarea: 'comprension',
    difficulty: 2,
    prompt: '"Quien mucho abarca, poco aprieta." Esta frase enseña que:',
    options: ['Hay que ser fuerte', 'Es mejor enfocarse en pocas tareas', 'El ejercicio físico es importante', 'La presión es necesaria'],
    correctAnswer: 1
  },
  {
    id: 'ling_034',
    area: 'linguistica',
    subarea: 'comprension',
    difficulty: 2,
    prompt: '"No todo lo que brilla es oro." Significa que:',
    options: ['El oro brilla mucho', 'Las apariencias engañan', 'El brillo es importante', 'El oro es valioso'],
    correctAnswer: 1
  },
  {
    id: 'ling_035',
    area: 'linguistica',
    subarea: 'comprension',
    difficulty: 2,
    prompt: 'Si digo "Estamos en las mismas", ¿qué significa?',
    options: ['Estamos juntos', 'Tenemos la misma situación', 'Estamos equivocados', 'Somos idénticos'],
    correctAnswer: 1
  },
  {
    id: 'ling_036',
    area: 'linguistica',
    subarea: 'comprension',
    difficulty: 3,
    prompt: '"A quien madruga, Dios le ayuda." Esta frase implica que:',
    options: ['Dios favorece a los madrugadores', 'La planificación tiene recompensa', 'Dormir temprano es bueno', 'La religión es importante'],
    correctAnswer: 1
  },
  {
    id: 'ling_037',
    area: 'linguistica',
    subarea: 'comprension',
    difficulty: 3,
    prompt: '"Mas vale tarde que nunca." ¿Qué sugiere esta frase?',
    options: ['Llegar tarde está bien', 'Es mejor no llegar tarde', 'Nunca es tarde para actuar', 'El tiempo no importa'],
    correctAnswer: 2
  },
  {
    id: 'ling_038',
    area: 'linguistica',
    subarea: 'comprension',
    difficulty: 3,
    prompt: '"El que calla, otorga." ¿Qué implica?',
    options: ['El silencio es consentimiento', 'Hablar es mejor', 'Los callados son sabios', 'Otorgar es malo'],
    correctAnswer: 0
  },

  // Completar oraciones
  {
    id: 'ling_039',
    area: 'linguistica',
    subarea: 'completar',
    difficulty: 2,
    prompt: 'Libro es a lectura como televisión es a ___',
    options: ['mando', 'entretenimiento', 'cable', 'pantalla'],
    correctAnswer: 1
  },
  {
    id: 'ling_040',
    area: 'linguistica',
    subarea: 'completar',
    difficulty: 2,
    prompt: 'El cielo es al azul como el pasto es a ___',
    options: ['verde', 'hierba', 'jardín', 'planta'],
    correctAnswer: 0
  },
  {
    id: 'ling_041',
    area: 'linguistica',
    subarea: 'completar',
    difficulty: 3,
    prompt: 'La pluma es al escritor como el ___ es al pintor.',
    options: ['pincel', 'lienzo', 'colores', 'estudio'],
    correctAnswer: 0
  },

  // ============ ESPACIAL / VISUAL ============
  // Secuencias de figuras
  {
    id: 'esp_001',
    area: 'espacial',
    subarea: 'secuencias',
    difficulty: 1,
    prompt: '¿Qué figura viene después? □ ○ △ □ ○ ___',
    options: ['□', '○', '△', '◇'],
    correctAnswer: 2
  },
  {
    id: 'esp_002',
    area: 'espacial',
    subarea: 'secuencias',
    difficulty: 1,
    prompt: '❶ → ❷ → ❸ → ¿?',
    options: ['❹', '❶', '❻', '❺'],
    correctAnswer: 0
  },
  {
    id: 'esp_003',
    area: 'espacial',
    subarea: 'secuencias',
    difficulty: 2,
    prompt: 'Encuentra el patrón: ▲○●▲○●▲○ ___',
    options: ['●', '▲', '○', '■'],
    correctAnswer: 1
  },
  {
    id: 'esp_004',
    area: 'espacial',
    subarea: 'secuencias',
    difficulty: 1,
    prompt: '¿Qué figura falta? ●○●○●●○●○ ___',
    options: ['●', '○', '●○', '●'],
    correctAnswer: 1
  },
  {
    id: 'esp_005',
    area: 'espacial',
    subarea: 'secuencias',
    difficulty: 2,
    prompt: 'Sigue el patrón: ▲▲△▲▲△△▲▲△ ___',
    options: ['△', '▲', '●', '■'],
    correctAnswer: 0
  },
  {
    id: 'esp_006',
    area: 'espacial',
    subarea: 'secuencias',
    difficulty: 2,
    prompt: '¿Qué número completa el patrón? ■□■■□■■■□■■■ ___',
    options: ['□', '■', '▪', 'Es irregular'],
    correctAnswer: 0
  },
  {
    id: 'esp_007',
    area: 'espacial',
    subarea: 'secuencias',
    difficulty: 2,
    prompt: 'Observa el patrón: ▲○●▲○●▲○●. ¿Qué viene después?',
    options: ['●', '▲', '○', '■'],
    correctAnswer: 0
  },

  // Rotación de letras
  {
    id: 'esp_008',
    area: 'espacial',
    subarea: 'rotacion',
    difficulty: 1,
    prompt: 'Si giras la letra "N" 180 grados, ¿qué letra parece?',
    options: ['Z', 'N', 'M', 'W'],
    correctAnswer: 1
  },
  {
    id: 'esp_009',
    area: 'espacial',
    subarea: 'rotacion',
    difficulty: 1,
    prompt: 'Si volteas horizontalmente la letra "d", ¿qué letra obtienes?',
    options: ['b', 'p', 'q', 'Ninguna'],
    correctAnswer: 2
  },
  {
    id: 'esp_010',
    area: 'espacial',
    subarea: 'rotacion',
    difficulty: 2,
    prompt: '¿Cuántos grados debe girar una flecha ↑ para apuntar a la derecha?',
    options: ['45°', '90°', '180°', '270°'],
    correctAnswer: 1
  },
  {
    id: 'esp_011',
    area: 'espacial',
    subarea: 'rotacion',
    difficulty: 2,
    prompt: 'Si rotas una "b" 90° en sentido horario, ¿qué letra obtienes?',
    options: ['p', 'd', 'q', 'b'],
    correctAnswer: 0
  },
  {
    id: 'esp_012',
    area: 'espacial',
    subarea: 'rotacion',
    difficulty: 2,
    prompt: 'Un dado tiene el 1 frente al 6, el 2 frente al 5, y el 3 frente al ___.',
    options: ['1', '4', '6', '2'],
    correctAnswer: 1
  },

  // Simetría
  {
    id: 'esp_013',
    area: 'espacial',
    subarea: 'simetria',
    difficulty: 1,
    prompt: '¿Cuál de estas letras tiene simetría vertical?',
    options: ['A', 'B', 'C', 'F'],
    correctAnswer: 0
  },
  {
    id: 'esp_014',
    area: 'espacial',
    subarea: 'simetria',
    difficulty: 1,
    prompt: '¿Cuál letra NO tiene simetría?',
    options: ['A', 'H', 'X', 'Z'],
    correctAnswer: 3
  },
  {
    id: 'esp_015',
    area: 'espacial',
    subarea: 'simetria',
    difficulty: 2,
    prompt: '¿Cuántos ejes de simetría tiene un cuadrado?',
    options: ['2', '4', '6', '8'],
    correctAnswer: 1
  },
  {
    id: 'esp_016',
    area: 'espacial',
    subarea: 'simetria',
    difficulty: 2,
    prompt: '¿Cuál tiene al menos un eje de simetría?',
    options: ['Triángulo escaleno', 'Triángulo isósceles', 'Triángulo rectángulo', 'Ninguno'],
    correctAnswer: 1
  },
  {
    id: 'esp_017',
    area: 'espacial',
    subarea: 'simetria',
    difficulty: 3,
    prompt: '¿Cuántos ejes de simetría tiene un triángulo equilátero?',
    options: ['1', '2', '3', '4'],
    correctAnswer: 2
  },

  // Contar figuras
  {
    id: 'esp_018',
    area: 'espacial',
    subarea: 'contar',
    difficulty: 2,
    prompt: '¿Cuántos triángulos ves en una pirámide de 3 niveles? (△△△)',
    options: ['3', '4', '5', '6'],
    correctAnswer: 3
  },
  {
    id: 'esp_019',
    area: 'espacial',
    subarea: 'contar',
    difficulty: 2,
    prompt: '¿Cuántos cuadrados hay en una cuadrícula 2x2?',
    options: ['2', '4', '5', '6'],
    correctAnswer: 2
  },
  {
    id: 'esp_020',
    area: 'espacial',
    subarea: 'contar',
    difficulty: 3,
    prompt: '¿Cuántos cuadrados hay en un tablero de ajedrez (8x8)?',
    options: ['64', '128', '204', '256'],
    correctAnswer: 2
  },
  {
    id: 'esp_021',
    area: 'espacial',
    subarea: 'contar',
    difficulty: 2,
    prompt: 'Si doblas un papel 3 veces sobre sí mismo, ¿cuántas capas tendrás?',
    options: ['6', '8', '9', '12'],
    correctAnswer: 1
  },

  // Perspectiva y vistas
  {
    id: 'esp_022',
    area: 'espacial',
    subarea: 'perspectiva',
    difficulty: 1,
    prompt: '¿Qué vista obtienes si miras un cubo desde arriba?',
    options: ['Un cuadrado', 'Un triángulo', 'Un hexágono', 'Un círculo'],
    correctAnswer: 0
  },
  {
    id: 'esp_023',
    area: 'espacial',
    subarea: 'perspectiva',
    difficulty: 2,
    prompt: 'Si unes 3 cubos en línea, ¿cuántas caras visibles tiene el objeto en total?',
    options: ['14', '16', '18', '20'],
    correctAnswer: 2
  },
  {
    id: 'esp_024',
    area: 'espacial',
    subarea: 'perspectiva',
    difficulty: 2,
    prompt: '¿Cuántas caras tiene un dado estándar?',
    options: ['5', '6', '7', '8'],
    correctAnswer: 1
  },
  {
    id: 'esp_025',
    area: 'espacial',
    subarea: 'perspectiva',
    difficulty: 3,
    prompt: 'Si la sombra de un poste de 6m mide 8m, ¿cuál es la altura de un árbol cuya sombra mide 12m?',
    options: ['6m', '8m', '9m', '12m'],
    correctAnswer: 2
  },

  // Matrices y patrones
  {
    id: 'esp_026',
    area: 'espacial',
    subarea: 'matrices',
    difficulty: 2,
    prompt: 'Si cada ● representa un punto y ●● = 4 (área del cuadrado), ●●● = 9, ¿cuánto es ●●●●?',
    options: ['12', '14', '16', '18'],
    correctAnswer: 2
  },
  {
    id: 'esp_027',
    area: 'espacial',
    subarea: 'matrices',
    difficulty: 2,
    prompt: '¿Cuántas letras tiene la palabra "SEIS"?',
    options: ['3', '4', '5', '6'],
    correctAnswer: 1
  },
  {
    id: 'esp_028',
    area: 'espacial',
    subarea: 'matrices',
    difficulty: 2,
    prompt: 'Si A es la primera letra y D es la cuarta, ¿qué letra está entre B y C?',
    options: ['B', 'C', 'B o C', 'No hay letra'],
    correctAnswer: 0
  },

  // ============ LÓGICA ============
  // Silogismos
  {
    id: 'log_001',
    area: 'logica',
    subarea: 'silogismos',
    difficulty: 2,
    prompt: 'Todos los gatos son felinos. Algunos felinos son negros. ¿Qué se puede concluir?',
    options: ['Todos los gatos son negros', 'Algunos gatos son negros', 'Ningún gato es negro', 'No hay conclusión válida'],
    correctAnswer: 3
  },
  {
    id: 'log_002',
    area: 'logica',
    subarea: 'silogismos',
    difficulty: 2,
    prompt: 'Ningún reptil vuela. Las serpientes son reptiles. ¿Qué es verdadero?',
    options: ['Todas las serpientes vuelan', 'Algunas serpientes vuelan', 'Ninguna serpiente vuela', 'Todos los reptiles vuelan'],
    correctAnswer: 2
  },
  {
    id: 'log_003',
    area: 'logica',
    subarea: 'silogismos',
    difficulty: 2,
    prompt: 'Todos los psicólogos son empáticos. María es psicóloga. ¿Qué concluimos?',
    options: ['María es empática', 'María no es empática', 'Todos los empáticos son psicólogos', 'María es doctora'],
    correctAnswer: 0
  },
  {
    id: 'log_004',
    area: 'logica',
    subarea: 'silogismos',
    difficulty: 2,
    prompt: 'Ningún mamífero es ave. El pingüino es ave. ¿Qué concluimos?',
    options: ['El pingüino es mamífero', 'El pingüino no es mamífero', 'Todos los pájaros son pingüinos', 'Ningún pingüino existe'],
    correctAnswer: 1
  },
  {
    id: 'log_005',
    area: 'logica',
    subarea: 'silogismos',
    difficulty: 3,
    prompt: 'Algunos estudiantes son atletas. Todos los atletas entrenan. ¿Qué podemos afirmar?',
    options: ['Todos los estudiantes entrenan', 'Algunos estudiantes entrenan', 'Ningún estudiante entrena', 'No hay conclusión'],
    correctAnswer: 1
  },
  {
    id: 'log_006',
    area: 'logica',
    subarea: 'silogismos',
    difficulty: 3,
    prompt: 'Todos los A son B. Ningún B es C. ¿Qué es verdadero sobre A y C?',
    options: ['Algunos A son C', 'Ningún A es C', 'Todos los A son C', 'No se puede saber'],
    correctAnswer: 1
  },

  // Condicional (modus ponens/tollens)
  {
    id: 'log_007',
    area: 'logica',
    subarea: 'condicional',
    difficulty: 1,
    prompt: 'Si llueve, entonces me quedo en casa. Está lloviendo. ¿Qué puedes concluir?',
    options: ['No me quedo', 'Me quedo en casa', 'Salgo corriendo', 'No hay conclusión'],
    correctAnswer: 1
  },
  {
    id: 'log_008',
    area: 'logica',
    subarea: 'condicional',
    difficulty: 1,
    prompt: 'Si estudio, apruebo. No aprobé. ¿Qué podemos inferir?',
    options: ['Estudié', 'No estudié', 'El examen era difícil', 'No hay información'],
    correctAnswer: 1
  },
  {
    id: 'log_009',
    area: 'logica',
    subarea: 'condicional',
    difficulty: 1,
    prompt: 'Si hace sol, salgo. No está haciendo sol. ¿Salgo?',
    options: ['Sí', 'No', 'Depende', 'A veces'],
    correctAnswer: 1
  },
  {
    id: 'log_010',
    area: 'logica',
    subarea: 'condicional',
    difficulty: 2,
    prompt: 'Si tengo hambre Y tengo dinero, como. Tengo hambre pero no tengo dinero. ¿Qué pasa?',
    options: ['Como', 'No como', 'Pido prestado', 'Depende del plato'],
    correctAnswer: 1
  },
  {
    id: 'log_011',
    area: 'logica',
    subarea: 'condicional',
    difficulty: 2,
    prompt: 'Si corro, me canso. Si descanso, no me canso. Estoy cansado. ¿Qué hice?',
    options: ['Corrí', 'Descansé', 'Ambas cosas', 'No sé'],
    correctAnswer: 0
  },
  {
    id: 'log_012',
    area: 'logica',
    subarea: 'condicional',
    difficulty: 3,
    prompt: 'Si A>B y B>C, ¿todos los A son C?',
    options: ['Sí', 'No', 'Solo algunos', 'Depende'],
    correctAnswer: 0
  },

  // Deducción
  {
    id: 'log_013',
    area: 'logica',
    subarea: 'deduccion',
    difficulty: 2,
    prompt: 'Ana es mayor que Bea. Bea es mayor que Carla. ¿Quién es la menor?',
    options: ['Ana', 'Bea', 'Carla', 'No se puede saber'],
    correctAnswer: 2
  },
  {
    id: 'log_014',
    area: 'logica',
    subarea: 'deduccion',
    difficulty: 2,
    prompt: 'Pedro vive más al norte que Juan. Juan vive más al norte que María. ¿Quién vive más al sur?',
    options: ['Pedro', 'Juan', 'María', 'Pedro y Juan'],
    correctAnswer: 0
  },
  {
    id: 'log_015',
    area: 'logica',
    subarea: 'deduccion',
    difficulty: 2,
    prompt: 'En una fila: Carlos está antes que Diana. Diana está antes que Eduardo. Eduardo está antes que Felipe. ¿Quién está primero?',
    options: ['Carlos', 'Diana', 'Eduardo', 'Felipe'],
    correctAnswer: 0
  },
  {
    id: 'log_016',
    area: 'logica',
    subarea: 'deduccion',
    difficulty: 2,
    prompt: 'El rojo es más claro que el azul. El azul es más claro que el verde. ¿Cuál es el más oscuro?',
    options: ['Rojo', 'Azul', 'Verde', 'Igual'],
    correctAnswer: 2
  },
  {
    id: 'log_017',
    area: 'logica',
    subarea: 'deduccion',
    difficulty: 3,
    prompt: 'Hay 3 cajas mal etiquetadas. Una dice "Oro", otra "Plata", otra "Oro o Plata". Si abres una y ves oro, ¿qué sabes?',
    options: ['La caja "Oro" tiene plata', 'La caja "Oro" tiene oro', 'Ambas cajas tienen lo mismo', 'No se puede saber'],
    correctAnswer: 0
  },
  {
    id: 'log_018',
    area: 'logica',
    subarea: 'deduccion',
    difficulty: 3,
    prompt: 'Dos hermanas, Ana y Bea, tienen 3 hijos en total. Ana tiene 2. ¿Cuántos hijos tiene Bea?',
    options: ['0', '1', '2', 'No se puede saber'],
    correctAnswer: 1
  },

  // Clasificación
  {
    id: 'log_019',
    area: 'logica',
    subarea: 'clasificacion',
    difficulty: 1,
    prompt: '¿Cuál número no pertenece? 2, 5, 7, 9, 11, 14',
    options: ['2', '9', '11', '14'],
    correctAnswer: 3
  },
  {
    id: 'log_020',
    area: 'logica',
    subarea: 'clasificacion',
    difficulty: 2,
    prompt: '¿Cuál no sigue la regla? Regla: número primo mayor a 3 es impar.',
    options: ['5', '7', '11', '9'],
    correctAnswer: 3
  },
  {
    id: 'log_021',
    area: 'logica',
    subarea: 'clasificacion',
    difficulty: 1,
    prompt: '¿Cuál es el número que no encaja? 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36',
    options: ['3', '21', '33', 'Todos encajan'],
    correctAnswer: 3
  },
  {
    id: 'log_022',
    area: 'logica',
    subarea: 'clasificacion',
    difficulty: 2,
    prompt: '¿Cuál palabra no pertenece? Magisterio, academia, facultad, prisión',
    options: ['Magisterio', 'Academia', 'Facultad', 'Prisión'],
    correctAnswer: 3
  },
  {
    id: 'log_023',
    area: 'logica',
    subarea: 'clasificacion',
    difficulty: 3,
    prompt: '¿Cuál NO es un lenguaje de programación? Python, Java, HTML, C++',
    options: ['Python', 'Java', 'HTML', 'C++'],
    correctAnswer: 2
  },

  // Patrones lógicos
  {
    id: 'log_024',
    area: 'logica',
    subarea: 'patrones',
    difficulty: 2,
    prompt: '¿Qué sigue? Si llueve → mojado, Si hace frío → congelado, Si nublado → ___',
    options: ['Soleado', 'No hay conclusión', 'Oscuridad', 'Precipitación'],
    correctAnswer: 1
  },
  {
    id: 'log_025',
    area: 'logica',
    subarea: 'patrones',
    difficulty: 2,
    prompt: 'A es igual a B. B es mayor que C. C es igual a D. ¿Qué relación hay entre A y D?',
    options: ['A > D', 'A = D', 'A < D', 'No se puede determinar'],
    correctAnswer: 1
  },
  {
    id: 'log_026',
    area: 'logica',
    subarea: 'patrones',
    difficulty: 3,
    prompt: 'Si 2+2=4, 3+3=18, 4+4=32, ¿cuánto es 5+5?',
    options: ['50', '55', '60', '70'],
    correctAnswer: 0
  },
  {
    id: 'log_027',
    area: 'logica',
    subarea: 'patrones',
    difficulty: 3,
    prompt: 'Si todos los A son B, y todos los B son C, ¿todos los A son C?',
    options: ['Sí', 'No', 'Solo algunos', 'Depende'],
    correctAnswer: 0
  },

  // ============ CULTURA GENERAL ============
  // Ciencia
  {
    id: 'cult_001',
    area: 'cultura',
    subarea: 'ciencia',
    difficulty: 1,
    prompt: '¿Cuál es el planeta más grande del sistema solar?',
    options: ['Tierra', 'Marte', 'Júpiter', 'Saturno'],
    correctAnswer: 2
  },
  {
    id: 'cult_002',
    area: 'cultura',
    subarea: 'ciencia',
    difficulty: 1,
    prompt: '¿Qué gas respiramos principalmente?',
    options: ['Oxígeno', 'Nitrógeno', 'Dióxido de carbono', 'Hidrógeno'],
    correctAnswer: 0
  },
  {
    id: 'cult_003',
    area: 'cultura',
    subarea: 'ciencia',
    difficulty: 2,
    prompt: '¿Cuántos huesos tiene el cuerpo humano adulto?',
    options: ['186', '206', '226', '256'],
    correctAnswer: 1
  },
  {
    id: 'cult_004',
    area: 'cultura',
    subarea: 'ciencia',
    difficulty: 2,
    prompt: '¿Qué órgano bombea sangre por todo el cuerpo?',
    options: ['El cerebro', 'Los pulmones', 'El corazón', 'El estómago'],
    correctAnswer: 2
  },
  {
    id: 'cult_005',
    area: 'cultura',
    subarea: 'ciencia',
    difficulty: 2,
    prompt: '¿Cuál es la fórmula química del agua?',
    options: ['CO2', 'H2O', 'NaCl', 'O2'],
    correctAnswer: 1
  },
  {
    id: 'cult_006',
    area: 'cultura',
    subarea: 'ciencia',
    difficulty: 3,
    prompt: '¿Qué scientist desarrolló la teoría de la relatividad?',
    options: ['Newton', 'Einstein', 'Hawking', 'Curie'],
    correctAnswer: 1
  },
  {
    id: 'cult_007',
    area: 'cultura',
    subarea: 'ciencia',
    difficulty: 3,
    prompt: '¿Qué elemento tiene el número atómico 79?',
    options: ['Plata', 'Platino', 'Oro', 'Cobre'],
    correctAnswer: 2
  },
  {
    id: 'cult_008',
    area: 'cultura',
    subarea: 'ciencia',
    difficulty: 2,
    prompt: '¿Qué velocidad aproximada tiene la luz?',
    options: ['300 km/s', '3,000 km/s', '300,000 km/s', '3,000,000 km/s'],
    correctAnswer: 2
  },

  // Historia
  {
    id: 'cult_009',
    area: 'cultura',
    subarea: 'historia',
    difficulty: 1,
    prompt: '¿En qué país se encuentra la Torre Eiffel?',
    options: ['Italia', 'España', 'Francia', 'Inglaterra'],
    correctAnswer: 2
  },
  {
    id: 'cult_010',
    area: 'cultura',
    subarea: 'historia',
    difficulty: 1,
    prompt: '¿Quién pintó la Mona Lisa?',
    options: ['Miguel Ángel', 'Rafael', 'Da Vinci', 'Botticelli'],
    correctAnswer: 2
  },
  {
    id: 'cult_011',
    area: 'cultura',
    subarea: 'historia',
    difficulty: 2,
    prompt: '¿En qué año llegó el hombre a la Luna?',
    options: ['1959', '1965', '1969', '1972'],
    correctAnswer: 2
  },
  {
    id: 'cult_012',
    area: 'cultura',
    subarea: 'historia',
    difficulty: 2,
    prompt: '¿Qué civilización construyó Machu Picchu?',
    options: ['Azteca', 'Maya', 'Inca', 'Olmeca'],
    correctAnswer: 2
  },
  {
    id: 'cult_013',
    area: 'cultura',
    subarea: 'historia',
    difficulty: 3,
    prompt: '¿En qué año terminó la Segunda Guerra Mundial?',
    options: ['1943', '1944', '1945', '1946'],
    correctAnswer: 2
  },
  {
    id: 'cult_014',
    area: 'cultura',
    subarea: 'historia',
    difficulty: 2,
    prompt: '¿Quién fue el primer emperador de Roma?',
    options: ['César', 'Augusto', 'Nerón', 'Octavio'],
    correctAnswer: 1
  },
  {
    id: 'cult_015',
    area: 'cultura',
    subarea: 'historia',
    difficulty: 3,
    prompt: '¿Qué filósofo griego dijo "Solo sé que no sé nada"?',
    options: ['Platón', 'Aristóteles', 'Sócrates', 'Homero'],
    correctAnswer: 2
  },

  // Geografía
  {
    id: 'cult_016',
    area: 'cultura',
    subarea: 'geografia',
    difficulty: 1,
    prompt: '¿Cuál es el océano más grande?',
    options: ['Atlántico', 'Índico', 'Ártico', 'Pacífico'],
    correctAnswer: 3
  },
  {
    id: 'cult_017',
    area: 'cultura',
    subarea: 'geografia',
    difficulty: 1,
    prompt: '¿Cuál es el río más largo del mundo?',
    options: ['Amazonas', 'Nilo', 'Misisipi', 'Yangtsé'],
    correctAnswer: 1
  },
  {
    id: 'cult_018',
    area: 'cultura',
    subarea: 'geografia',
    difficulty: 2,
    prompt: '¿Cuántos países hay aproximadamente en Europa?',
    options: ['35', '45', '55', '65'],
    correctAnswer: 1
  },
  {
    id: 'cult_019',
    area: 'cultura',
    subarea: 'geografia',
    difficulty: 2,
    prompt: '¿Cuál es la capital de Australia?',
    options: ['Sídney', 'Melbourne', 'Canberra', 'Brisbane'],
    correctAnswer: 2
  },
  {
    id: 'cult_020',
    area: 'cultura',
    subarea: 'geografia',
    difficulty: 3,
    prompt: '¿Qué país tiene más habitantes? (India o China, antes de 2024)',
    options: ['India', 'China', 'Tienen igual', 'Depende del año'],
    correctAnswer: 1
  },

  // Arte y cultura
  {
    id: 'cult_021',
    area: 'cultura',
    subarea: 'arte',
    difficulty: 2,
    prompt: '¿Quién escribió "Don Quijote de la Mancha"?',
    options: ['Lope de Vega', 'Cervantes', 'Calderón', 'Quevedo'],
    correctAnswer: 1
  },
  {
    id: 'cult_022',
    area: 'cultura',
    subarea: 'arte',
    difficulty: 2,
    prompt: '¿Qué instrumento tiene 6 cuerdas?',
    options: ['Violín', 'Guitarra', 'Ukulele', 'Arpa'],
    correctAnswer: 1
  },
  {
    id: 'cult_023',
    area: 'cultura',
    subarea: 'arte',
    difficulty: 3,
    prompt: '¿En qué siglo pintó Picasso el Guernica?',
    options: ['Siglo XIX', 'Siglo XX', 'Siglo XXI', 'Siglo XVIII'],
    correctAnswer: 1
  },
  {
    id: 'cult_024',
    area: 'cultura',
    subarea: 'arte',
    difficulty: 2,
    prompt: '¿Qué tipo de obra es "La Noche Estrellada" de Van Gogh?',
    options: ['Escultura', 'Óleo sobre lienzo', 'Acuarela', 'Grabado'],
    correctAnswer: 1
  },

  // Cultura general variada
  {
    id: 'cult_025',
    area: 'cultura',
    subarea: 'general',
    difficulty: 1,
    prompt: '¿Cuántos minutos tiene una hora?',
    options: ['30', '50', '60', '100'],
    correctAnswer: 2
  },
  {
    id: 'cult_026',
    area: 'cultura',
    subarea: 'general',
    difficulty: 1,
    prompt: '¿Cuántos días tiene un año bisiesto?',
    options: ['364', '365', '366', '367'],
    correctAnswer: 2
  },
  {
    id: 'cult_027',
    area: 'cultura',
    subarea: 'general',
    difficulty: 2,
    prompt: '¿Qué颜色 es la mezcla de azul y amarillo?',
    options: ['Naranja', 'Verde', 'Morado', 'Rojo'],
    correctAnswer: 1
  },
  {
    id: 'cult_028',
    area: 'cultura',
    subarea: 'general',
    difficulty: 2,
    prompt: '¿Cuántos colores tiene el arcoíris?',
    options: ['5', '6', '7', '8'],
    correctAnswer: 2
  },
  {
    id: 'cult_029',
    area: 'cultura',
    subarea: 'general',
    difficulty: 2,
    prompt: '¿Qué forma geométrica tiene un dado (cada cara)?',
    options: ['Triángulo', 'Círculo', 'Cuadrado', 'Pentágono'],
    correctAnswer: 2
  },
  {
    id: 'cult_030',
    area: 'cultura',
    subarea: 'general',
    difficulty: 3,
    prompt: '¿Cuántos bytes hay en un kilobyte?',
    options: ['100', '512', '1000', '1024'],
    correctAnswer: 3
  },
  {
    id: 'cult_031',
    area: 'cultura',
    subarea: 'general',
    difficulty: 3,
    prompt: '¿Qué evento ocurre cada 4 años en el fútbol?',
    options: ['Copa América', 'Eurocopa', 'Copa del Mundo', 'Champions League'],
    correctAnswer: 2
  },
  {
    id: 'cult_032',
    area: 'cultura',
    subarea: 'general',
    difficulty: 2,
    prompt: '¿Cuál es el metal más abundante en la corteza terrestre?',
    options: ['Hierro', 'Cobre', 'Aluminio', 'Oro'],
    correctAnswer: 2
  },
  {
    id: 'cult_033',
    area: 'cultura',
    subarea: 'general',
    difficulty: 3,
    prompt: '¿Qué científico descubrió la penicilina?',
    options: ['Pasteur', 'Fleming', 'Curie', 'Mendel'],
    correctAnswer: 1
  },
  {
    id: 'cult_034',
    area: 'cultura',
    subarea: 'general',
    difficulty: 2,
    prompt: '¿En qué continente está Egipto?',
    options: ['Asia', 'Europa', 'África', 'Oriente Medio'],
    correctAnswer: 2
  },
  {
    id: 'cult_035',
    area: 'cultura',
    subarea: 'general',
    difficulty: 2,
    prompt: '¿Cuántos jugadores tiene un equipo de fútbol en el campo?',
    options: ['9', '10', '11', '12'],
    correctAnswer: 2
  },
  {
    id: 'cult_036',
    area: 'cultura',
    subarea: 'general',
    difficulty: 3,
    prompt: '¿Qué número está representado por "XII" en números romanos?',
    options: ['10', '11', '12', '14'],
    correctAnswer: 2
  },
  {
    id: 'cult_037',
    area: 'cultura',
    subarea: 'general',
    difficulty: 2,
    prompt: '¿Qué vitamina produce la piel cuando se expone al sol?',
    options: ['Vitamina A', 'Vitamina B', 'Vitamina C', 'Vitamina D'],
    correctAnswer: 3
  },
  {
    id: 'cult_038',
    area: 'cultura',
    subarea: 'general',
    difficulty: 3,
    prompt: '¿Cuál es la capital de Mongolia?',
    options: ['Ulan Bator', 'Pekín', 'Taskent', 'Astana'],
    correctAnswer: 0
  },
  {
    id: 'cult_039',
    area: 'cultura',
    subarea: 'general',
    difficulty: 3,
    prompt: '¿Qué partícula subatómica tiene carga negativa?',
    options: ['Protón', 'Neutrón', 'Electrón', 'Quark'],
    correctAnswer: 2
  },
  {
    id: 'cult_040',
    area: 'cultura',
    subarea: 'general',
    difficulty: 2,
    prompt: '¿Qué significa "www" en Internet?',
    options: ['World Wide Web', 'Web World Wide', 'Wide Web World', 'Web Wireless World'],
    correctAnswer: 0
  }
]

export const TEST_CONFIG = {
  totalDuration: 600,
  questionsPerArea: {
    matematica: 5,
    linguistica: 5,
    espacial: 5,
    logica: 5,
    cultura: 5
  },
  warningTimes: [180, 120, 60, 30],
  warningLabels: {
    180: '3 minutos',
    120: '2 minutos',
    60: '1 minuto',
    30: '30 segundos'
  }
}
