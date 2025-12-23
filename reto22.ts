/*
Papá Noel 🎅 está probando un nuevo simulador de trineo dentro de un laberinto en el taller. El laberinto se representa como una matriz de caracteres.

Tu tarea es implementar una función que determine si es posible llegar a la salida (E) partiendo desde la posición inicial (S).

Reglas del laberinto:

S: Posición inicial de Santa.
E: Salida del laberinto.
.: Camino libre.
#: Pared (bloquea el paso).
Movimientos permitidos: arriba, abajo, izquierda y derecha.
Solo hay una S y una sola E.
canEscape([
  ['S', '.', '#', '.'],
  ['#', '.', '#', '.'],
  ['.', '.', '.', '.'],
  ['#', '#', '#', 'E']
])
// → true

canEscape([
  ['S', '#', '#'],
  ['.', '#', '.'],
  ['.', '#', 'E']
])
// → false

canEscape([['S', 'E']])
// → true

canEscape([
  ['S', '.', '.', '.', '.'],
  ['#', '#', '#', '#', '.'],
  ['.', '.', '.', '.', '.'],
  ['.', '#', '#', '#', '#'],
  ['.', '.', '.', '.', 'E']
])
// → true

canEscape([
  ['S', '.', '.'],
  ['.', '.', '.'],
  ['#', '#', '#'],
  ['.', '.', 'E']
])
// → false
A tener en cuenta:

No necesitas devolver el camino, solo si es posible llegar.
Santa no puede salir de los límites del laberinto.
Consejo: Este problema se puede resolver de varias formas, pero algoritmos de búsqueda como BFS (búsqueda en anchura) o DFS (búsqueda en profundidad) son ideales para este tipo de retos.
*/

function canEscape(maze: string[][]): boolean {
    const rows = maze.length;
    const cols = maze[0].length;

    let startPos: [number, number] = [0, 0];

    // 1. Encontrar la posición inicial 'S'
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (maze[r][c] === 'S') {
                startPos = [r, c];
                break;
            }
        }
    }

    // 2. Inicializar la cola para BFS y un set de visitados
    const queue: [number, number][] = [startPos];
    const visited = new Set<string>();
    visited.add(`${startPos[0]},${startPos[1]}`);

    // Direcciones: Arriba, Abajo, Izquierda, Derecha
    const directions = [
        [-1, 0], [1, 0], [0, -1], [0, 1]
    ];

    // 3. Proceso de búsqueda
    while (queue.length > 0) {
        const [currR, currC] = queue.shift()!;

        // ¿Hemos llegado a la salida?
        if (maze[currR][currC] === 'E') return true;

        for (const [dr, dc] of directions) {
            const newR = currR + dr;
            const newC = currC + dc;

            // Validar límites, si es pared o si ya lo visitamos
            if (
                newR >= 0 && newR < rows &&
                newC >= 0 && newC < cols &&
                maze[newR][newC] !== '#' &&
                !visited.has(`${newR},${newC}`)
            ) {
                visited.add(`${newR},${newC}`);
                queue.push([newR, newC]);
            }
        }
    }

    // Si vaciamos la cola y no encontramos la 'E'
    return false;
}