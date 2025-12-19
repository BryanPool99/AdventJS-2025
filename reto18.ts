/*
El panel de luces navideñas 🎄✨ del taller ha sido un éxito total. Pero los elfos quieren ir un paso más allá: ahora quieren detectar si hay una línea de 4 luces del mismo color también en diagonal.

El panel sigue siendo una matriz donde cada celda puede ser:

'.' → luz apagada
'R' → luz roja
'G' → luz verde
Ahora tu función debe devolver true si existe una línea de 4 luces del mismo color encendidas y alineadas, ya sea horizontal ↔, vertical ↕ o diagonal ↘↙.

hasFourInARow([
  ['R', '.', '.', '.'],
  ['.', 'R', '.', '.'],
  ['.', '.', 'R', '.'],
  ['.', '.', '.', 'R']
])
// true → hay 4 luces rojas en diagonal ↘

hasFourInARow([
  ['.', '.', '.', 'G'],
  ['.', '.', 'G', '.'],
  ['.', 'G', '.', '.'],
  ['G', '.', '.', '.']
])
// true → hay 4 luces verdes en diagonal ↙

hasFourInARow([
  ['R', 'R', 'R', 'R'],
  ['G', 'G', '.', '.'],
  ['.', '.', '.', '.'],
  ['.', '.', '.', '.']
])
// true → hay 4 luces rojas en horizontal

hasFourInARow([
  ['R', 'G', 'R'],
  ['G', 'R', 'G'],
  ['G', 'R', 'G']
])
// false → no hay 4 luces del mismo color seguidas
Nota: El tablero puede ser de cualquier tamaño.
*/

function hasFourInARow(board: string[][]): boolean {
  const rows = board.length;
  const cols = board[0].length;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const color = board[r][c];

      // Si la celda está vacía, no comprobamos nada
      if (color === '.') continue;

      // 1. Horizontal (→)
      if (c + 3 < cols &&
          color === board[r][c + 1] &&
          color === board[r][c + 2] &&
          color === board[r][c + 3]) return true;

      // 2. Vertical (↓)
      if (r + 3 < rows &&
          color === board[r + 1][c] &&
          color === board[r + 2][c] &&
          color === board[r + 3][c]) return true;

      // 3. Diagonal hacia abajo-derecha (↘)
      if (r + 3 < rows && c + 3 < cols &&
          color === board[r + 1][c + 1] &&
          color === board[r + 2][c + 2] &&
          color === board[r + 3][c + 3]) return true;

      // 4. Diagonal hacia abajo-izquierda (↙)
      if (r + 3 < rows && c - 3 >= 0 &&
          color === board[r + 1][c - 1] &&
          color === board[r + 2][c - 2] &&
          color === board[r + 3][c - 3]) return true;
    }
  }

  return false;
}