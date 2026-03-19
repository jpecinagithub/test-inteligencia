export const questionsPool = [
  {
    id: 'math_001',
    area: 'matematica',
    subarea: 'series',
    difficulty: 1,
    prompt: '¿Cuál es el siguiente número en la serie? 2, 4, 6, 8, ___',
    options: ['9', '10', '11', '12'],
    correctAnswer: 1,
    explanation: 'La serie aumenta de 2 en 2. Sumando 2 a 8 obtenemos 10.'
  },
  {
    id: 'math_002',
    area: 'matematica',
    subarea: 'series',
    difficulty: 2,
    prompt: '¿Qué número sigue? 3, 6, 11, 18, 27, ___',
    options: ['36', '38', '39', '42'],
    correctAnswer: 1,
    explanation: 'La diferencia entre números consecutivos aumenta: 3, 5, 7, 9, 11. La siguiente diferencia es 11, entonces 27+11=38.'
  },
  {
    id: 'math_003',
    area: 'matematica',
    subarea: 'series',
    difficulty: 3,
    prompt: 'Encuentra el patrón: 1, 1, 2, 3, 5, 8, ___',
    options: ['11', '12', '13', '15'],
    correctAnswer: 2,
    explanation: 'Es la secuencia de Fibonacci: cada número es la suma de los dos anteriores. 5+8=13.'
  },
  {
    id: 'math_004',
    area: 'matematica',
    subarea: 'operaciones',
    difficulty: 1,
    prompt: '¿Cuánto es 15 + 27?',
    options: ['41', '42', '43', '44'],
    correctAnswer: 1,
    explanation: 'Simple suma: 15+27=42.'
  },
  {
    id: 'math_005',
    area: 'matematica',
    subarea: 'operaciones',
    difficulty: 2,
    prompt: 'Si 3x + 7 = 22, ¿cuánto vale x?',
    options: ['3', '4', '5', '6'],
    correctAnswer: 2,
    explanation: 'Despejando: 3x = 22-7 = 15, entonces x = 15/3 = 5.'
  },
  {
    id: 'math_006',
    area: 'matematica',
    subarea: 'porcentajes',
    difficulty: 2,
    prompt: '¿Cuál es el 25% de 80?',
    options: ['15', '20', '25', '30'],
    correctAnswer: 1,
    explanation: '25% = 25/100 = 1/4. Entonces 80/4 = 20.'
  },
  {
    id: 'math_007',
    area: 'matematica',
    subarea: 'porcentajes',
    difficulty: 3,
    prompt: 'Un producto cuesta $200. Aumenta 20% y luego disminuye 20%. ¿Cuál es su precio final?',
    options: ['$200', '$192', '$196', '$180'],
    correctAnswer: 1,
    explanation: 'Aumenta a $240, luego 20% de $240 = $48 menos. $240-$48 = $192. El orden de operaciones afecta el resultado.'
  },
  {
    id: 'math_008',
    area: 'matematica',
    subarea: 'proporciones',
    difficulty: 2,
    prompt: 'Si 4 trabajadores terminan una obra en 12 días, ¿cuántos días necesitan 6 trabajadores?',
    options: ['6 días', '8 días', '9 días', '10 días'],
    correctAnswer: 1,
    explanation: 'Trabajo inversamente proporcional: más trabajadores = menos días. 4×12 = 6×X, entonces X = 8 días.'
  },
  {
    id: 'math_009',
    area: 'matematica',
    subarea: 'comparaciones',
    difficulty: 1,
    prompt: '¿Qué fracción es mayor: 3/4 o 5/6?',
    options: ['3/4', '5/6', 'Son iguales', 'No se puede comparar'],
    correctAnswer: 1,
    explanation: '3/4 = 0.75 y 5/6 ≈ 0.833. Por lo tanto, 5/6 es mayor.'
  },
  {
    id: 'math_010',
    area: 'matematica',
    subarea: 'patrones',
    difficulty: 2,
    prompt: '¿Qué número rompe el patrón? 2, 4, 8, 16, 24, 32',
    options: ['24', '8', '16', '32'],
    correctAnswer: 0,
    explanation: 'Todos son potencias de 2 excepto 24, que debería ser 32 (y 24 rompe la secuencia).'
  },
  {
    id: 'math_011',
    area: 'matematica',
    subarea: 'operaciones',
    difficulty: 1,
    prompt: '¿Cuánto es 144 ÷ 12?',
    options: ['10', '11', '12', '14'],
    correctAnswer: 2,
    explanation: 'División directa: 144/12 = 12.'
  },
  {
    id: 'math_012',
    area: 'matematica',
    subarea: 'series',
    difficulty: 2,
    prompt: 'Completa la serie: 5, 10, 20, 40, ___',
    options: ['60', '70', '80', '90'],
    correctAnswer: 2,
    explanation: 'Cada número es el doble del anterior. 40×2 = 80.'
  },
  {
    id: 'math_013',
    area: 'matematica',
    subarea: 'problemas',
    difficulty: 2,
    prompt: 'Un tren viaja a 80 km/h. ¿Cuántos km recorrerá en 2.5 horas?',
    options: ['180 km', '200 km', '220 km', '160 km'],
    correctAnswer: 1,
    explanation: 'Distancia = velocidad × tiempo. 80 × 2.5 = 200 km.'
  },
  {
    id: 'math_014',
    area: 'matematica',
    subarea: 'porcentajes',
    difficulty: 1,
    prompt: '¿Cuánto es el 10% de 250?',
    options: ['20', '25', '30', '35'],
    correctAnswer: 1,
    explanation: '10% = 10/100 = 0.1. Entonces 250 × 0.1 = 25.'
  },
  {
    id: 'math_015',
    area: 'matematica',
    subarea: 'logica',
    difficulty: 3,
    prompt: 'Si todos los A son B, y algunos B son C, ¿qué podemos concluir?',
    options: ['Todos los A son C', 'Algunos A son C', 'Ningún A es C', 'No podemos concluir nada'],
    correctAnswer: 3,
    explanation: 'La información es insuficiente. Que algunos B sean C no implica necesariamente que algunos A sean C.'
  },
  {
    id: 'math_016',
    area: 'matematica',
    subarea: 'operaciones',
    difficulty: 2,
    prompt: '¿Cuánto es 7 × 8 + 12 ÷ 4?',
    options: ['56', '59', '62', '68'],
    correctAnswer: 1,
    explanation: 'Primero multiplicación y división: 7×8=56, 12÷4=3. Luego suma: 56+3=59.'
  },
  {
    id: 'math_017',
    area: 'matematica',
    subarea: 'series',
    difficulty: 3,
    prompt: '¿Qué número falta? 1, 4, 9, 16, ___, 36',
    options: ['20', '24', '25', '30'],
    correctAnswer: 2,
    explanation: 'Son cuadrados perfectos: 1², 2², 3², 4², 5²=25, 6²=36.'
  },
  {
    id: 'math_018',
    area: 'matematica',
    subarea: 'problemas',
    difficulty: 2,
    prompt: 'Ana tiene el doble de manzanas que Pedro. Si Pedro tiene 15, ¿cuántas tiene Ana?',
    options: ['25', '30', '35', '40'],
    correctAnswer: 1,
    explanation: 'El doble de 15 es 15×2 = 30.'
  },
  {
    id: 'math_019',
    area: 'matematica',
    subarea: 'comparaciones',
    difficulty: 1,
    prompt: 'Ordena de menor a mayor: 0.5, 0.75, 0.25, 0.6',
    options: ['0.25, 0.5, 0.6, 0.75', '0.5, 0.25, 0.6, 0.75', '0.75, 0.6, 0.5, 0.25', '0.25, 0.6, 0.5, 0.75'],
    correctAnswer: 0,
    explanation: 'Orden numérico correcto: 0.25 < 0.5 < 0.6 < 0.75.'
  },
  {
    id: 'math_020',
    area: 'matematica',
    subarea: 'porcentajes',
    difficulty: 3,
    prompt: 'Un artículo baja de $80 a $60. ¿Cuál es el porcentaje de descuento?',
    options: ['20%', '25%', '30%', '35%'],
    correctAnswer: 1,
    explanation: 'Descuento = (80-60)/80 × 100 = 20/80 × 100 = 25%.'
  },
  {
    id: 'math_021',
    area: 'matematica',
    subarea: 'operaciones',
    difficulty: 2,
    prompt: '¿Cuál es el resultado de 2³ + 3²?',
    options: ['12', '13', '17', '19'],
    correctAnswer: 2,
    explanation: '2³ = 8 y 3² = 9. Entonces 8+9 = 17.'
  },
  {
    id: 'math_022',
    area: 'matematica',
    subarea: 'series',
    difficulty: 1,
    prompt: 'Continúa: 100, 90, 80, 70, ___',
    options: ['60', '65', '55', '50'],
    correctAnswer: 0,
    explanation: 'La serie resta 10 cada vez. 70-10 = 60.'
  },
  {
    id: 'math_023',
    area: 'matematica',
    subarea: 'problemas',
    difficulty: 3,
    prompt: 'Si compras 3 camisas a $40 cada una con 15% de descuento, ¿cuánto pagas en total?',
    options: ['$100', '$102', '$108', '$112'],
    correctAnswer: 1,
    explanation: 'Total sin descuento: 3×40=$120. Descuento: 120×0.15=$18. Total a pagar: $120-$18=$102.'
  },
  {
    id: 'math_024',
    area: 'matematica',
    subarea: 'logica',
    difficulty: 2,
    prompt: 'Si hoy es lunes, ¿qué día será dentro de 100 días?',
    options: ['Miércoles', 'Jueves', 'Viernes', 'Domingo'],
    correctAnswer: 1,
    explanation: '100 mod 7 = 2 (porque 98 es divisible por 7). Lunes + 2 días = Miércoles, entonces 100 días después es Jueves.'
  },
  {
    id: 'math_025',
    area: 'matematica',
    subarea: 'operaciones',
    difficulty: 1,
    prompt: 'Resuelve: 156 - 89',
    options: ['65', '66', '67', '68'],
    correctAnswer: 2,
    explanation: '156-89 = 67.'
  },
  {
    id: 'ling_001',
    area: 'linguistica',
    subarea: 'analogias',
    difficulty: 1,
    prompt: 'Perro es a camada como gato es a ___',
    options: ['manada', 'camada', 'niñada', 'piara'],
    correctAnswer: 2,
    explanation: 'Un perro nace en una camada y un gato nace en una niñada. Son los términos correctos para las crías de cada animal.'
  },
  {
    id: 'ling_002',
    area: 'linguistica',
    subarea: 'analogias',
    difficulty: 2,
    prompt: 'Pluma es a escribir como pincel es a ___',
    options: ['dibujar', 'pintar', 'crear', 'colorear'],
    correctAnswer: 1,
    explanation: 'La pluma es el instrumento para escribir; el pincel es el instrumento para pintar.'
  },
  {
    id: 'ling_003',
    area: 'linguistica',
    subarea: 'sinonimos',
    difficulty: 1,
    prompt: '¿Cuál es un sinónimo de "alegre"?',
    options: ['Triste', 'Contento', 'Enojado', 'Asustado'],
    correctAnswer: 1,
    explanation: '"Contento" significa lleno de alegría o felicidad, es un sinónimo directo de "alegre".'
  },
  {
    id: 'ling_004',
    area: 'linguistica',
    subarea: 'antonimos',
    difficulty: 1,
    prompt: '¿Cuál es el antónimo de "oscuro"?',
    options: ['Negro', 'Gris', 'Claro', 'Sombreado'],
    correctAnswer: 2,
    explanation: '"Claro" es lo opuesto a "oscuro". Negro y gris son colores, no antónimos de oscuridad.'
  },
  {
    id: 'ling_005',
    area: 'linguistica',
    subarea: 'comprension',
    difficulty: 2,
    prompt: '"El sabio no dice todo lo que sabe." ¿Qué significa esto?',
    options: ['Los sabios mienten', 'La prudencia es virtud del sabio', 'Los sabios no saben mucho', 'Es mejor callar'],
    correctAnswer: 1,
    explanation: 'La frase sugiere que los sabios son prudentes y no revelan todo su conocimiento.'
  },
  {
    id: 'ling_006',
    area: 'linguistica',
    subarea: 'intrusa',
    difficulty: 1,
    prompt: '¿Qué palabra NO pertenece al grupo? Manzana, plátano, naranja, escritorio',
    options: ['Manzana', 'Plátano', 'Naranja', 'Escritorio'],
    correctAnswer: 3,
    explanation: 'Escritorio es un mueble, mientras que las demás son frutas.'
  },
  {
    id: 'ling_007',
    area: 'linguistica',
    subarea: 'intrusa',
    difficulty: 2,
    prompt: '¿Cuál NO es un animal marino? Tiburón, ballena, delfín, jirafa',
    options: ['Tiburón', 'Ballena', 'Delfín', 'Jirafa'],
    correctAnswer: 3,
    explanation: 'Jirafa es un animal terrestre. Tiburón, ballena y delfín viven en el mar.'
  },
  {
    id: 'ling_008',
    area: 'linguistica',
    subarea: 'analogias',
    difficulty: 2,
    prompt: 'Mariposa es a insecto como águila es a ___',
    options: ['ave', 'planeador', 'rapaz', 'cielo'],
    correctAnswer: 0,
    explanation: 'La mariposa es un insecto; el águila es un ave. Clasificamos por categorías zoológicas.'
  },
  {
    id: 'ling_009',
    area: 'linguistica',
    subarea: 'sinonimos',
    difficulty: 2,
    prompt: '¿Cuál es un sinónimo de "abrumador"?',
    options: ['Moderado', 'Esencial', 'Avasallador', 'Insignificante'],
    correctAnswer: 2,
    explanation: '"Avasallador" significa que abruma u overtakes, siendo un sinónimo cercano.'
  },
  {
    id: 'ling_010',
    area: 'linguistica',
    subarea: 'comprension',
    difficulty: 3,
    prompt: '"Quien mucho abarca, poco aprieta." Esta frase enseña que:',
    options: ['Hay que ser fuerte', 'Es mejor enfocarse en pocas tareas', 'El ejercicio físico es importante', 'La presión es necesaria'],
    correctAnswer: 1,
    explanation: 'La frase advierte sobre la falta de profundidad cuando se try intenta hacer demasiadas cosas a la vez.'
  },
  {
    id: 'ling_011',
    area: 'linguistica',
    subarea: 'relaciones',
    difficulty: 2,
    prompt: 'Libro es a lectura como televisión es a ___',
    options: ['mando', 'entretenimiento', 'cable', 'pantalla'],
    correctAnswer: 1,
    explanation: 'El libro se usa para la lectura; la televisión se usa principalmente para el entretenimiento.'
  },
  {
    id: 'ling_012',
    area: 'linguistica',
    subarea: 'intrusa',
    difficulty: 2,
    prompt: '¿Qué palabra NO pertenece? Rio, lago, mar, árbol',
    options: ['Rio', 'Lago', 'Mar', 'Árbol'],
    correctAnswer: 3,
    explanation: 'Árbol es un ser vivo; río, lago y mar son masas de agua.'
  },
  {
    id: 'ling_013',
    area: 'linguistica',
    subarea: 'antonimos',
    difficulty: 2,
    prompt: '¿Cuál es el antónimo de "frágil"?',
    options: ['Fuerte', 'Resistente', 'Sólido', 'Duro'],
    correctAnswer: 1,
    explanation: '"Resistente" es lo opuesto a "frágil". Fuerte y resistente son similares, pero resistente es más preciso.'
  },
  {
    id: 'ling_014',
    area: 'linguistica',
    subarea: 'comprension',
    difficulty: 2,
    prompt: 'Si digo "Estamos en las mismas", ¿qué significa?',
    options: ['Estamos juntos', 'Tenemos la misma situación', 'Estamos equivocados', 'Somos idénticos'],
    correctAnswer: 1,
    explanation: 'Expresión que indica que dos personas están en la misma situación o circunstancias.'
  },
  {
    id: 'ling_015',
    area: 'linguistica',
    subarea: 'analogias',
    difficulty: 3,
    prompt: 'Ojos es a ver como oídos es a ___',
    options: ['cabeza', 'tocar', 'oir', 'equilibrio'],
    correctAnswer: 2,
    explanation: 'Los ojos sirven para ver; los oídos sirven para oír. Relación órgano-función.'
  },
  {
    id: 'ling_016',
    area: 'linguistica',
    subarea: 'sinonimos',
    difficulty: 1,
    prompt: '¿Cuál es un sinónimo de "grande"?',
    options: ['Pequeño', 'Enorme', 'Mediano', 'Diminuto'],
    correctAnswer: 1,
    explanation: '"Enorme" significa muy grande, siendo un sinónimo intensify de grande.'
  },
  {
    id: 'ling_017',
    area: 'linguistica',
    subarea: 'comprension',
    difficulty: 2,
    prompt: '"No todo lo que brilla es oro." Significa que:',
    options: ['El oro brilla mucho', 'Las apariencias engañan', 'El brillo es importante', 'El oro es valioso'],
    correctAnswer: 1,
    explanation: 'La frase advierte que las apariencias pueden ser engañosas y no todo es lo que parece.'
  },
  {
    id: 'ling_018',
    area: 'linguistica',
    subarea: 'relaciones',
    difficulty: 2,
    prompt: 'Compositor es a música como arquitecto es a ___',
    options: ['construcción', 'diseño', 'edificios', 'planos'],
    correctAnswer: 1,
    explanation: 'El compositor crea música; el arquitecto crea diseños. Ambos crean planos creativos.'
  },
  {
    id: 'ling_019',
    area: 'linguistica',
    subarea: 'intrusa',
    difficulty: 1,
    prompt: '¿Cuál NO es un color primario? Rojo, azul, verde, amarillo',
    options: ['Rojo', 'Azul', 'Verde', 'Amarillo'],
    correctAnswer: 2,
    explanation: 'Los colores primarios son rojo, azul y amarillo. Verde es un color secundario.'
  },
  {
    id: 'ling_020',
    area: 'linguistica',
    subarea: 'antonimos',
    difficulty: 1,
    prompt: '¿Cuál es el antónimo de "rápido"?',
    options: ['Veloz', 'Lento', 'Velozmente', 'Presto'],
    correctAnswer: 1,
    explanation: '"Lento" es lo opuesto a rápido. Veloz y presto son sinónimos de rápido.'
  },
  {
    id: 'ling_021',
    area: 'linguistica',
    subarea: 'comprension',
    difficulty: 3,
    prompt: '"A quien madruga, Dios le ayuda." Esta frase implica que:',
    options: ['Dios favorece a los madrugadores', 'La planificación tiene recompensa', 'Dormir temprano es bueno', 'La religión es importante'],
    correctAnswer: 1,
    explanation: 'La frase sugiere que la anticipación y preparación son recompensadas.'
  },
  {
    id: 'ling_022',
    area: 'linguistica',
    subarea: 'analogias',
    difficulty: 2,
    prompt: 'Dedo es a mano como hoja es a ___',
    options: ['árbol', 'libro', 'flor', 'rama'],
    correctAnswer: 1,
    explanation: 'Los dedos son partes de la mano; las hojas son partes de un libro.'
  },
  {
    id: 'ling_023',
    area: 'linguistica',
    subarea: 'sinonimos',
    difficulty: 2,
    prompt: '¿Cuál es un sinónimo de "sutil"?',
    options: ['Grueso', 'Delicado', 'Rugoso', 'Fuerte'],
    correctAnswer: 1,
    explanation: '"Delicado" o "sutil" indican algo fino, ligero o difícil de percibir.'
  },
  {
    id: 'ling_024',
    area: 'linguistica',
    subarea: 'intrusa',
    difficulty: 3,
    prompt: '¿Cuál NO es un instrumento musical? Guitarra, violín, martillo, piano',
    options: ['Guitarra', 'Violín', 'Martillo', 'Piano'],
    correctAnswer: 2,
    explanation: 'Martillo es una herramienta; guitarra, violín y piano son instrumentos musicales.'
  },
  {
    id: 'ling_025',
    area: 'linguistica',
    subarea: 'relaciones',
    difficulty: 2,
    prompt: 'Cuchillo es a cortar como cubo es a ___',
    options: ['llenar', 'agua', 'contenedor', 'hielo'],
    correctAnswer: 2,
    explanation: 'El cuchillo sirve para cortar; el cubo es un tipo de contenedor.'
  },
  {
    id: 'esp_001',
    area: 'espacial',
    subarea: 'rotacion',
    difficulty: 1,
    prompt: 'Si giras la letra "N" 180 grados, ¿qué letra parece?',
    options: ['Z', 'N', 'M', 'W'],
    correctAnswer: 1,
    explanation: 'La N al rotarse 180 grados se ve idéntica a sí misma.'
  },
  {
    id: 'esp_002',
    area: 'espacial',
    subarea: 'secuencias',
    difficulty: 2,
    prompt: '¿Qué figura viene después? □ ○ △ □ ○ ___',
    options: ['□', '○', '△', '◇'],
    correctAnswer: 2,
    explanation: 'El patrón es cuadrado, círculo, triángulo que se repite. Después del triángulo viene el cuadrado.'
  },
  {
    id: 'esp_003',
    area: 'espacial',
    subarea: 'patrones',
    difficulty: 2,
    prompt: '¿Cuántos triángulos ves en una pirámide de 3 niveles?',
    options: ['3', '4', '5', '6'],
    correctAnswer: 3,
    explanation: 'Nivel 1: 1 triángulo. Nivel 2: 2+1=3 triángulos visibles. Nivel 3: 3+2+1=6.'
  },
  {
    id: 'esp_004',
    area: 'espacial',
    subarea: 'rotacion',
    difficulty: 1,
    prompt: 'Si rotas una "b" 90° en sentido horario, ¿qué letra obtienes?',
    options: ['p', 'd', 'q', 'b'],
    correctAnswer: 0,
    explanation: 'La "b" minúscula rotada 90° se convierte en "p".'
  },
  {
    id: 'esp_005',
    area: 'espacial',
    subarea: 'simetria',
    difficulty: 2,
    prompt: '¿Cuál de estas letras tiene simetría vertical?',
    options: ['A', 'B', 'C', 'F'],
    correctAnswer: 0,
    explanation: 'La letra A tiene un eje de simetría vertical que la divide en dos mitades iguales.'
  },
  {
    id: 'esp_006',
    area: 'espacial',
    subarea: 'secuencias',
    difficulty: 2,
    prompt: '¿Qué número completa el patrón? ■□■■□■■■□■■■ ___',
    options: ['□', '■', '▪', 'Es irregular'],
    correctAnswer: 0,
    explanation: 'El patrón se expande: ■□ → ■■□ → ■■■□ → ■■■■□. Después de ■■■■□ viene □.'
  },
  {
    id: 'esp_007',
    area: 'espacial',
    subarea: 'matrices',
    difficulty: 3,
    prompt: 'En una matriz, si A→B y el patrón es +1, ¿qué valor tiene C si C→?',
    options: ['3', '1', '2', '0'],
    correctAnswer: 0,
    explanation: 'Si A=1, B=2 (suma 1), entonces C=3.'
  },
  {
    id: 'esp_008',
    area: 'espacial',
    subarea: 'rotacion',
    difficulty: 2,
    prompt: '¿Cuántos ejes de simetría tiene un cuadrado?',
    options: ['2', '4', '6', '8'],
    correctAnswer: 1,
    explanation: 'Un cuadrado tiene 4 ejes de simetría: 2 diagonales y 2 líneas medias (horizontal y vertical).'
  },
  {
    id: 'esp_009',
    area: 'espacial',
    subarea: 'patrones',
    difficulty: 1,
    prompt: '¿Cuántos lados tiene un polígono regular con 5 ángulos internos?',
    options: ['3', '4', '5', '6'],
    correctAnswer: 2,
    explanation: 'Un polígono tiene el mismo número de lados que de ángulos. 5 ángulos = 5 lados (pentágono).'
  },
  {
    id: 'esp_010',
    area: 'espacial',
    subarea: 'secuencias',
    difficulty: 2,
    prompt: '❶ → ❷ → ❸ → ¿?',
    options: ['❹', '❶', '❻', '❺'],
    correctAnswer: 0,
    explanation: 'Secuencia de números encirculados: 1, 2, 3, 4.'
  },
  {
    id: 'esp_011',
    area: 'espacial',
    subarea: 'rotacion',
    difficulty: 1,
    prompt: 'Si volteas horizontalmente la letra "d", ¿qué letra obtienes?',
    options: ['b', 'p', 'q', 'Ninguna'],
    correctAnswer: 2,
    explanation: 'La "d" volteada horizontalmente se convierte en "q".'
  },
  {
    id: 'esp_012',
    area: 'espacial',
    subarea: 'patrones',
    difficulty: 2,
    prompt: 'Si doblas un papel 3 veces, ¿cuántas capas tendrás?',
    options: ['6', '8', '9', '12'],
    correctAnswer: 1,
    explanation: 'Cada doblez duplica las capas: 1→2→4→8. Con 3 dobleces: 2³ = 8 capas.'
  },
  {
    id: 'esp_013',
    area: 'espacial',
    subarea: 'simetria',
    difficulty: 1,
    prompt: '¿Cuál tiene al menos un eje de simetría?',
    options: ['Triángulo escaleno', 'Triángulo isósceles', 'Triángulo rectángulo', 'Ninguno'],
    correctAnswer: 1,
    explanation: 'El triángulo isósceles tiene al menos un eje de simetría (la altura desde el ángulo desigual).'
  },
  {
    id: 'esp_014',
    area: 'espacial',
    subarea: 'secuencias',
    difficulty: 2,
    prompt: 'Encuentra el patrón: ▲○●▲○●▲○ ___',
    options: ['●', '▲', '○', '■'],
    correctAnswer: 1,
    explanation: 'El patrón es triángulo, círculo, punto que se repite. Después del círculo viene el triángulo.'
  },
  {
    id: 'esp_015',
    area: 'espacial',
    subarea: 'rotacion',
    difficulty: 3,
    prompt: '¿Cuántos grados debe girar una flecha ↑ para apuntar a la derecha?',
    options: ['45°', '90°', '180°', '270°'],
    correctAnswer: 1,
    explanation: 'Una rotación de 90° en sentido horario hace que ↑ apunte →.'
  },
  {
    id: 'esp_016',
    area: 'espacial',
    subarea: 'patrones',
    difficulty: 2,
    prompt: 'Si pones 3 cubos en línea, ¿cuántas caras totales tiene el objeto?',
    options: ['14', '16', '18', '20'],
    correctAnswer: 2,
    explanation: 'Un cubo tiene 6 caras. 3 en línea: 2 extremos con 5 caras visibles + 1 centro con 4 = 14. Pero las uniones ocultan 2+2=4, total 18.'
  },
  {
    id: 'esp_017',
    area: 'espacial',
    subarea: 'secuencias',
    difficulty: 1,
    prompt: '¿Qué figura falta? ●○●○●●○●○ ___',
    options: ['●', '○', '●○', '●'],
    correctAnswer: 1,
    explanation: 'Patrón: ●○ ●○ ●○ ●○ ●○. Faltan dos círculos.'
  },
  {
    id: 'esp_018',
    area: 'espacial',
    subarea: 'rotacion',
    difficulty: 2,
    prompt: '¿Qué hora marca un reloj si la aguja de minutos apunta a 12 y la de horas a 6?',
    options: ['6:00', '12:30', '6:30', '12:00'],
    correctAnswer: 0,
    explanation: 'Si el minutero apunta a 12, son xx:00. Si la aguja de horas apunta a 6, son las 6:00.'
  },
  {
    id: 'esp_019',
    area: 'espacial',
    subarea: 'matrices',
    difficulty: 2,
    prompt: 'En una secuencia, si ★★ = 4 y ★★★ = 9, ¿cuánto es ★★★★?',
    options: ['12', '14', '16', '18'],
    correctAnswer: 2,
    explanation: 'Patrón: n² + n. 2★ = 4 (2²), 3★ = 9 (3²), 4★ = 16 (4²).'
  },
  {
    id: 'esp_020',
    area: 'espacial',
    subarea: 'simetria',
    difficulty: 1,
    prompt: '¿Cuál letra NO tiene simetría?',
    options: ['A', 'H', 'X', 'Z'],
    correctAnswer: 3,
    explanation: 'La Z no tiene simetría. La A, H y X tienen ejes de simetría.'
  },
  {
    id: 'esp_021',
    area: 'espacial',
    subarea: 'patrones',
    difficulty: 2,
    prompt: '¿Cuántos cuadrados hay en un tablero de ajedrez (8x8)?',
    options: ['64', '128', '204', '256'],
    correctAnswer: 2,
    explanation: 'Suma de cuadrados: 1²+2²+3²+4²+5²+6²+7²+8² = 1+4+9+16+25+36+49+64 = 204.'
  },
  {
    id: 'esp_022',
    area: 'espacial',
    subarea: 'rotacion',
    difficulty: 1,
    prompt: 'Un dado tiene el 1 frente al 6, el 2 frente al 5. ¿Qué número está frente al 3?',
    options: ['1', '4', '6', '2'],
    correctAnswer: 1,
    explanation: 'En un dado estándar, los números opuestos suman 7. Entonces 3+4=7, el 4 está frente al 3.'
  },
  {
    id: 'esp_023',
    area: 'espacial',
    subarea: 'secuencias',
    difficulty: 2,
    prompt: 'Sigue el patrón: ▲▲△▲▲△△▲▲△ ___',
    options: ['△', '▲', '●', '■'],
    correctAnswer: 0,
    explanation: 'El patrón se expande: ▲▲△ → ▲▲△△ → ▲▲△△▲ → ▲▲△△. Faltan dos △.'
  },
  {
    id: 'esp_024',
    area: 'espacial',
    subarea: 'matrices',
    difficulty: 3,
    prompt: 'Si un poste de 6m proyecta una sombra de 8m, ¿qué altura tiene un árbol cuya sombra mide 12m?',
    options: ['6m', '8m', '9m', '12m'],
    correctAnswer: 2,
    explanation: 'Proporción: 6m/8m = 0.75. Si la sombra es 12m: 12 × 0.75 = 9m.'
  },
  {
    id: 'esp_025',
    area: 'espacial',
    subarea: 'rotacion',
    difficulty: 1,
    prompt: '¿Qué vista obtienes si miras un cubo desde arriba?',
    options: ['Un cuadrado', 'Un triángulo', 'Un hexágono', 'Un círculo'],
    correctAnswer: 0,
    explanation: 'Un cubo visto desde arriba es un cuadrado (su cara superior).'
  },
  {
    id: 'log_001',
    area: 'logica',
    subarea: 'silogismos',
    difficulty: 2,
    prompt: 'Todos los gatos son felinos. Algunos felinos son negros. ¿Qué se puede concluir?',
    options: ['Todos los gatos son negros', 'Algunos gatos son negros', 'Ningún gato es negro', 'No hay conclusión válida'],
    correctAnswer: 3,
    explanation: 'La información es insuficiente. "Algunos felinos son negros" no implica que los gatos estén en ese grupo.'
  },
  {
    id: 'log_002',
    area: 'logica',
    subarea: 'condicional',
    difficulty: 1,
    prompt: 'Si llueve, entonces me quedo en casa. Está lloviendo. ¿Qué puedes concluir?',
    options: ['No me quedo', 'Me quedo en casa', 'Salgo corriendo', 'No hay conclusión'],
    correctAnswer: 1,
    explanation: 'Lógica modus ponens: si P→Q y P es verdadero, entonces Q es verdadero.'
  },
  {
    id: 'log_003',
    area: 'logica',
    subarea: 'clasificacion',
    difficulty: 1,
    prompt: '¿Cuál número no pertenece? 2, 5, 7, 9, 11, 14',
    options: ['2', '9', '11', '14'],
    correctAnswer: 3,
    explanation: '2, 5, 7, 9, 11 son impares. 14 es el único número par, o 9 no es primo.'
  },
  {
    id: 'log_004',
    area: 'logica',
    subarea: 'patrones',
    difficulty: 2,
    prompt: '¿Qué sigue? Si llueve → mojado, Si hace frío → congelado, Si nublado → ___',
    options: ['Soleado', 'No hay conclusión', 'Oscuridad', 'Precipitación'],
    correctAnswer: 1,
    explanation: 'El patrón因果 no es consistente. Nublado no garantiza ningún resultado específico.'
  },
  {
    id: 'log_005',
    area: 'logica',
    subarea: 'deduccion',
    difficulty: 2,
    prompt: 'Ana es mayor que Bea. Bea es mayor que Carla. ¿Quién es la menor?',
    options: ['Ana', 'Bea', 'Carla', 'No se puede saber'],
    correctAnswer: 2,
    explanation: 'Ana > Bea > Carla. Por lo tanto, Carla es la menor.'
  },
  {
    id: 'log_006',
    area: 'logica',
    subarea: 'silogismos',
    difficulty: 2,
    prompt: 'Ningún reptil vuela. Las serpientes son reptiles. ¿Qué es verdadero?',
    options: ['Todas las serpientes vuelan', 'Algunas serpientes vuelan', 'Ninguna serpiente vuela', 'Todos los reptiles vuelan'],
    correctAnswer: 2,
    explanation: 'Silogismo válido:Ningún reptil vuela + Las serpientes son reptiles = Ninguna serpiente vuela.'
  },
  {
    id: 'log_007',
    area: 'logica',
    subarea: 'condicional',
    difficulty: 1,
    prompt: 'Si estudio, apruebo. No aprobé. ¿Qué podemos inferir?',
    options: ['Estudié', 'No estudié', 'El examen era difícil', 'No hay información'],
    correctAnswer: 1,
    explanation: 'Modus tollens: si P→Q y ¬Q, entonces ¬P. No aprobaste implies que no estudiaste.'
  },
  {
    id: 'log_008',
    area: 'logica',
    subarea: 'clasificacion',
    difficulty: 2,
    prompt: '¿Cuál no sigue la regla? Regla: número primo mayor a 3 es impar.',
    options: ['5', '7', '11', '9'],
    correctAnswer: 3,
    explanation: '9 no es primo (9=3×3). Los demás son primos impares.'
  },
  {
    id: 'log_009',
    area: 'logica',
    subarea: 'patrones',
    difficulty: 2,
    prompt: 'A es igual a B. B es mayor que C. C es igual a D. ¿Qué relación hay entre A y D?',
    options: ['A > D', 'A = D', 'A < D', 'No se puede determinar'],
    correctAnswer: 1,
    explanation: 'A=B, B>C, C=D. Por transitividad: A=B=C=D, entonces A=D.'
  },
  {
    id: 'log_010',
    area: 'logica',
    subarea: 'deduccion',
    difficulty: 3,
    prompt: 'Hay 3 cajas mal etiquetadas. Una dice "Oro", otra "Plata", otra "Oro o Plata". Si abres una y ves oro, ¿qué sabes?',
    options: ['La caja "Oro" tiene plata', 'La caja "Oro" tiene oro', 'Ambas cajas tienen lo mismo', 'No se puede saber'],
    correctAnswer: 0,
    explanation: 'Si ves oro, abriste la caja "Oro o Plata". La caja "Oro" no puede tener oro (está mal etiquetada), así que tiene plata.'
  },
  {
    id: 'log_011',
    area: 'logica',
    subarea: 'condicional',
    difficulty: 2,
    prompt: 'Si tengo hambre Y tengo dinero, como. Tengo hambre pero NO tengo dinero. ¿Qué pasa?',
    options: ['Como', 'No como', 'Pido prestado', 'Depende del plato'],
    correctAnswer: 1,
    explanation: 'Condición AND: se necesitan ambos. Si falta dinero, no como.'
  },
  {
    id: 'log_012',
    area: 'logica',
    subarea: 'silogismos',
    difficulty: 2,
    prompt: 'Todos los psicólogos son empáticos. María es psicóloga. ¿Qué concluimos?',
    options: ['María es empática', 'María no es empática', 'Todos los empáticos son psicólogos', 'María es doctora'],
    correctAnswer: 0,
    explanation: 'Silogismo: Todos P son E + María es P = María es E.'
  },
  {
    id: 'log_013',
    area: 'logica',
    subarea: 'clasificacion',
    difficulty: 1,
    prompt: '¿Cuál número completa la secuencia? 3, 6, 9, 12, 15, 18...',
    options: ['20', '21', '22', '24'],
    correctAnswer: 1,
    explanation: 'La tabla del 3: 3, 6, 9, 12, 15, 18, 21.'
  },
  {
    id: 'log_014',
    area: 'logica',
    subarea: 'patrones',
    difficulty: 2,
    prompt: 'Si 2+2=4, 3+3=18, 4+4=32, ¿cuánto es 5+5?',
    options: ['50', '55', '60', '70'],
    correctAnswer: 0,
    explanation: 'Patrón: n×n + n×(n-1). 5×5 + 5×4 = 25+20 = 50.'
  },
  {
    id: 'log_015',
    area: 'logica',
    subarea: 'deduccion',
    difficulty: 2,
    prompt: 'Pedro vive más al norte que Juan. Juan vive más al norte que María. ¿Quién vive más al sur?',
    options: ['Pedro', 'Juan', 'María', 'Pedro y Juan'],
    correctAnswer: 0,
    explanation: 'Pedro > Juan > María en posición norte. María vive más al sur.'
  },
  {
    id: 'log_016',
    area: 'logica',
    subarea: 'condicional',
    difficulty: 1,
    prompt: 'Si hace sol, salgo. No está haciendo sol. ¿Salgo?',
    options: ['Sí', 'No', 'Depende', 'A veces'],
    correctAnswer: 1,
    explanation: 'La condición no se cumple. Sin sol, no salgo.'
  },
  {
    id: 'log_017',
    area: 'logica',
    subarea: 'patrones',
    difficulty: 3,
    prompt: 'Si 1=3, 2=3, 3=5, 4=4, 5=4, ¿a qué es igual 6?',
    options: ['3', '4', '5', '6'],
    correctAnswer: 1,
    explanation: 'El número de letras: One=3, Two=3, Three=5, Four=4, Five=4. Six=3 letras, pero el patrón muestra el número sin cambios.'
  },
  {
    id: 'log_018',
    area: 'logica',
    subarea: 'silogismos',
    difficulty: 2,
    prompt: 'Ningún mamífero es ave. El pingüino es ave. ¿Qué concluimos?',
    options: ['El pingüino es mamífero', 'El pingüino no es mamífero', 'Todos los pájaros son pingüinos', 'Ningún pingüino existe'],
    correctAnswer: 1,
    explanation: 'Ningún mamífero es ave + Pingüino es ave = Pingüino no es mamífero.'
  },
  {
    id: 'log_019',
    area: 'logica',
    subarea: 'clasificacion',
    difficulty: 2,
    prompt: '¿Cuál palabra no pertenece? Magisterio, academia, facultad, prisión',
    options: ['Magisterio', 'Academia', 'Facultad', 'Prisión'],
    correctAnswer: 3,
    explanation: 'Prisión es una institución correccional; las demás son instituciones educativas.'
  },
  {
    id: 'log_020',
    area: 'logica',
    subarea: 'deduccion',
    difficulty: 1,
    prompt: 'El rojo es más claro que el azul. El azul es más claro que el verde. ¿Cuál es el más oscuro?',
    options: ['Rojo', 'Azul', 'Verde', 'Igual'],
    correctAnswer: 2,
    explanation: 'Orden de claridad: Rojo > Azul > Verde. El verde es el más oscuro.'
  },
  {
    id: 'log_021',
    area: 'logica',
    subarea: 'condicional',
    difficulty: 2,
    prompt: 'Si corro, me canso. Si descanso, no me canso. Estoy cansado. ¿Qué hice?',
    options: ['Corrí', 'Descansé', 'Ambas cosas', 'No sé'],
    correctAnswer: 0,
    explanation: 'Si descansara, no estaría cansado. Estoy cansado → corrí.'
  },
  {
    id: 'log_022',
    area: 'logica',
    subarea: 'patrones',
    difficulty: 2,
    prompt: 'Si todos los A son B, y todos los B son C, ¿todos los A son C?',
    options: ['Sí', 'No', 'Solo algunos', 'Depende'],
    correctAnswer: 0,
    explanation: 'Transitividad: A⊆B y B⊆C implica A⊆C. Sí, todos los A son C.'
  },
  {
    id: 'log_023',
    area: 'logica',
    subarea: 'silogismos',
    difficulty: 3,
    prompt: 'Algunos estudiantes son atletas. Todos los atletas entrenan. ¿Qué podemos afirmar?',
    options: ['Todos los estudiantes entrenan', 'Algunos estudiantes entrenan', 'Ningún estudiante entrena', 'No hay conclusión'],
    correctAnswer: 1,
    explanation: 'Algunos estudiantes ⊆ atletas y atletas ⊆ entrenan. Entonces algunos estudiantes ⊆ entrenan.'
  },
  {
    id: 'log_024',
    area: 'logica',
    subarea: 'deduccion',
    difficulty: 2,
    prompt: 'En una fila: Carlos antes que Diana. Diana antes que Eduardo. Eduardo antes que Felipe. ¿Quién es primero?',
    options: ['Carlos', 'Diana', 'Eduardo', 'Felipe'],
    correctAnswer: 0,
    explanation: 'Carlos > Diana > Eduardo > Felipe. Carlos es el primero.'
  },
  {
    id: 'log_025',
    area: 'logica',
    subarea: 'patrones',
    difficulty: 1,
    prompt: 'Si 4=2 en código binario, ¿cuánto es 8?',
    options: ['2', '3', '4', '8'],
    correctAnswer: 2,
    explanation: '4 en binario es 100 = 3 bits. 8 en binario es 1000 = 4 bits.'
  },
  {
    id: 'pers_001',
    area: 'personalidad',
    subarea: 'toma_decisiones',
    trait: 'decisionConfidence',
    difficulty: 1,
    prompt: 'Cuando enfrento un problema difícil, generalmente lo resuelvo:',
    options: ['Analizo varias opciones antes de decidir', 'Inmediatamente, por instinto', 'Consultando con otros', 'Evitándolo si es posible'],
    correctAnswer: 0,
    estimatedSeconds: 15
  },
  {
    id: 'pers_002',
    area: 'personalidad',
    subarea: 'presion',
    trait: 'pressureTolerance',
    difficulty: 1,
    prompt: 'Cuando tengo una fecha límite cercana, generalmente:',
    options: ['Trabajo mejor bajo presión', 'Me siento ansioso/a', 'Me organizo mejor', 'Prefiero evitarlo'],
    correctAnswer: 0,
    explanation: 'Evalúa tu tolerancia al estrés y cómo respondes a la presión de tiempo.'
  },
  {
    id: 'pers_003',
    area: 'personalidad',
    subarea: 'impulsividad',
    trait: 'impulsivity',
    difficulty: 1,
    prompt: 'Antes de tomar una decisión importante, generalmente:',
    options: ['Pienso cuidadosamente antes de actuar', 'Actúo rápido y luego pienso', 'Pido opiniones de otros', 'Lo dejo para después'],
    correctAnswer: 0,
    estimatedSeconds: 15
  },
  {
    id: 'pers_004',
    area: 'personalidad',
    subarea: 'analisis',
    trait: 'analytical',
    difficulty: 1,
    prompt: 'Cuando aprendo algo nuevo, prefiero:',
    options: ['Ver ejemplos prácticos', 'Entender la teoría primero', 'Ambas cosas por igual', 'Aprender de memoria'],
    correctAnswer: 0,
    explanation: 'Identifica tu estilo de aprendizaje preferido.'
  },
  {
    id: 'pers_005',
    area: 'personalidad',
    subarea: 'persistencia',
    trait: 'persistence',
    difficulty: 1,
    prompt: 'Cuando un problema es muy difícil, generalmente:',
    options: ['Insisto hasta resolverlo', 'Busco ayuda', 'Lo dejo para después', 'Cambio de estrategia'],
    correctAnswer: 0,
    explanation: 'Evalúa tu nivel de persistencia ante obstáculos.'
  },
  {
    id: 'pers_006',
    area: 'personalidad',
    subarea: 'toma_decisiones',
    trait: 'decisionConfidence',
    difficulty: 1,
    prompt: '¿Con qué frecuencia reconsideras tus decisiones después de tomarlas?',
    options: ['Rara vez, confío en mi criterio', 'A veces', 'Frecuentemente', 'Siempre las cambio'],
    correctAnswer: 0,
    estimatedSeconds: 15
  },
  {
    id: 'pers_007',
    area: 'personalidad',
    subarea: 'presion',
    trait: 'pressureTolerance',
    difficulty: 1,
    prompt: 'En una situación de emergencia, generalmente:',
    options: ['Mantengo la calma', 'Me pongo nervioso/a', 'Me bloqueo', 'Pido ayuda inmediatamente'],
    correctAnswer: 0,
    explanation: 'Evalúa cómo respondes bajo presión extrema.'
  },
  {
    id: 'pers_008',
    area: 'personalidad',
    subarea: 'analisis',
    trait: 'analytical',
    difficulty: 1,
    prompt: 'Cuando ves un problema complejo, tu primer impulso es:',
    options: ['Dividirlo en partes', 'Actuar rápidamente', 'Buscar a alguien que lo resuelva', 'Ignorarlo'],
    correctAnswer: 0,
    explanation: 'Identifica tu enfoque para resolver problemas complejos.'
  },
  {
    id: 'pers_019',
    area: 'personalidad',
    subarea: 'impulsividad',
    trait: 'impulsivity',
    difficulty: 1,
    prompt: 'Cuando recibes un mensaje importante, ¿qué haces?',
    options: ['Pienso bien la respuesta antes de responder', 'Respondo inmediatamente', 'Espero un poco', 'Lo ignoro'],
    correctAnswer: 0,
    estimatedSeconds: 15
  },
  {
    id: 'pers_010',
    area: 'personalidad',
    subarea: 'persistencia',
    trait: 'persistence',
    difficulty: 1,
    prompt: 'Cuando algo no funciona después de varios intentos, ¿qué haces?',
    options: ['Sigo intentando', 'Cambio de método', 'Pido ayuda', 'Abandono'],
    correctAnswer: 0,
    explanation: 'Evalúa tu persistencia y capacidad de adaptación.'
  }
]

export const TEST_CONFIG = {
  totalDuration: 600,
  questionsPerArea: {
    matematica: 5,
    linguistica: 5,
    espacial: 5,
    logica: 5,
    personalidad: 5
  },
  warningTimes: [300, 120, 60, 30],
  warningLabels: {
    300: '5 minutos',
    120: '2 minutos',
    60: '1 minuto',
    30: '30 segundos'
  }
}
