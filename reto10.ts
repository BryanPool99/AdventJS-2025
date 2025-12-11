/*
🎄 Profundidad de Magia Navideña
En el Polo Norte, Santa Claus está revisando las cartas mágicas 📩✨ que recibe de los niños de todo el mundo. Estas cartas usan un antiguo lenguaje navideño en el que los corchetes [ y ] representan la intensidad del deseo.

Cuanto más profunda sea la anidación de los corchetes, más fuerte es el deseo. Tu misión es averiguar la máxima profundidad en la que se anidan los [].

Pero ¡cuidado! Algunas cartas pueden estar mal escritas. Si los corchetes no están correctamente balanceados (si se cierra antes de abrir, sobran cierres o faltan cierres), la carta es inválida y debes devolver -1.

maxDepth('[]') // -> 1
maxDepth('[[]]') // -> 2
maxDepth('[][]') // -> 1
maxDepth('[[][]]') // -> 2
maxDepth('[[[]]]') // -> 3
maxDepth('[][[]][]') // -> 2

maxDepth('][') // -> -1 (cierra antes de abrir)
maxDepth('[[[') // -> -1 (faltan cierres)
maxDepth('[]]]') // -> -1 (sobran cierres)
maxDepth('[][][') // -> -1 (queda uno sin cerrar)
*/

function maxDepth(s: string): number {
    let currentDepth = 0; // Contador de la profundidad actual
    let maxDepth = 0;     // Máxima profundidad encontrada

    // Recorremos la cadena carácter por carácter
    for (let i = 0; i < s.length; i++) {
        const char = s[i];

        if (char === '[') {
            // 1. Encontramos apertura: Aumentamos la profundidad
            currentDepth++;

            // 2. Actualizamos la máxima profundidad
            if (currentDepth > maxDepth) {
                maxDepth = currentDepth;
            }
        } else if (char === ']') {
            // 3. Encontramos cierre: Disminuimos la profundidad
            currentDepth--;

            // 4. Validación: Error si se cierra antes de abrir (sobran cierres)
            // Si currentDepth es negativo, la carta es inválida.
            if (currentDepth < 0) {
                return -1;
            }
        }
        // Nota: Ignoramos cualquier otro carácter que no sea '[' o ']'
    }

    // 5. Validación Final: Error si quedan corchetes sin cerrar al terminar
    // Si currentDepth es > 0, faltan cierres.
    if (currentDepth !== 0) {
        return -1;
    }

    // 6. Si pasamos todas las validaciones, devolvemos la máxima profundidad
    return maxDepth;
}