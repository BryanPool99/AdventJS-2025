/*
Al Polo Norte ha llegado ChatGPT y el elfo Sam Elfman está trabajando en una aplicación de administración de regalos y niños.

Para mejorar la presentación, quiere crear una función drawTable que reciba un array de objetos y lo convierta en una tabla de texto.

La tabla dibujada debe tener:

Cabecera con letras de columna (A, B, C…).
El contenido de la tabla son los valores de los objetos.
Los valores deben estar alineados a la izquierda.
Los campos dejan siempre un espacio a la izquierda.
Los campos dejan a la derecha el espacio necesario para alinear la caja.
La función recibe un segundo parámetro sortBy que indica el nombre del campo por el que se deben ordenar las filas. El orden será alfabético ascendente si los valores son strings y numérico ascendente si son números.

Mira el ejemplo para ver cómo debes dibujar la tabla:

drawTable(
  [
    { name: 'Charlie', city: 'New York' },
    { name: 'Alice', city: 'London' },
    { name: 'Bob', city: 'Paris' }
  ],
  'name'
)
// +---------+----------+
// | A       | B        |
// +---------+----------+
// | Alice   | London   |
// | Bob     | Paris    |
// | Charlie | New York |
// +---------+----------+

drawTable(
  [
    { gift: 'Book', quantity: 5 },
    { gift: 'Music CD', quantity: 1 },
    { gift: 'Doll', quantity: 10 }
  ],
  'quantity'
)
// +----------+----+
// | A        | B  |
// +----------+----+
// | Music CD | 1  |
// | Book     | 5  |
// | Doll     | 10 |
// +----------+----+
*/

type Data = Array<Record<string, string | number>>
type SortBy = string

function drawTable(data: Data, sortBy: SortBy): string {
    // 1. Identificar Columnas y Calcular Anchos Máximos
    // Obtener los nombres de las claves (columnas) de la primera fila.
    if (data.length === 0) return ''
    const columns = Object.keys(data[0])

    // Generar letras de cabecera: 'A', 'B', 'C', ...
    const columnHeaders = columns.map((_, index) => String.fromCharCode('A'.charCodeAt(0) + index))

    // 1. Corregido: Calcular el ancho máximo de cada columna.
    const columnWidths = columns.map((key, index) => {
        let maxWidth = 0;

        // 1. Encontrar la longitud máxima de los datos de la columna.
        data.forEach(row => {
            const value = String(row[key]);
            maxWidth = Math.max(maxWidth, value.length);
        });

        // 2. Considerar la longitud de la cabecera ('A', 'B', ...).
        maxWidth = Math.max(maxWidth, columnHeaders[index].length);

        // El ancho de la columna (W) es: Longitud Máxima del Contenido + 2 (1 de margen izq + 1 de margen der).
        return maxWidth + 2;
    });

    // 2. Ordenar los Datos
    const sortedData = [...data].sort((a, b) => {
        const valA = a[sortBy]
        const valB = b[sortBy]

        if (typeof valA === 'string' && typeof valB === 'string') {
            return valA.localeCompare(valB)
        }
        if (typeof valA === 'number' && typeof valB === 'number') {
            return valA - valB
        }
        return 0
    })

    // Función auxiliar para formatear una celda (Corregido).
    // width es el ancho total de la celda, incluyendo bordes virtuales.
    const formatCell = (content: string, width: number): string => {
        // padding es la cantidad de espacios a la derecha.
        // W - 1 (Espacio Izquierdo) - Longitud del Contenido.
        const padding = width - 1 - content.length;
        return ' ' + content + ' '.repeat(padding);
    }

    // 3. Formatear la Cabecera
    const headerCells = columnHeaders.map((header, index) => {
        return formatCell(header, columnWidths[index])
    })
    const headerRow = '|' + headerCells.join('|') + '|'

    // 4. Formatear las Filas de Datos
    const dataRows = sortedData.map(row => {
        const rowCells = columns.map((key, index) => {
            const value = String(row[key])
            return formatCell(value, columnWidths[index])
        })
        return '|' + rowCells.join('|') + '|'
    })

    // 5. Dibujar Separadores (Bordes)
    const drawSeparator = (): string => {
        const segments = columnWidths.map(width => {
            // Un segmento tiene '+' seguido de W guiones (W-1 repetidos + el primero).
            return '+' + '-'.repeat(width);
        });
        return segments.join('') + '+';
    }

    const separator = drawSeparator();

    // 6. Construir la Tabla Final
    const result = [
        separator,
        headerRow,
        separator,
        ...dataRows,
        separator
    ].join('\n');

    return result
}