(() => {//Patron modulo que sirve para encapsular el código y evitar conflictos de variables globales
    'use strict';
    
    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
          numeracion = ["2", "3", "4", "5", "6", "7", "8", "9", "10",'A', 'J', 'Q', 'K'];
    let puntosJugadores = []; 

    // Referencias al DOM
    const btnPedir = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevoJuego = document.querySelector('#btnNuevo');
    const ptsHTML = document.querySelectorAll('small'),
          divCartasJugadores = document.querySelectorAll('.divCartas');
    
    // ------------ Inicializar el juego ------------
    const inicializarJuego = (numJugadores = 2) => {
        console.clear();
        puntosJugadores = [];  
        deck = crearDeck();
        
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }

        btnPedir.disabled = false;
        btnDetener.disabled = false;

        divCartasJugadores.forEach(div => {
            div.innerHTML = '';
        });
        
        ptsHTML.forEach(elem => {
            elem.innerText = '0';
        });
    }


    // ------------ Crear el deck de cartas ------------
    const crearDeck = () => {
        deck = []; // Reiniciar el deck
        for (let tipo of tipos) {
            for (let numero of numeracion) {
                deck.push(numero + tipo);
            }
        }
        return _.shuffle(deck);
    }

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

        return (isNaN(valor)) ? 
            (valor === 'A') ? 11 : 10 
        : parseInt(valor); // As vale 11, J, Q, K valen 10, el resto su valor numérico
    }

    // ------------ Acumilar puntos del jugador ------------
    // Turno:0 Jugador; Ultimo: Computadora
    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] += valorCarta(carta);
        ptsHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const CrearCarta = (carta, turno) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `assests/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);
    }

    const DeterminarGanador = () => {
        const puntosJugador = puntosJugadores[0];
        const puntosComputadora = puntosJugadores[1];
        
        setTimeout(() => {
            if (puntosComputadora > 21) {
                alert('¡Ganaste! La computadora se pasó de 21');
            } else if (puntosJugador > 21) {
                alert('Perdiste, te pasaste de 21');
            } else if (puntosComputadora === puntosJugador) {
                alert('¡Empate!');
            } else if (puntosComputadora > puntosJugador) {
                alert('Perdiste, la computadora ganó');
            } else {
                alert('¡Ganaste!');
            }
        }, 100);
    }

    // ------------ EVENTOS DEL JUEGO ------------
     btnPedir.addEventListener('click', () => { 
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);
        CrearCarta(carta, 0);
        
        if (puntosJugador >= 21) { 
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }
    });

    const turnoComputadora = (puntosMinimos) => {
        let puntosComp;
        do {
            const carta = pedirCarta();
            puntosComp = acumularPuntos(carta, 1); // Usamos índice 1 para la computadora
            CrearCarta(carta, 1);
        } while (puntosComp < puntosMinimos && puntosMinimos <= 21);
        
        DeterminarGanador();
    }

    // ------------ Botón Detener ------------
     btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugadores[0]);
    });

    // ------------ Botón Nuevo Juego ------------
    btnNuevoJuego.addEventListener('click', () => {
        inicializarJuego();
    });

    return {
        nuevoJuego: inicializarJuego
    };

})(); // IIFE para evitar conflictos de variables globales

