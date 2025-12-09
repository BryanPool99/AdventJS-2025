/*
Los elfos han construido un reno 🦌 robot aspirador (@) para limpiar un poco el taller de cara a las navidades.

El reno se mueve sobre un tablero para recoger cosas del suelo (*) y debe evitar obstáculos (#).

Recibirás dos parámetros:

board: un string que representa el tablero.
moves: un string con los movimientos: 'L' (izquierda), 'R' (derecha), 'U' (arriba), 'D' (abajo).
Reglas del movimiento:

Si el reno se sale del tablero o choca contra un obstáculo (#) → devuelve 'crash'.
Si el reno recoge algo del suelo (*) durante los movimientos → devuelve 'success'.
Si el reno no recoge nada ni se estrella → devuelve 'fail'.
Importante: Ten en cuenta que en el board la primera y última línea están en blanco y deben descartarse.

Ejemplo:

const board = `
.....
.*#.*
.@...
.....
`

moveReno(board, 'D')
// ➞ 'fail' -> se mueve pero no recoge nada

moveReno(board, 'U')
// ➞ 'success' -> recoge algo (*) justo encima

moveReno(board, 'RU')
// ➞ 'crash' -> choca contra un obstáculo (#)

moveReno(board, 'RRRUU')
// ➞ 'success' -> recoge algo (*)

moveReno(board, 'DD')
// ➞ 'crash' -> se choca con la parte de abajo del tablero

moveReno(board, 'UUU')
// ➞ 'success' -> recoge algo del suelo (*) y luego se choca por arriba

moveReno(board, 'RR')
// ➞ 'fail' -> se mueve pero no recoge nada
*/

type Board = string;
type Moves = string;
type Result = 'fail' | 'crash' | 'success';

function moveReno(board: Board, moves: Moves): Result {
    const grid: string[] = board.trim().split('\n');
    const height = grid.length;
    const width = grid[0]?.length || 0;

    let renoRow = -1;
    let renoCol = -1;

    // 1. Encontrar la posición inicial
    for (let r = 0; r < height; r++) {
        const c = grid[r].indexOf('@');
        if (c !== -1) {
            renoRow = r;
            renoCol = c;
            break;
        }
    }

    let hasCollectedStar = false; // Bandera para registrar éxito

    // 2. Simular los movimientos
    for (const move of moves) {
        let newRow = renoRow;
        let newCol = renoCol;

        // Calcular la nueva posición
        switch (move) {
            case 'U': newRow -= 1; break;
            case 'D': newRow += 1; break;
            case 'L': newCol -= 1; break;
            case 'R': newCol += 1; break;
            default: continue;
        }

        // 3. Comprobación de Crash (Prioridad alta)
        const isOutOfBounds = newRow < 0 || newRow >= height || newCol < 0 || newCol >= width;

        if (isOutOfBounds) {
            // El choque detiene la secuencia
            return hasCollectedStar ? 'success' : 'crash';
        }

        const newPosition = grid[newRow][newCol];

        if (newPosition === '#') {
            // Choque contra obstáculo también detiene la secuencia
            return hasCollectedStar ? 'success' : 'crash';
        }

        // 4. Comprobación de Success
        if (newPosition === '*') {
            hasCollectedStar = true;
            // No detenemos el bucle aquí, ya que puede haber más movimientos válidos,
            // pero el resultado final será al menos 'success'.
        }

        // El movimiento es válido, actualizamos la posición del reno.
        renoRow = newRow;
        renoCol = newCol;
    }

    // 5. Si el bucle termina sin un choque que lo detenga
    return hasCollectedStar ? 'success' : 'fail';
}