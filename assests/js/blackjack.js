let deck = [];
const tipos = ['C', 'D', 'H', 'S']; // C: Corazones, D: Diamantes, H: Treboles, S: Picas
const numeracion = ["2", "3", "4", "5", "6", "7", "8", "9", "10",'A', 'J', 'Q', 'K']; // A: As, J: Jack, Q: Reina, K: Rey

const crearDeck = () => {
    deck = [];
    for (let tipo of tipos) {
        for (let numero of numeracion) {
            deck.push(numero + tipo);
        }
    }

    console.log(deck);
    deck = _.shuffle(deck); // Mezclar el deck usando lodash
    console.log(deck);
    return deck;
}

crearDeck();
const pedirCarta = () => {
    if (deck.length === 0) {
        throw 'No hay cartas en el deck';
    }
    return deck.pop();
}