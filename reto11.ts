/*
El grinch quiere robar los regalos de Navidad del almacén. Para ello necesita saber qué regalos no tienen vigilancia.

El almacén se representa como un array de strings (string[]), donde cada regalo (*) está protegido si su posición está junto a una cámara (#). Cada espacio vacío se representa con un punto (.).

Tu tarea es contar cuántos regalos están sin vigilancia, es decir, que no tienen ninguna cámara adyacente (arriba, abajo, izquierda o derecha).

Ten en cuenta: solo se considera como "adyacente" las 4 direcciones cardinales, no en diagonal.

Los regalos en las esquinas o bordes pueden estar sin vigilancia, siempre que no tengan cámaras directamente al lado.

findUnsafeGifts([
  '.*.',
  '*#*',
  '.*.'
]) // ➞ 0

// Todos los regalos están junto a una cámara

findUnsafeGifts([
  '...',
  '.*.',
  '...'
]) // ➞ 1

// Este regalo no tiene cámaras alrededor

findUnsafeGifts([
  '*.*',
  '...',
  '*#*'
]) // ➞ 2
// Los regalos en las esquinas superiores no tienen cámaras alrededor

findUnsafeGifts([
  '.....',
  '.*.*.',
  '..#..',
  '.*.*.',
  '.....'
]) // ➞ 4

// Los cuatro regalos no tienen cámaras, porque están en diagonal a la cámara
*/

function findUnsafeGifts(warehouse: string[]): number {
    let unsafeCount = 0;
    const rows = warehouse.length;
    if (rows === 0) return 0;
    const cols = warehouse[0].length;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (warehouse[i][j] === '*') {
                const hasCameraNearby =
                    (i > 0 && warehouse[i - 1][j] === '#') || // up
                    (i < rows - 1 && warehouse[i + 1][j] === '#') || // down
                    (j > 0 && warehouse[i][j - 1] === '#') || // left
                    (j < cols - 1 && warehouse[i][j + 1] === '#'); // right

                if (!hasCameraNearby) {
                    unsafeCount++;
                }
            }
        }
    }
    return unsafeCount;
}