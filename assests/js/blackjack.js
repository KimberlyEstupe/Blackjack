let deck = [];
const tipos = ['C', 'D', 'H', 'S']; // C: Corazones, D: Diamantes, H: Treboles, S: Picas
const numeracion = ["2", "3", "4", "5", "6", "7", "8", "9", "10",'A', 'J', 'Q', 'K']; // A: As, J: Jack, Q: Reina, K: Rey
let puntosJugador = 0;
let puntosComputadora = 0;

// Referencias a los botones del DOM
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const ptsHTML = document.querySelectorAll('small');
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');
const btnNuevoJuego = document.querySelector('#btnNuevo');

// ------------ Crear el deck de cartas ------------
const crearDeck = () => {
    for (let tipo of tipos) {
        for (let numero of numeracion) {
            deck.push(numero + tipo);
        }
    }

    deck = _.shuffle(deck); // Mezclar el deck usando lodash
    console.log(deck);
    return deck;
}
crearDeck();

// ------------ Pedir una carta del deck ------------
const pedirCarta = () => {    
    if (deck.length === 0) {
        throw 'No hay cartas en el deck';
    }
    return deck.pop();
}

// ------------ Valor de la carta ------------
const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1); // Obtener el valor de la carta (sin el tipo)
    let puntos = 0;

    return (isNaN(valor)) ? 
        (valor === 'A') ? 11 : 10 
    : parseInt(valor); // As vale 11, J, Q, K valen 10, el resto su valor numérico
}

// ------------ EVENTOS DEL JUEGO ------------
btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    puntosJugador += valorCarta(carta); 
    ptsHTML[0].innerText = puntosJugador;
    
    const imgCarta = document.createElement('img');
    imgCarta.src = `assests/cartas/${carta}.png`; // Ruta de la imagen de la carta
    imgCarta.classList.add('carta'); // Añadir clase para estilo
    divCartasJugador.append(imgCarta);
    
    if (puntosJugador > 21) {
        console.warn('Perdiste');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    } else if (puntosJugador === 21) {
        alert('¡21! ¡Ganaste!');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
    }
});

const turnoComputadora = (puntosMinimos) => {
    do{
        const carta = pedirCarta();
        puntosComputadora += valorCarta(carta);
        ptsHTML[1].innerText = puntosComputadora;

        // Mostrar la carta de la computadora
        const imgCarta = document.createElement('img');
        imgCarta.src = `assests/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasComputadora.append(imgCarta);
        if (puntosMinimos > 21) {
            break; // Si el jugador se pasó de 21, la computadora no juega
        }
    }while (puntosComputadora < puntosMinimos && puntosMinimos <= 21) ;  

    setTimeout(() => {
        if (puntosComputadora > 21) {
            alert('¡Ganaste! La computadora se pasó de 21');
        } else if (puntosComputadora === puntosMinimos) {
            alert('¡Empate!');
        } else if (puntosComputadora > puntosMinimos) {
            alert('Perdiste, la computadora ganó');
        } else if (puntosMinimos>21) {
            alert('Perdiste, la computadora ganó');
        } else {
            alert('¡Ganaste!');
        }        
    }, 100); // Esperar un segundo antes de evaluar el ganador

    
}

btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
});

btnNuevoJuego.addEventListener('click', () => {
    deck = [];
    crearDeck();    
    btnPedir.disabled = false;
    btnDetener.disabled = false;
    puntosJugador = 0;
    puntosComputadora = 0;
    ptsHTML[0].innerText = 0;
    ptsHTML[1].innerText = 0;
    divCartasJugador.innerHTML = '';
    divCartasComputadora.innerHTML = '';
    console.clear();
});