/*
FÁCIL
En el Polo Norte han montado un panel de luces navideñas 🎄✨ para decorar el taller. Cada luz puede estar encendida con un color o apagada.

El panel se representa como una matriz donde cada celda puede ser:

'.' → luz apagada
'R' → luz roja
'G' → luz verde
Los elfos quieren saber si en el panel existe una línea de 4 luces del mismo color encendidas y alineadas (solo horizontal ↔ o vertical ↕). Las luces apagadas ('.') no cuentan.
hasFourLights([
  ['.', '.', '.', '.', '.'],
  ['R', 'R', 'R', 'R', '.'],
  ['G', 'G', '.', '.', '.']
])
// true → hay 4 luces rojas en horizontal

hasFourLights([
  ['.', 'G', '.', '.'],
  ['.', 'G', '.', '.'],
  ['.', 'G', '.', '.'],
  ['.', 'G', '.', '.']
])
// true → hay 4 luces verdes en vertical

hasFourLights([
  ['R', 'G', 'R'],
  ['G', 'R', 'G'],
  ['G', 'R', 'G']
])
// false → no hay 4 luces del mismo color seguidas
Nota: El tablero puede ser de cualquier tamaño. No hay diagonales.
*/

function hasFourLights(board: string[][]): boolean {
  const rows = board.length;
  const cols = board[0].length;

  // Regex que busca una letra (R o G) y que se repita 3 veces más
  // [RG] asegura que solo coincida con Red o Green, ignorando puntos o espacios
  const regex = /([RG])\1{3}/;

  // 1. Comprobar Horizontales
  for (const row of board) {
    if (regex.test(row.join(''))) return true;
  }

  // 2. Comprobar Verticales
  for (let c = 0; c < cols; c++) {
    let columnStr = '';
    for (let r = 0; r < rows; r++) {
      columnStr += board[r][c];
    }
    if (regex.test(columnStr)) return true;
  }

  return false;
}