/*
¡El almacén vertical de Santa se ha modernizado! Ahora, además de apilar los regalos, hay un robot 🤖 en el almacen que recoje los regalos si hay una fila completa.

El almacén es una matriz con # regalos y . espacios vacíos. Debes crear una función clearGifts que reciba el estado del almacén y un array con las columnas donde se dejan caer los regalos.

Reglas de la caída:

El regalo cae por la columna indicada desde arriba.
Se coloca en la celda vacía (.) más baja de esa columna.
Si la columna está llena, el regalo se ignora.
Regla del robot de limpieza:

Si al colocar un regalo, una fila se completa totalmente con regalos (#), esa fila desaparece.
Todas las filas que estaban por encima de la fila eliminada bajan una posición.
Al eliminarse una fila, aparece una nueva fila vacía (.) en la parte superior para mantener el tamaño del almacén.
clearGifts(
  [
    ['.', '.', '.'],
    ['.', '.', '.'],
    ['#', '.', '#']
  ],
  [1]
)

1. El regalo cae en la columna 1
2. La fila 2 se convierte en [# # #].
3. La fila 2 está completa, el robot la limpia.
6. Se añade una nueva fila vacía en la posición 0.

Resultado:
[
  ['.', '.', '.'],
  ['.', '.', '.'],
  ['.', '.', '.']
]

clearGifts(
  [
    ['.', '.', '#'],
    ['#', '.', '#'],
    ['#', '.', '#']
  ],
  [0, 1, 2]
)

1. El regalo cae en la columna 0
2. El regalo cae en la columna 1
3. La fila 2 se convierte en [# # #]
4. La fila 2 está completa, el robot la limpia

Por ahora queda así:
[
  ['.', '.', '.']
  ['#', '.', '#'],
  ['#', '.', '#'],
]

5. El regalo cae en la columna 2

Resultado:
[
  ['.', '.', '#'],
  ['#', '.', '#'],
  ['#', '.', '#']
]

*/

function clearGifts(warehouse: string[][], drops: number[]): string[][] {
    const rows = warehouse.length;
    const cols = warehouse[0].length;

    for (const dropCol of drops) {
        // 1. Encontrar la posición de caída (la más baja disponible)
        let targetRow = -1;
        for (let r = 0; r < rows; r++) {
            if (warehouse[r][dropCol] === '.') {
                targetRow = r;
            } else {
                // Como hay un regalo (#), ya no podemos bajar más
                break;
            }
        }

        // 2. Si la columna no estaba llena, colocamos el regalo
        if (targetRow !== -1) {
            warehouse[targetRow][dropCol] = '#';

            // 3. Revisar si la fila se completó
            // Usamos Every para verificar si todos los elementos son '#'
            const isRowFull = warehouse[targetRow].every(cell => cell === '#');

            if (isRowFull) {
                // 4. Robot de limpieza: Eliminamos la fila y bajamos las de arriba
                // Eliminamos la fila actual
                warehouse.splice(targetRow, 1);

                // Añadimos una nueva fila vacía al inicio (arriba)
                const emptyRow = new Array(cols).fill('.');
                warehouse.unshift(emptyRow);
            }
        }
    }

    return warehouse;
}
