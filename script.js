const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
var ROWS;
var COLS;
const SQUARE_SIZE = 80;
let tabla;
var formularioDom = document.getElementById('formulario');
var player1;
var player2;
var wins = 0;
var losses = 0;
var ties = 0;
var jugadores = {};
document.getElementById('mostrar').style.visibility = 'hidden';

const player1Color = 'red';
const player2Color = 'yellow';

let currentPlayer = 1;

let board = [];

function primeraDeclaracion(numCeldas) {
  ROWS = numCeldas;
  COLS = numCeldas;
  canvas.width = COLS * SQUARE_SIZE;
  canvas.height = ROWS * SQUARE_SIZE;
  for (let row = 0; row < ROWS; row++) {
    board[row] = [];
    for (let col = 0; col < COLS; col++) {
      board[row][col] = 0;
    }
  }
}

function drawBoard() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      ctx.beginPath();
      ctx.rect(col * SQUARE_SIZE, row * SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE);
      ctx.stroke();

      ctx.fillStyle =
        board[row][col] === 0
          ? 'white'
          : board[row][col] === 1
          ? player1Color
          : player2Color;
      ctx.fill();
    }
  }
}

function dropPiece(event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const col = Math.floor(x / SQUARE_SIZE);

  for (let row = ROWS - 1; row >= 0; row--) {
    if (board[row][col] === 0) {
      board[row][col] = currentPlayer;
      drawBoard();
      checkWin(row, col);
      currentPlayer = currentPlayer === 1 ? 2 : 1;
      break;
    }
  }
}

function checkWin(row, col) {
  if (currentPlayer == 1) {
    document.getElementById('currentPLayer').textContent = player2;
  } else {
    document.getElementById('currentPLayer').textContent = player1;
  }

  if (
    checkHorizontal(row) ||
    checkVertical(col) ||
    checkDiagonal1(row, col) ||
    checkDiagonal2(row, col)
  ) {
    if (currentPlayer == 1) {
      alert(`El jugador ${player1} ganó!`);
      wins = wins + 1;
      agregarJugador(player1, 1);
      actualizarDato(player1, 'win', player2);
    } else {
      alert(`El jugador${player2} ganó!`);
      losses = losses + 1;
      agregarJugador(player2, 1);
      actualizarDato(player1, 'lose', player2);
    }
    updateScoreboard();
    reset();
  }
}

function updateScoreboard() {
  document.getElementById('wins').textContent = wins;
  document.getElementById('losses').textContent = losses;
  document.getElementById('ties').textContent = ties;
}

function checkHorizontal(row) {
  for (let col = 0; col < COLS - 3; col++) {
    if (
      board[row][col] === currentPlayer &&
      board[row][col + 1] === currentPlayer &&
      board[row][col + 2] === currentPlayer &&
      board[row][col + 3] === currentPlayer
    ) {
      return true;
    }
  }
  return false;
}

function checkVertical(col) {
  for (let row = 0; row < ROWS - 3; row++) {
    if (
      board[row][col] === currentPlayer &&
      board[row + 1][col] === currentPlayer &&
      board[row + 2][col] === currentPlayer &&
      board[row + 3][col] === currentPlayer
    ) {
      return true;
    }
  }
  return false;
}

function checkDiagonal1(row, col) {
  var startRow = row;
  var startCol = col;
  while (startRow > 0 && startCol > 0) {
    startRow--;
    startCol--;
  }
  while (startRow < ROWS - 3 && startCol < COLS - 3) {
    if (
      board[startRow][startCol] === currentPlayer &&
      board[startRow + 1][startCol + 1] === currentPlayer &&
      board[startRow + 2][startCol + 2] === currentPlayer &&
      board[startRow + 3][startCol + 3] === currentPlayer
    ) {
      return true;
    }
    startRow++;
    startCol++;
  }
  return false;
}

function checkDiagonal2(row, col) {
  var startRow = row;
  var startCol = col;
  while (startRow > 0 && startCol < COLS - 1) {
    startRow--;
    startCol++;
  }
  while (startRow < ROWS - 3 && startCol >= 3) {
    if (
      board[startRow][startCol] === currentPlayer &&
      board[startRow + 1][startCol - 1] === currentPlayer &&
      board[startRow + 2][startCol - 2] === currentPlayer &&
      board[startRow + 3][startCol - 3] === currentPlayer
    ) {
      return true;
    }
    startRow++;
    startCol--;
  }
  return false;
}

function reset() {
  board = [];
  for (let row = 0; row < ROWS; row++) {
    board[row] = [];
    for (let col = 0; col < COLS; col++) {
      board[row][col] = 0;
    }
  }
  currentPlayer = 1;
  drawBoard();
}

// Función para volver a jugar
function playAgain() {
  reset();
  wins = 0;
  losses = 0;
  ties = 0;
  updateScoreboard();
  mostrarOcultar(false);
  mostrarOcultarTabla();
}

