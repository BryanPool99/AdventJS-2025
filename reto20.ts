/*
En el taller de Santa, los elfos están guardando regalos 🎁 en un almacén vertical. Los regalos se dejan caer uno a uno por una columna y se van apilando.

El almacén es una matriz con # regalos y . espacios vacíos. Debes crear una función dropGifts que reciba el estado del almacén y un array con las columnas donde se dejan caer los regalos.

Reglas de la caída:

El regalo cae por la columna indicada desde arriba.
Se coloca en la celda vacía (.) más baja de esa columna.
Si la columna está llena, el regalo se ignora.
dropGifts(
  [
    ['.', '.', '.'],
    ['.', '#', '.'],
    ['#', '#', '.']
  ],
  [0]
)
-------------------------------
[
  ['.', '.', '.'],
  ['#', '#', '.'],
  ['#', '#', '.']
]
-------------------------------

dropGifts(
  [
    ['.', '.', '.'],
    ['#', '#', '.'],
    ['#', '#', '#']
  ],
  [0, 2]
)
-------------------------------
[
  ['#', '.', '.'],
  ['#', '#', '#'],
  ['#', '#', '#']
]
-------------------------------

dropGifts(
  [
    ['.', '.', '.'],
    ['.', '.', '.'],
    ['.', '.', '.']
  ],
  [0, 1, 2]
)
-------------------------------
[
  ['.', '.', '.'],
  ['.', '.', '.'],
  ['#', '#', '#']
]
-------------------------------

dropGifts(
  [
    ['#', '#']
    ['#', '#']
  ],
  [0, 0]
)
-------------------------------
[
  ['#', '#']
  ['#', '#']
]
-------------------------------
*/

function dropGifts(warehouse: string[][], drops: number[]): string[][] {
  // Code here
  // Creamos una copia profunda para no mutar el original (buena práctica)
  const result = warehouse.map(row => [...row]);

  for (const colIndex of drops) {
    // Recorremos la columna desde la fila de abajo (length - 1) hacia arriba (0)
    for (let rowIndex = result.length - 1; rowIndex >= 0; rowIndex--) {
      if (result[rowIndex][colIndex] === '.') {
        result[rowIndex][colIndex] = '#';
        // Una vez que el regalo aterriza, dejamos de buscar en esta columna
        break;
      }
    }
  }

  return result;
}