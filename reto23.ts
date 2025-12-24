/*
Papá Noel 🎅 tiene que repartir regalos en un pueblo representado como un mapa en cuadrícula.

Cada celda del mapa puede ser:

'S' → Punto de partida de Papá Noel
'G' → Casa que debe recibir un regalo
'.' → Camino libre
'#' → Obstáculo (no se puede pasar)
Papá Noel realiza entregas independientes para cada regalo. Sale de 'S', entrega el regalo en una casa 'G' y vuelve inmediatamente a 'S' para recoger el siguiente. Sin embargo, para este reto, solo queremos calcular la suma de las distancias mínimas de ida desde 'S' hasta cada casa 'G'.

Tu tarea

Escribe la función minStepsToDeliver(map) que devuelva el número total de pasos necesarios para llegar a todas las casas con regalos desde la posición inicial.

Ten en cuenta:

Siempre se parte de la posición inicial 'S'.
Para cada regalo, calcula la distancia mínima desde 'S' hasta esa casa 'G'.
No puedes atravesar obstáculos ('#').
Si alguna casa con regalo es inalcanzable, la función debe devolver -1.
minStepsToDeliver([
  ['S', '.', 'G'],
  ['.', '#', '.'],
  ['G', '.', '.']
])
// Resultado: 4


Explicación:
- Distancia mínima de S (0,0) a G (0,2): 2 pasos
- Distancia mínima de S (0,0) a G (2,0): 2 pasos
- Total: 2 + 2 = 4


minStepsToDeliver([
  ['S', '#', 'G'],
  ['#', '#', '.'],
  ['G', '.', '.']
])
// Resultado: -1
// (La casa en (0,2) es inalcanzable por los obstáculos)

minStepsToDeliver([['S', 'G']])
// Resultado: 1
Reglas

El mapa siempre contiene exactamente una 'S'.
Puede haber 0 o más casas con regalos ('G').
No importa el orden de las entregas, ya que cada una se mide de forma independiente desde 'S'.
Debes devolver la suma de las distancias mínimas de ida.
Pista

Calcula la distancia más corta desde 'S' hasta cada 'G' (puedes usar un algoritmo de búsqueda en anchura o BFS).
Si algún regalo no tiene camino posible, el resultado total es -1.
*/

function minStepsToDeliver(map: string[][]): number {
  const rows = map.length;
  const cols = map[0].length;
  
  let startX = 0, startY = 0;
  let totalGifts = 0;

  // 1. Encontrar 'S' y contar cuántas 'G' hay
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (map[r][c] === 'S') {
        startX = r;
        startY = c;
      } else if (map[r][c] === 'G') {
        totalGifts++;
      }
    }
  }

  // Si no hay regalos, la distancia es 0
  if (totalGifts === 0) return 0;

  // 2. Preparar BFS
  const queue: [number, number, number][] = [[startX, startY, 0]]; // [fila, columna, distancia]
  const visited = new Set<string>();
  visited.add(`${startX},${startY}`);

  let foundGifts = 0;
  let totalDistance = 0;

  // Direcciones: arriba, abajo, izquierda, derecha
  const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

  while (queue.length > 0) {
    const [r, c, dist] = queue.shift()!;

    // Si la celda actual es un regalo, sumamos la distancia
    if (map[r][c] === 'G') {
      foundGifts++;
      totalDistance += dist;
    }

    // Explorar vecinos
    for (const [dr, dc] of directions) {
      const nr = r + dr;
      const nc = c + dc;

      // Validar límites, obstáculos y si ya fue visitado
      if (
        nr >= 0 && nr < rows && 
        nc >= 0 && nc < cols && 
        map[nr][nc] !== '#' && 
        !visited.has(`${nr},${nc}`)
      ) {
        visited.add(`${nr},${nc}`);
        queue.push([nr, nc, dist + 1]);
      }
    }
  }

  // 3. Verificar si llegamos a todas las casas
  return foundGifts === totalGifts ? totalDistance : -1;
}