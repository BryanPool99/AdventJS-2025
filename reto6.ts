/*
En el taller de Santa, los elfos han encontrado una montaña de guantes mágicos totalmente desordenados. Cada guante viene descrito por dos valores:

hand: indica si es un guante izquierdo (L) o derecho (R)
color: el color del guante (string)
Tu tarea es ayudarles a emparejar guantes: Un par válido es un guante izquierdo y uno derecho del mismo color.

Debes devolver una lista con los colores de todos los pares encontrados. Ten en cuenta que puede haber varios pares del mismo color.

🧩 Ejemplos
const gloves = [
  { hand: 'L', color: 'red' },
  { hand: 'R', color: 'red' },
  { hand: 'R', color: 'green' },
  { hand: 'L', color: 'blue' },
  { hand: 'L', color: 'green' }
]

matchGloves(gloves)
// ["red", "green"]

const gloves2 = [
  { hand: 'L', color: 'gold' },
  { hand: 'R', color: 'gold' },
  { hand: 'L', color: 'gold' },
  { hand: 'L', color: 'gold' },
  { hand: 'R', color: 'gold' }
]

matchGloves(gloves2)
// ["gold", "gold"]

const gloves3 = [
  { hand: 'L', color: 'red' },
  { hand: 'R', color: 'green' },
  { hand: 'L', color: 'blue' }
]

matchGloves(gloves3)
// []
*/

type Glove = { hand: 'L' | 'R'; color: string }

function matchGloves(gloves: Glove[]): string[] {
  const countsByColor = gloves.reduce((map, glove) => {
    if (!map.has(glove.color)) {
      map.set(glove.color, { L: 0, R: 0 });
    }
    map.get(glove.color)![glove.hand]++;

    return map;
  }, new Map<string, { L: number, R: number }>());

  const matchedColors: string[] = [];

  for (const [color, counts] of countsByColor.entries()) {
    const pairsToMake = Math.min(counts.L, counts.R);
    for (let i = 0; i < pairsToMake; i++) {
      matchedColors.push(color);
    }
  }

  return matchedColors;
}

const gloves: Glove[] = [
  { hand: 'L', color: 'red' },
  { hand: 'R', color: 'red' },
  { hand: 'R', color: 'green' },
  { hand: 'L', color: 'blue' },
  { hand: 'L', color: 'green' }
]

matchGloves(gloves)