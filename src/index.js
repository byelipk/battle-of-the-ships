// Battleship
//
// 4 10x10 grid4 - two for each player.
//   -- letters A-J identify the rows and numbers 1-10 identify the columns
//
// One one grid the player arranges their ships and tracks shots from their
// opponent; on the second grid, the player tracks their shots.
//
// Before the game begins, each player arranges their primary grid.
// Each ship occupies n consecutive horizontal or vertical squares on the grid.
// The number of consecutive spaces is determined by the type of ship.
// The ships cannot overlap.
//
// Possible ships/spaces:
//
// Carrier (5)
// Battleship (4)
// Cruiser (3)
// Submarine (3)
// Destroyer (2)

// NOTE
// The meat of the API is in a file called `functions.js`.
// The classes in this file represent the domain models 
// that I'd use to build out the game played if it was played 
// in the terminal. Implementing the game is outside the scope 
// of the exercise as I understand it, but if that's something 
// you want I'd be happy to do so.

var readlineSync = require('readline-sync');

const mapLettersToIndex = Object.freeze({
  'a': 0,
  'b': 1,
  'c': 2,
  'd': 3,
  'e': 4,
  'f': 5,
  'g': 6,
  'h': 7,
  'i': 8,
  'j': 9
});

var { 
  buildGrid, 
  placeShipHorizontally,
  placeShipVertically,
  fire,
  hasShipsRemaining,
  drawBoard
} = require("./functions");

class Player {
  constructor(name, io) {
    this.name = name;
    this.io = io;
    this.board = buildGrid();
  }

  placeBoats(boats) {
    console.log(`Placing boats for ${this.name}`);

    this.board = placeShipHorizontally(this.board, {row: 0, col: 0, size: boats.get('carrier')});
    this.board = placeShipVertically(this.board, {row: 2, col: 0, size: boats.get('battleship')});
    this.board = placeShipHorizontally(this.board, {row: 8, col: 5, size: boats.get('submarine')});
    this.board = placeShipVertically(this.board, {row: 5, col: 3, size: boats.get('cruiser')});
    this.board = placeShipHorizontally(this.board, {row: 9, col: 7, size: boats.get('destroyer')});

    drawBoard(this.board);
  }

  takeTurn(opponent) {
    // delegate to fire()
    var input = this.io.question("Enter (x/y) coordinates to attack: ");

    var coordinates = input.trim().split(/ /);

    if (coordinates.length !== 2) {
      throw new Error("Invalid coordinates.");
    } 

    var xCoord = mapLettersToIndex[coordinates[0]];
    var yCoord = parseInt(coordinates[1], 10);

    // validate input
    if (xCoord === undefined) {
      throw new Error("Invalid x coordinate. Must be letter from a-j.");
    }

    if (Number.isNaN(yCoord) || (yCoord < 0 || yCoord > 9)) {
      throw new Error("Invalid y coordinate. Must be number from 0-9.");
    }

    return fire(opponent.board, { row: xCoord, col: yCoord });
  } 
}

class Game {

  constructor(io) {
    this.io = readlineSync;
    this.ships = this.selectShips();
    this.player1 = new Player("Player 1", this.io);
    this.player2 = new Player("Player 2", this.io);
  }

  selectShips() {
    var ships = new Map();
    
    ships.set('carrier', 5);
    ships.set('battleship', 4);
    ships.set('submarine', 3);
    ships.set('cruiser', 3);
    ships.set('destroyer', 2);

    return ships;
  }

  start() {
    // - Place boats for player 1
    this.player1.placeBoats(this.ships);

    // - Place boats for player 2
    this.player2.placeBoats(this.ships);

    this.play();
  }

  play() {
    // ---- Loop ----
    //    - Take turn using fire()
    //    - Check if opposing player lost using hasShipsRemaining
    //    - if game over, announce winner

    console.log("Ok, let's play!");
    console.log("Player1, you get unlimited shots at Player2! 😁");
    console.log("To enter the coordinates to attack, press any key from [a-j]. followed by a space, followed by any key from [0-9].")

    var gameOver = false;
    var currentPlayer = this.player1;
    var defendingPlayer = this.player2;

    while (gameOver === false) {
      try {
        var damageAssessment = currentPlayer.takeTurn(defendingPlayer);
        defendingPlayer.board = damageAssessment.grid;

        if (hasShipsRemaining(defendingPlayer.board) === false) {
          console.log("YOU WIN!!!!!!!");
          console.log("GAME OVER!!!");
          gameOver = true;
        }
        else {
          console.log(damageAssessment.result, damageAssessment.row, damageAssessment.col);
        }
      } catch (e) {
        console.error(e.message);
      }
    }
  }
}

class Launcher {

  constructor() {
    this.io = readlineSync;
    this.game = new Game(this.io);
    this.status = 0;

    this.handleLine = this.handleLine.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleLine(line) {
    this.game.play(line);
  }

  handleClose() {
    console.log('Bye now');
  }

  deliverWelcomeMessage() {
    console.log(`Welcome to Battleship! 🚢`);
  }

  launch() {
    this.deliverWelcomeMessage();
    
    if (this.io.keyInYN("Are you ready to play?")) {
      this.startGame();
    }
    else {
      console.log('Bye now!');
    }
  }

  startGame() {
    this.status = 1;
    this.game.start();
  }
}

const launcher = new Launcher();

launcher.launch();