// drawBoard();
canvas.addEventListener('mousedown', dropPiece);

function validarFormulario() {
  player1 = document.getElementById('player1').value;
  player2 = document.getElementById('player2').value;
  var formularioDom = document.getElementById('formulario');
  numCellDom = document.getElementById('numCellDom').value;

  if (player1.length == 0 || player1 == null) {
    player1.focus();
    alert('Porfavor rellena el campo Player 1');
    return false;
  }

  if (player2.length == 0 || player2 == null) {
    player2.focus();
    alert('Porfavor rellena el campo Player 2');
    return false;
  }

  if (numCellDom < 3 || numCellDom > 10) {
    alert('Porfavor inserta un numero entre 3 y 10');
    return false;
  }

  conecta();
  agregarJugador(player1, 0);
  agregarJugador(player2, 0);
  formularioDom.style.visibility = 'hidden';
  document.getElementById('mostrar').style.visibility = 'visible';
  primeraDeclaracion(numCellDom);
  drawBoard();
  return true;
}

function conecta() {
  var parametros = {
    player1: player1,
    player2: player2,
  };
  $.ajax({
    data: parametros,
    url: 'valida.php',
    type: 'POST',
    beforeSend: function () {
      $('#resultado').html('Procesando, espere por favor...');
    },
    success: function (response) {
      $('#resultado').html(response);
    },
  });
}

function actualizarDato(player, valorA, playerAfect) {
  var parametros = {
    player: player,
    playerAfect: playerAfect,
    valorActualizar: valorA,
  };
  $.ajax({
    data: parametros,
    url: 'actualizarDatos.php',
    type: 'POST',
    beforeSend: function () {
      $('#resultado').html('Procesando, espere por favor...');
    },
    success: function (response) {
      $('#resultado').html(response);
    },
  });
}

function getTop5() {
  $.ajax({
    url: 'getTop5.php',
    type: 'GET',
    beforeSend: function () {
      $('#resultado').html('Procesando, espere por favor...');
    },
    success: function (response) {
      $('#resultado').html(response);
    },
  });
}

function mostrarOcultar(mostrar) {
  if (mostrar) {
    formularioDom.style.visibility = 'hidden';
    document.getElementById('mostrar').style.visibility = 'visible';
    // drawBoard();
  } else {
    formularioDom.style.visibility = 'visible';
    document.getElementById('mostrar').style.visibility = 'hidden';
  }
}

function mostrarOcultarTabla(mostrar) {
  if (mostrar) {
    document.getElementById('mostrar-tabla-jugadores').style.display = 'block';
    document.getElementById('mostrar-tabla-jugadoresBD').style.display =
      'block';
  } else {
    document.getElementById('mostrar-tabla-jugadores').style.display = 'none';
    document.getElementById('mostrar-tabla-jugadoresBD').style.display = 'none';
  }
  mostrarJugadoresT = !mostrarJugadoresT;
}

// Función para ordenar los jugadores por puntaje en local
function ordenarJugadores(jugadores) {
  // Crear un arreglo de objetos con los datos de los jugadores
  const jugadoresArray = Object.entries(jugadores).map(([nombre, puntaje]) => ({
    nombre,
    puntaje,
  }));

  // Ordenar los jugadores por puntaje de mayor a menor
  jugadoresArray.sort((a, b) => b.puntaje - a.puntaje);

  // Devolver los primeros cinco jugadores
  return jugadoresArray.slice(0, 5);
}

var mostrarJugadoresT = true;
// Función para mostrar la tabla de los mejores jugadores
function mostrarTopJugadores() {
  getTop5();
  // ?El siguiente codigo es para jugar localmente

  // // Ordenar los jugadores por puntaje
  // const mejoresJugadores = ordenarJugadores(jugadores);

  // // Crear la tabla con los mejores jugadores
  // tabla = '<table><tr><th>Posición</th><th>Nombre</th><th>Puntaje</th></tr>';
  // mejoresJugadores.forEach((jugador, index) => {
  //   tabla += `<tr><td>${index + 1}</td><td>${jugador.nombre}</td><td>${
  //     jugador.puntaje
  //   }</td></tr>`;
  // });
  // tabla += '</table>';

  // // Mostrar la tabla en el documento HTML
  // document.getElementById('tabla-jugadores').innerHTML = tabla;
  mostrarOcultarTabla(mostrarJugadoresT);
}

// ?Agregar un jugador en Local
function agregarJugador(nombre, puntaje) {
  // Verificar si el jugador ya existe en el objeto de jugadores
  if (jugadores[nombre]) {
    // Actualizar el puntaje del jugador existente
    jugadores[nombre] += puntaje;
  } else {
    // Agregar un nuevo jugador al objeto de jugadores
    jugadores[nombre] = puntaje;
  }
}
