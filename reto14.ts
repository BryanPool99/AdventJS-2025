/*
En el Polo Norte, los elfos han simplificado su sistema de almacenamiento para evitar errores.
Ahora guardan los regalos en un objeto mágico con profundidad limitada, donde cada valor aparece una sola vez.

Santa necesita una forma rápida de saber qué camino de claves debe seguir para encontrar un regalo concreto.

Tu tarea es escribir una función que, dado un objeto y un valor, devuelva el array de claves que hay que recorrer para llegar a ese valor.

Reglas:

El objeto tiene como máximo 3 niveles de profundidad.
El valor a buscar aparece como mucho una vez.
El objeto solo contiene otros objetos y valores primitivos (strings, numbers, booleans).
Si el valor no existe, devuelve un array vacío.
Ejemplos:

const workshop = {
  storage: {
    shelf: {
      box1: 'train',
      box2: 'switch'
    },
    box: 'car'
  },
  gift: 'doll'
}

findGiftPath(workshop, 'train')
// ➜ ['storage', 'shelf', 'box1']

findGiftPath(workshop, 'switch')
// ➜ ['storage', 'shelf', 'box2']

findGiftPath(workshop, 'car')
// ➜ ['storage', 'box']

findGiftPath(workshop, 'doll')
// ➜ ['gift']

findGiftPath(workshop, 'plane')
// ➜ []
*/

type Gift = string | number | boolean
type Workshop = Record<string, any>
type Path = string[]

function findGiftPath(workshop: Workshop, gift: Gift): Path {
    // Nivel 1
    for (const key1 in workshop) {
        if (workshop.hasOwnProperty(key1)) {
            const value1 = workshop[key1];

            // Caso 1: Regalo encontrado en el Nivel 1
            if (value1 === gift) {
                return [key1];
            }

            // Si es un objeto, pasamos al Nivel 2
            if (typeof value1 === 'object' && value1 !== null) {

                // Nivel 2
                for (const key2 in value1) {
                    if (value1.hasOwnProperty(key2)) {
                        const value2 = value1[key2];

                        // Caso 2: Regalo encontrado en el Nivel 2
                        if (value2 === gift) {
                            return [key1, key2];
                        }

                        // Si es un objeto, pasamos al Nivel 3
                        if (typeof value2 === 'object' && value2 !== null) {

                            // Nivel 3 (El nivel más profundo permitido)
                            for (const key3 in value2) {
                                if (value2.hasOwnProperty(key3)) {
                                    const value3 = value2[key3];

                                    // Caso 3: Regalo encontrado en el Nivel 3
                                    if (value3 === gift) {
                                        return [key1, key2, key3];
                                    }
                                }
                            }
                            // Después de Nivel 3, continuamos en el Nivel 2
                        }
                    }
                }
                // Después de Nivel 2, continuamos en el Nivel 1
            }
        }
    }

    // Si el regalo no se encuentra después de revisar los 3 niveles
    return [];
}