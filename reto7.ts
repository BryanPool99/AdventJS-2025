/*
¡Es hora de decorar el árbol de Navidad 🎄! Escribe una función que reciba:

height → la altura del árbol (número de filas).
ornament → el carácter del adorno (por ejemplo, "o" o "@").
frequency → cada cuántas posiciones de asterisco aparece el adorno.
El árbol se dibuja con asteriscos *, pero cada frequency posiciones, el asterisco se reemplaza por el adorno.

El conteo de posiciones empieza en 1, desde la copa hasta la base, de izquierda a derecha. Si frequency es 2, los adornos aparecen en las posiciones 2, 4, 6, etc.

El árbol debe estar centrado y tener un tronco # de una línea al final.

🧩 Ejemplos
drawTree(5, 'o', 2)
//     *
//    o*o
//   *o*o*
//  o*o*o*o
// *o*o*o*o*
//     #

drawTree(3, '@', 3)
//   *
//  *@*
// *@**@
//   #

drawTree(4, '+', 1)
//    +
//   +++
//  +++++
// +++++++
//    #
*/

function drawTree(height: number, ornament: string, frequency: number): string {
  let tree = "";
  let positionCounter = 1;
  for (let i = 0; i < height; i++) {
    const numEspacios: number = height - 1 - i;
    const numAsteriscosTotal: number = 2 * i + 1;
    
    let baseCopa: string = "*".repeat(numAsteriscosTotal);

    let copaFila: string = "";
    
    for (let j = 0; j < numAsteriscosTotal; j++) {
      if (positionCounter % frequency === 0) {
        copaFila += ornament; 
      } else {
        copaFila += baseCopa[j];
      }
      
      positionCounter++;
    }

    const espacios: string = " ".repeat(numEspacios);
    tree += espacios + copaFila + "\n";
  }

  const numEspaciosTronco: number = height - 1;
  const tronco: string = " ".repeat(numEspaciosTronco) + "#";
  
  tree += tronco;

  return tree;
}

console.log(drawTree(5, 'o', 2));
