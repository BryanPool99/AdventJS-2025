/*
Simula el recorrido de un regalo dentro de una fábrica y devuelve cómo termina. Para ello debes crear una función runFactory(factory).

factory es un string[] donde cada celda puede ser:

> < ^ v movimientos
. salida correcta
Ten en cuenta que todas las filas tienen la misma longitud y que no habrá otros símbolos.

El regalo siempre empieza en la posición (0,0) (arriba a la izquierda). En cada paso lee la celda actual y se mueve según la dirección. Si llega a una celda con un punto (.) significa que ha salido correctamente de la fábrica.

Resultado

Devuelve uno de estos valores:

'completed' si llega a un .
'loop' si visita una posición dos veces
'broken' si sale fuera del tablero
Ejemplos

runFactory([
  '>>.'
]) // 'completed'

runFactory([
  '>>>'
]) // 'broken'

runFactory([
  '>><'
]) // 'loop'

runFactory([
  '>>v',
  '..<'
]) // 'completed'

runFactory([
  '>>v',
  '<<<'
]) // 'broken'

runFactory([
  '>v.',
  '^..'
]) // 'completed'

runFactory([
  'v.',
  '^.'
]) // 'loop'
*/

type Factory = string[]
type Result = 'completed' | 'broken' | 'loop'

function runFactory(factory: Factory): Result {
    // 1. Dimensiones de la fábrica
    const rows = factory.length;
    if (rows === 0) return 'completed'; // Manejar caso de fábrica vacía
    const cols = factory[0].length;
    if (cols === 0) return 'completed'; // Manejar caso de fila vacía

    // Posición inicial: (fila, columna)
    let row = 0;
    let col = 0;

    // 3. Registro de Visitas: Usamos un Set para almacenar coordenadas como strings "r,c"
    const visited = new Set<string>();

    // 4. Simulación paso a paso
    while (true) {
        // Coordenada actual como string para el Set
        const currentCoord = `${row},${col}`;

        // a) Detectar bucle
        if (visited.has(currentCoord)) {
            return 'loop';
        }

        // b) Marcar posición actual como visitada
        visited.add(currentCoord);

        // La fábrica está garantizada para no tener otros símbolos, 
        // y como col está dentro de los límites, factory[row][col] es seguro.
        const cell = factory[row][col];

        // c) Detectar salida correcta
        if (cell === '.') {
            return 'completed';
        }

        // d) Calcular la siguiente posición
        let nextRow = row;
        let nextCol = col;

        switch (cell) {
            case '>':
                nextCol++;
                break;
            case '<':
                nextCol--;
                break;
            case '^':
                nextRow--;
                break;
            case 'v':
                nextRow++;
                break;
            // No se necesitan otros casos según la descripción del problema
        }

        // e) Verificar si la siguiente posición está fuera de los límites (broken)
        if (nextRow < 0 || nextRow >= rows || nextCol < 0 || nextCol >= cols) {
            return 'broken';
        }

        // f) Actualizar la posición para la siguiente iteración
        row = nextRow;
        col = nextCol;
    }
}