// Objeto para el historico
let historico = { jugador: 0, ordenador: 0, empate: 0 };
// Variable para ver si están o no las trampas activadas
let trampasActivadas = false;



// Función principal que mostrará lo que a elegido el usuario y el ordenador
function jugar(eleccionJugador) {
    // Array con las opciones posibles para despues poder elegir una aleatoria para el ordenador
    const opciones = ["piedra", "papel", "tijeras"];
    // Declaramos la elección del ordenador
    let eleccionOrdenador;

    // Si las trampas estan activadas
    if (trampasActivadas) {
        // Llamaremos a la funcion trampa
        eleccionOrdenador = trampa(eleccionJugador);
    } else {
        // Si no elegiremos una opción aleatoria
        eleccionOrdenador = opciones[Math.floor(Math.random() * 3)];
    }

    // Inicializamos variable que llamará a la función obtenerResultado para guardar quien a ganado o si han quedado empate en esa tirada
    const resultado = obtenerResultado(eleccionJugador, eleccionOrdenador);

    // Incrementamos 1 en el historico para el que haya salido
    historico[resultado]++;

    // Cambiamos la elección del jugador al codigo unicode para mostrar el emoji en pantalla
    switch(eleccionJugador) {
        case "piedra": eleccionJugador = "🗿";
            break;
        
        case "papel": eleccionJugador = "&#129531;";
            break;

        case "tijeras": eleccionJugador = "&#9986;";
            break;
    }

    // Cambiamos la elección del ordenador al codigo unicode para mostrar el emoji en pantalla
    switch(eleccionOrdenador) {
        case "piedra": eleccionOrdenador = "🗿";
            break;
        
        case "papel": eleccionOrdenador = "&#129531;";
            break;

        case "tijeras": eleccionOrdenador = "&#9986;";
            break;
    }

    // Creamos el trozo de código que añadiremos al html
    let html = "<div class='resultado'><p>Usuario:</p><p>" + eleccionJugador + "</p></div>";
    html += "<div class='resultado'><p>Ordenador:</p><p>" + eleccionOrdenador + "</p></div>"

    document.getElementById("resultado").innerHTML = html;
}

// Función que nos devolverá empate, si es que han empatado, o quien ha ganado
function obtenerResultado(jugador, ordenador) {
    if (jugador == ordenador) {
        return 'empate';
    } else if (
        (jugador == "piedra" && ordenador == "tijeras") ||
        (jugador == "papel" && ordenador == "piedra") ||
        (jugador == "tijeras" && ordenador == "papel")
    ) {
        return "jugador";
    } else {
        return "ordenador";
    }
}







// Función que será llamada cuando se pulse el botón de trampas y lo activará o desactivará
function hacerTrampas() {
    // Invierte el valor, por lo que si teniamos true, se cambia a false y viceversa
    trampasActivadas = !trampasActivadas;
    let estado = "";

    if (trampasActivadas) {
        estado = "Activado";
    } else {
        estado = "Desactivado";
    }

    document.getElementById("btnTrampas").innerHTML = "Trampas: " + estado;
}

// Función que se encargará de hacer la elección del ordenador para que gane o empate el 80%
function trampa(eleccionJugador) {
    const opciones = ["piedra", "papel", "tijeras"];

    // Calculamos el máximo de victorias que podría tener el jugador
    const totalJugadas = historico.jugador + historico.ordenador + historico.empate;
    const maxVictoriasJugador = (totalJugadas * 20) / 100;

    // Si el máximo es menor, haremos que gane el ordenador
    if (maxVictoriasJugador <= historico.jugador) {

        switch(eleccionJugador) {
        case "piedra": return "papel";
            break;
        
        case "papel": return "tijeras";
            break;

        case "tijeras": return "piedra";
            break;
        }

    // Si no, el ordenador elegirá una opción aleatoria
    } else {
        return opciones[Math.floor(Math.random() * 3)];
    }
}





// Función que se ejcecutará cuando se pulse el botón fin
function terminarJuego() {
    // Calculamos los porcentajes de las victorias de cada uno
    const totalJuegos = historico.jugador + historico.ordenador + historico.empate;
    const porcentajeJugador = (historico.jugador / totalJuegos) * 100;
    const porcentajeComputadora = (historico.ordenador / totalJuegos) * 100;

    // Mostramos el histórico y los porcentajes
    let historicoHTML = "<h2>RESULTADOS</h2><h3>Historico</h3><p class='historico'>Jugador: <b>" + historico.jugador + "</b> | CPU: <b>" + historico.ordenador + "</b> | Empates: <b>" + historico.empate + "</b></p>";
    historicoHTML += "<p>Porcentaje de veces ganadas por el jugador: <b>" + porcentajeJugador.toFixed(2) + "%</b></p>";
    historicoHTML += "<p>Porcentaje de veces ganadas por la CPU: <b>" + porcentajeComputadora.toFixed(2) + "%</b></p>";

    document.getElementById("historico").innerHTML = historicoHTML;
}