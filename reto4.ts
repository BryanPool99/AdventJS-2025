/*
Los elfos han encontrado el código cifrado que protege la puerta del taller de Santa 🔐. El PIN tiene 4 dígitos, y está escondido dentro de bloques como estos:

[1++][2-][3+][<]
Escribe una función que descifre el PIN a partir del código.

El código está formado por bloques entre corchetes [...] y cada bloque genera un dígito del PIN.

Un bloque normal tiene la forma [nOP...], donde n es un número (0-9) y después puede haber una lista de operaciones (opcionales).

Las operaciones se aplican en orden al número y son:

+ suma 1
- resta 1
El resultado siempre es un dígito (aritmética mod 10), por ejemplo 9 + 1 → 0 y 0 - 1 → 9.

También existe el bloque especial [<], que repite el dígito del bloque anterior.

Si al final hay menos de 4 dígitos, se debe devolver null.

🧩 Ejemplos
decodeSantaPin('[1++][2-][3+][<]')
// "3144"

decodeSantaPin('[9+][0-][4][<]')
// "0944"

decodeSantaPin('[1+][2-]')
// null (solo 2 dígitos)
*/

function decodeSantaPin(code: string): string | null {
    // 1. Extracción de Bloques
    const blocks = code.match(/\[.*?\]/g);

    if (!blocks || blocks.length < 4) {
        return null;
    }

    let pinResult: string = "";
    let lastDigit: number = -1; 

    // 2. Procesamiento Iterativo
    for (let i = 0; i < blocks.length && pinResult.length < 4; i++) {
        const block = blocks[i];
        const content = block.slice(1, -1); // '1++', '2-', '3+', '<'

        if (content === '<') {
            // Bloque Especial [<]
            if (lastDigit !== -1) {
                pinResult += lastDigit.toString();
            }
        
        } else {
            // Bloque Normal [nOP...]
            
            // 2a. Extracción de 'n' y Operaciones
            let currentDigit = parseInt(content.charAt(0), 10);
            const operations = content.substring(1); 
            
            // Simplificación: Contar las operaciones
            // Usa una RegEx simple para contar el número de '+' y '-'
            const countPlus = (operations.match(/\+/g) || []).length;
            const countMinus = (operations.match(/\-/g) || []).length;
            
            // Calcular el cambio total
            let totalChange = countPlus - countMinus;

            // 2b. Aplicación de Aritmética Modular en un solo paso
            
            // Aseguramos que el cambio total sea positivo sumando un múltiplo de 10
            // y luego aplicamos el módulo 10.
            currentDigit = (currentDigit + totalChange);
            
            // Para asegurar el resultado mod 10 y manejar números negativos (ej. 1 - 2 = -1)
            currentDigit = ((currentDigit % 10) + 10) % 10;
            
            // 2c. Actualización
            pinResult += currentDigit.toString();
            lastDigit = currentDigit;
        }
    }

    // 3. Verificación Final
    return pinResult.length === 4 ? pinResult : null;
}
