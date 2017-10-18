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

const readline = require('readline');

var { 
  buildGrid, 
  placeShipHorizontally,
  placeShipVertically,
  fire,
  hasShipsRemaining,
  drawBoard
} = require("../src/functions");

class Player {
  constructor(name, io) {
    this.name = name;
    this.io = io;
    this.board = buildGrid();
  }

  placeBoats(boats) {
    boats.forEach((size, boat) => {
      // delegate to placeShipVertically or placeShipHorizontally
    });
  }

  takeTurn(coordinates) {
    // delegate to fire()
  } 
}

class Game {

  constructor(io) {
    this.io = io;
    this.ships = this.selectShips();
    this.player1 = new Player("Player 1", this.io);
    this.player2 = new Player("Player 2", this.io);
  }

  selectShips() {
    const ships = new Map();
    
    ships.set('carrier', 5);
    ships.set('battleship', 4);
    ships.set('submarine', 3);
    ships.set('cruiser', 3);
    ships.set('destroyer', 2);

    return ships;
  }

  start() {
    // - Place boats for player 1
    // this.player1.placeBoats(this.ships);

    // - Place boats for player 2
    // this.player1.placeBoats(this.ships);
  }

  play() {
    // ---- Loop ----
    //    - Take turn using fire()
    //    - Check if opposing player lost using hasShipsRemaining
    //    - if game over, announce winner
  }
}

class Launcher {

  constructor() {
    // TODO: Convert to using readline-sync
    this.io = readline.createInterface({ input: process.stdin, output: process.stdout });
    this.game = new Game(this.io);
    this.status = 0;

    this.handleLine = this.handleLine.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleLine(line) {
    if (this.status === 0) {
      this.game.start(line);
    }
    else {
      this.status = 1;
      this.game.play(line);
    }
  }

  handleClose() {
    console.log('Bye now');
  }

  deliverWelcomeMessage() {
    console.log(`
    Welcome to Battleship! 🚢
    Are you ready to play? (y/n) `);
  }

  launch() {
    throw new Error('NOT IMPLEMENTED. Please view `functions.js` to view view the meat of the API.');

    this.io
      .on('line', this.handleLine)
      .on('close', this.handleClose);

    
    this.deliverWelcomeMessage();

    this.io.prompt();
  }
}

const launcher = new Launcher();

launcher.launch();