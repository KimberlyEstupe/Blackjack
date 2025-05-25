let deck = [];
const tipos = ['C', 'D', 'H', 'S']; // C: Corazones, D: Diamantes, H: Treboles, S: Picas
const numeracion = ["2", "3", "4", "5", "6", "7", "8", "9", "10",'A', 'J', 'Q', 'K']; // A: As, J: Jack, Q: Reina, K: Rey

// ------------ Crear el deck de cartas ------------
const crearDeck = () => {
    deck = [];
    for (let tipo of tipos) {
        for (let numero of numeracion) {
            deck.push(numero + tipo);
        }
    }

    deck = _.shuffle(deck); // Mezclar el deck usando lodash
    return deck;
}
crearDeck();

// ------------ Pedir una carta del deck ------------
const pedirCarta = () => {    
    if (deck.length === 0) {
        throw 'No hay cartas en el deck';
    }
    const carta=deck.pop();
    return carta
}

//pedirCarta();
// ------------ Valor de la carta ------------
const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1); // Obtener el valor de la carta (sin el tipo)
    let puntos = 0;

    return (isNaN(valor)) ? 
        (valor === 'A') ? 11 : 10 
    : parseInt(valor); // As vale 11, J, Q, K valen 10, el resto su valor numérico
}
console.log(valorCarta(pedirCarta())); // 10
