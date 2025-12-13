/*
Dos elfos están jugando una batalla por turnos. Cada uno tiene un mazo de movimientos que se representan como un string donde cada carácter es una acción.

A Ataque normal: causa 1 punto de daño si no es bloqueado
B Bloqueo: bloquea un ataque normal (A)
F Ataque fuerte: causa 2 puntos de daño, no puede ser bloqueado
Ambos elfos comienzan con 3 puntos de vida. El primer elfo que llegue a 0 puntos de vida o menos pierde y la batalla termina inmediatamente (no se siguen procesando más movimientos).

Reglas por ronda

Si ambos usan ataque (A o F), ambos reciben daño según el tipo.
B bloquea A, pero no bloquea F.
Todo se resuelve simultáneamente.
Tu tarea

Devuelve el resultado de la batalla como un número:

1 → si el Elfo 1 gana
2 → si el Elfo 2 gana
0 → si empatan (ambos llegan a 0 a la vez o terminan con la misma vida)
elfBattle('A', 'B')
// Ronda 1: A vs B -> Elfo 2 bloquea
// Resultado: Elfo 1 = 3 de vida
//            Elfo 2 = 3 de vida
// → 0

elfBattle('F', 'B')
// Ronda 1: F vs B -> Elfo 2 recibe 2 de daño (F no se bloquea)
// Resultado: Elfo 1 = 3 de vida
//            Elfo 2 = 1 de vida
// → 1

elfBattle('AAB', 'BBA')
// R1: A vs B → Elfo 2 bloquea
// R2: A vs B → Elfo 2 bloquea
// R3: B vs A → Elfo 1 bloquea
// Resultado: Elfo 1 = 3, Elfo 2 = 3
// → 0

elfBattle('AFA', 'BBA')
// R1: A vs B → Elfo 2 bloquea
// R2: F vs B → Elfo 2 recibe 2 de daño (F no se bloquea)
// R3: A vs A → ambos -1
// Resultado: Elfo 1 = 2, Elfo 2 = 0
// → 1

elfBattle('AFAB', 'BBAF')
// R1: A vs B → Elfo 2 bloquea
// R2: F vs B → Elfo 2 recibe 2 de daño (F no se bloquea)
// R3: A vs A → ambos -1 → Elfo 2 llega a 0 ¡Batalla termina!
// R4: no se juega, ya que Elfo 2 no tiene vida
// → 1

elfBattle('AA', 'FF')
// R1: A vs F → Elfo 1 -2, Elfo 2 -1
// R2: A vs F → Elfo 1 -2, Elfo 2 -1 → Elfo 1 llega a -1
// → 2
*/

function elfBattle(elf1: string, elf2: string): number {
    let vida1 = 3;
    let vida2 = 3;
    let ronda = 0;

    // La batalla continúa mientras ambos tengan movimientos Y ambos tengan vida > 0
    while (ronda < elf1.length && ronda < elf2.length && vida1 > 0 && vida2 > 0) {
        const mov1 = elf1[ronda];
        const mov2 = elf2[ronda];

        let dañoAElfo1 = 0;
        let dañoAElfo2 = 0;

        // 1. Calcular el daño que el Elfo 1 inflige al Elfo 2
        if (mov1 === 'A' && mov2 !== 'B') {
            dañoAElfo2 = 1;
        } else if (mov1 === 'F') {
            dañoAElfo2 = 2;
        }

        // 2. Calcular el daño que el Elfo 2 inflige al Elfo 1
        if (mov2 === 'A' && mov1 !== 'B') {
            dañoAElfo1 = 1;
        } else if (mov2 === 'F') {
            dañoAElfo1 = 2;
        }

        // 3. Aplicar el daño SIMULTÁNEAMENTE
        vida1 -= dañoAElfo1;
        vida2 -= dañoAElfo2;

        ronda++;
    }

    // --- 4. Determinar el ganador/resultado ---

    const elfo1Pierde = vida1 <= 0;
    const elfo2Pierde = vida2 <= 0;

    if (elfo1Pierde && elfo2Pierde) {
        // Empate por KO doble
        return 0;
    } else if (elfo1Pierde) {
        // Elfo 1 pierde por KO, Elfo 2 gana
        return 2;
    } else if (elfo2Pierde) {
        // Elfo 2 pierde por KO, Elfo 1 gana
        return 1;
    } else {
        // Batalla termina porque se acabaron los movimientos (ambos con vida > 0)
        if (vida1 > vida2) {
            return 1; // Gana Elfo 1 por tener más vida
        } else if (vida2 > vida1) {
            return 2; // Gana Elfo 2 por tener más vida
        } else {
            return 0; // Empate por tener la misma vida
        }
    }
}