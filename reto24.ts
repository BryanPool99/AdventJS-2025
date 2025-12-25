/*
En el Polo Norte, los elfos tienen dos árboles binarios mágicos que generan energía 🌲🌲 para mantener encendida la estrella navideña ⭐️. Sin embargo, para que funcionen correctamente, los árboles deben estar en perfecta sincronía como espejos 🪞.

Dos árboles binarios son espejos si:

Las raíces de ambos árboles tienen el mismo valor.
Cada nodo del primer árbol debe tener su correspondiente nodo en la posición opuesta en el segundo árbol.
Y el árbol se representa con tres propiedades value, left y right. Dentro de estas dos últimas va mostrando el resto de ramas (si es que tiene):

const tree = {
  value: '⭐️',
  left: {
    value: '🎅'
    // left: {...}
    // right: { ... }
  },
  right: {
    value: '🎁'
    // left: { ... }
    // right: { ...&nbsp;}
  }
}
Santa necesita tu ayuda para verificar si los árboles están sincronizados para que la estrella pueda seguir brillando. Debes devolver un array donde la primera posición indica si los árboles están sincronizados y la segunda posición devuelve el valor de la raíz del primer árbol.

const tree1 = {
  value: '🎄',
  left: { value: '⭐' },
  right: { value: '🎅' }
}

const tree2 = {
  value: '🎄',
  left: { value: '🎅' }
  right: { value: '⭐' },
}

isTreesSynchronized(tree1, tree2) // [true, '🎄']


  tree1          tree2
   🎄              🎄
  / \             / \
⭐   🎅         🎅   ⭐


const tree3 = {
  value: '🎄',
  left: { value: '🎅' },
  right: { value: '🎁' }
}

isTreesSynchronized(tree1, tree3) // [false, '🎄']

const tree4 = {
  value: '🎄',
  left: { value: '⭐' },
  right: { value: '🎅' }
}

isTreesSynchronized(tree1, tree4) // [false, '🎄']

isTreesSynchronized(
  { value: '🎅' },
  { value: '🧑‍🎄' }
) // [false, '🎅']
*/

function isTreesSynchronized(
    tree1: { value: string; left?: any; right?: any } | undefined,
    tree2: { value: string; left?: any; right?: any } | undefined
): [boolean, string] {
    // Caso base: ambos árboles son undefined, están sincronizados
    if (!tree1 && !tree2) return [true, ""];

    // Si uno no existe o los valores de las raíces son diferentes, no hay sincronía
    if (!tree1 || !tree2 || tree1.value !== tree2.value) {
        return [false, tree1?.value ?? ""];
    }

    // Comparamos recursivamente:
    // El hijo izquierdo de tree1 debe ser espejo del hijo derecho de tree2
    const [leftSync] = isTreesSynchronized(tree1.left, tree2.right);

    // El hijo derecho de tree1 debe ser espejo del hijo izquierdo de tree2
    const [rightSync] = isTreesSynchronized(tree1.right, tree2.left);

    // Los árboles están sincronizados si ambas ramas (cruzadas) lo están
    const synchronized = leftSync && rightSync;

    return [synchronized, tree1.value];
}