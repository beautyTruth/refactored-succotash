// // Game Parameters
// const HEIGHT = 750;
// const GRID_SIZE = 10;
// const FPS = 60;
// const DELAY_END = 2;

// // Derived Dimensions
// const WIDTH = HEIGHT * 0.9;
// const CELL = WIDTH / (GRID_SIZE + 2);
// const STROKE = CELL / 12;
// const DOT = STROKE;
// const MARGIN = HEIGHT - (GRID_SIZE + 1) * CELL;

// // Colors
// const COLOR_BOARD = "#0f3057";
// const COLOR_BORDER = "yellow";
// const COLOR_DOT = "white";
// const COLOR_AI = "orange";
// const COLOR_AI_LIGHT = "rgba(255, 166, 0, 0.3";
// const COLOR_PLAYER = "lawngreen";
// const COLOR_PLAYER_LIGHT = "rgba(126, 252, 0, 0.3";
// const COLOR_TIE = "white";

// // Text Variables
// const TEXT_AI = "Player2";
// const TEXT_AI_SML = "P2";
// const TEXT_PLAYER = "Player1";
// const TEXT_PLAYER_SML = "P1";
// const TEXT_SIZE_CELL = CELL / 2.5;
// const TEXT_SIZE_TOP = MARGIN / 6;
// const TEXT_TIE = "Draw";
// const TEXT_WIN = "Won";

// // Side Object
// const Side = {
//   BOTTOM: 0,
//   LEFT: 1,
//   RIGHT: 2,
//   TOP: 3,
// };

// // Canvas
// let canvasEl = document.createElement("canvas");
// canvasEl.height = HEIGHT;
// canvasEl.width = WIDTH;
// document.body.appendChild(canvasEl);
// let canvasRect = canvasEl.getBoundingClientRect();

// // Context
// const conX = canvasEl.getContext("2d");
// conX.lineWidth = STROKE;
// conX.textAlign = "center";
// conX.textBaseline = "middle";

// // Game Variables
// let currentCells, playersTurn, squares;

// let scoreAI, scoreRI;

// let timeEnd;

// // Mousemove Event Listener
// canvasEl.addEventListener("mousemove", highlightGrid);

// // click EL
// canvasEl.addEventListener("click", click);

// // ---------------------------------The Game Loop *-*-*-*-*-*
// function playGame() {
//   requestAnimationFrame(playGame);

//   drawBoard();
//   drawSquares();
//   drawGrid();
//   drawScores();
// }

// // ---------------------------------click Function *-*-*-*-*-*
// function click(e) {
//   if (timeEnd > 0) {
//     return;
//   }

//   selectSide();
// }

// // ---------------------------------drawBoard Function *-*-*-*-*-*
// function drawBoard() {
//   conX.fillStyle = COLOR_BOARD;
//   conX.strokeStyle = COLOR_BORDER;
//   conX.fillRect(0, 0, WIDTH, HEIGHT);
//   conX.strokeRect(
//     STROKE / 4,
//     STROKE / 4,
//     WIDTH - STROKE / 2,
//     HEIGHT - STROKE / 2
//   );
// }

// // ---------------------------------drawDot Function *-*-*-*-*-*
// function drawDot(x, y) {
//   conX.fillStyle = COLOR_DOT;
//   conX.beginPath();
//   conX.arc(x, y, DOT, 0, Math.PI * 2);
//   conX.fill();
// }

// // ---------------------------------drawGrid Function *-*-*-*-*-*
// function drawGrid() {
//   for (let i = 0; i < GRID_SIZE + 1; i++) {
//     for (let j = 0; j < GRID_SIZE + 1; j++) {
//       drawDot(getGridX(j), getGridY(i));
//     }
//   }
// }

// // ---------------------------------drawLine Function *-*-*-*-*-*
// function drawLine(x0, y0, x1, y1, color) {
//   conX.strokeStyle = color;
//   conX.beginPath();
//   conX.moveTo(x0, y0);
//   conX.lineTo(x1, y1);
//   conX.stroke();
// }

// // ---------------------------------drawScores Function *-*-*-*-*-*
// function drawScores() {
//   let colorAI = playersTurn ? COLOR_AI_LIGHT : COLOR_AI;
//   let colorRI = playersTurn ? COLOR_PLAYER : COLOR_PLAYER_LIGHT;
//   drawText(TEXT_PLAYER, WIDTH * 0.25, MARGIN * 0.25, colorRI, TEXT_SIZE_TOP);
//   drawText(scoreRI, WIDTH * 0.25, MARGIN * 0.6, colorRI, TEXT_SIZE_TOP * 2);

//   drawText(TEXT_AI, WIDTH * 0.75, MARGIN * 0.25, colorAI, TEXT_SIZE_TOP);
//   drawText(scoreAI, WIDTH * 0.75, MARGIN * 0.6, colorAI, TEXT_SIZE_TOP * 2);

//   // game over text
//   if (timeEnd > 0) {
//     timeEnd--;

//     // handle a tie
//     if (scoreRI == scoreAI) {
//       drawText(TEXT_TIE, WIDTH * 0.5, MARGIN * 0.6, COLOR_TIE, TEXT_SIZE_TOP);
//     } else {
//       let playerWins = scoreRI > scoreAI;
//       let color = playerWins ? COLOR_PLAYER : COLOR_AI;
//       let text = playerWins ? TEXT_PLAYER : TEXT_AI;

//       drawText(text, WIDTH * 0.5, MARGIN * 0.5, color, TEXT_SIZE_TOP);
//       drawText(TEXT_WIN, WIDTH * 0.5, MARGIN * 0.7, color, TEXT_SIZE_TOP);
//     }

//     // start a new game
//     if (timeEnd == 0) {
//       newGame();
//     }
//   }
// }

// // ---------------------------------drawSquares Function *-*-*-*-*-*
// function drawSquares() {
//   for (let row of squares) {
//     for (let square of row) {
//       square.drawSides();
//       square.drawFill();
//     }
//   }
// }

// // ---------------------------------drawText Function *-*-*-*-*-*
// function drawText(text, x, y, color, size) {
//   conX.fillStyle = color;
//   conX.font = `${size}px sans-serif`;
//   conX.fillText(text, x, y);
// }

// // ---------------------------------getColor Function *-*-*-*-*-*
// function getColor(player, light) {
//   if (player) {
//     return light ? COLOR_PLAYER_LIGHT : COLOR_PLAYER;
//   } else {
//     return light ? COLOR_AI_LIGHT : COLOR_AI;
//   }
// }

// // ---------------------------------getText Function *-*-*-*-*-*
// function getText(player, small) {
//   if (player) {
//     return small ? TEXT_PLAYER_SML : TEXT_PLAYER;
//   } else {
//     return small ? TEXT_AI_SML : TEXT_AI;
//   }
// }

// // ---------------------------------getGridX Function *-*-*-*-*-*
// function getGridX(col) {
//   return CELL * (col + 1);
// }

// // ---------------------------------getGridX Function *-*-*-*-*-*
// function getGridY(row) {
//   return MARGIN + CELL * row;
// }

// // ---------------------------------highlightGrid Function *-*-*-*-*-*
// function highlightGrid(e) {
//   if (timeEnd > 0) {
//     return;
//   }

//   // get mouse position relative to canvas
//   let x = e.clientX - canvasRect.left;
//   let y = e.clientY - canvasRect.top;

//   // hihgloight the square's side
//   highlightSide(x, y);
// }

// // ---------------------------------highlightSide Function *-*-*-*-*-*
// function highlightSide(x, y) {
//   // clear [reviuos highlighting
//   for (let row of squares) {
//     for (let square of row) {
//       square.highlight = null;
//     }
//   }

//   let rows = squares.length;
//   let cols = squares[0].length;

//   currentCells = [];

//   OUTER: for (let i = 0; i < rows; i++) {
//     for (let j = 0; j < cols; j++) {
//       if (squares[i][j].contains(x, y)) {
//         let side = squares[i][j].highlightSide(x, y);

//         if (side != null) {
//           currentCells.push({ row: i, col: j });
//         }

//         // determine the neighbour
//         let row = i,
//           col = j,
//           highlight,
//           neighbour = true;

//         if (side == Side.LEFT && j > 0) {
//           // from the neighbours perspective
//           col = j - 1;
//           highlight = Side.RIGHT;
//         } else if (side == Side.RIGHT && j < cols - 1) {
//           // from the neighbours perspective
//           col = j + 1;
//           highlight = Side.LEFT;
//         } else if (side == Side.TOP && i > 0) {
//           // from the neighbours perspective
//           row = i - 1;
//           highlight = Side.BOTTOM;
//         } else if (side == Side.BOTTOM && i < rows - 1) {
//           // from the neighbours perspective
//           row = i + 1;
//           highlight = Side.TOP;
//         } else {
//           neighbour = false;
//         }

//         // highlighting the nieghbour
//         if (neighbour) {
//           squares[row][col].highlight = highlight;
//           currentCells.push({ row: row, col: col });
//         }

//         break OUTER;
//       }
//     }
//   }
// }

// // ---------------------------------newGame Function *-*-*-*-*-*
// function newGame() {
//   currentCells = [];

//   playersTurn = Math.random() >= 0.5;

//   scoreAI = 0;
//   scoreRI = 0;

//   timeEnd = 0;

//   // set up the squares array
//   squares = [];
//   for (let i = 0; i < GRID_SIZE; i++) {
//     squares[i] = [];
//     for (let j = 0; j < GRID_SIZE; j++) {
//       squares[i][j] = new Square(getGridX(j), getGridY(i), CELL, CELL);
//     }
//   }
// }

// // ---------------------------------selectSide Function *-*-*-*-*-*
// function selectSide() {
//   if (currentCells == null || currentCells.length == 0) {
//     return;
//   }

//   // select side
//   let filledSquare = false;
//   for (let cell of currentCells) {
//     if (squares[cell.row][cell.col].selectSide()) {
//       filledSquare = true;
//     }
//   }
//   currentCells = [];

//   if (filledSquare) {
//     // handle game over
//     if (scoreRI + scoreAI == GRID_SIZE * GRID_SIZE) {
//       timeEnd = Math.ceil(DELAY_END * FPS);
//     }
//   } else {
//     // switch the player
//     playersTurn = !playersTurn;
//   }
// }

// // The Square Class
// class Square {
//   constructor(x, y, w, h) {
//     this.w = w;
//     this.h = h;
//     this.bottom = y + h;
//     this.left = x;
//     this.right = x + w;
//     this.top = y;
//     this.highlight = null;
//     this.numSelected = 0;
//     this.owner = null;
//     this.sideBottom = { owner: null, selected: false };
//     this.sideLeft = { owner: null, selected: false };
//     this.sideRight = { owner: null, selected: false };
//     this.sideTop = { owner: null, selected: false };
//   }

//   contains = (x, y) => {
//     return x >= this.left && x < this.right && y >= this.top && y < this.bottom;
//   };

//   drawFill = () => {
//     if (this.owner == null) {
//       return;
//     }

//     // draw a light background
//     conX.fillStyle = getColor(this.owner, true);
//     conX.fillRect(
//       this.left + STROKE,
//       this.top + STROKE,
//       this.w - STROKE * 2,
//       this.h - STROKE * 2
//     );

//     // owner text
//     drawText(
//       getText(this.owner, true),
//       this.left + this.w / 2,
//       this.top + this.h / 2,
//       getColor(this.owner, false),
//       TEXT_SIZE_CELL
//     );
//   };

//   drawSide = (side, color) => {
//     switch (side) {
//       case Side.BOTTOM:
//         drawLine(this.left, this.bottom, this.right, this.bottom, color);
//         break;

//       case Side.LEFT:
//         drawLine(this.left, this.top, this.left, this.bottom, color);
//         break;

//       case Side.RIGHT:
//         drawLine(this.right, this.top, this.right, this.bottom, color);
//         break;

//       case Side.TOP:
//         drawLine(this.left, this.top, this.right, this.top, color);
//         break;
//     }
//   };

//   drawSides = () => {
//     // highlighting
//     if (this.highlight != null) {
//       this.drawSide(this.highlight, getColor(playersTurn, true));
//     }

//     // --------------------------
//     if (this.sideBottom.selected) {
//       this.drawSide(Side.BOTTOM, getColor(this.sideBottom.owner, false));
//     }

//     if (this.sideLeft.selected) {
//       this.drawSide(Side.LEFT, getColor(this.sideLeft.owner, false));
//     }

//     if (this.sideRight.selected) {
//       this.drawSide(Side.RIGHT, getColor(this.sideRight.owner, false));
//     }

//     if (this.sideTop.selected) {
//       this.drawSide(Side.TOP, getColor(this.sideTop.owner, false));
//     }
//   };

//   highlightSide = (x, y) => {
//     let distBottom = this.bottom - y;
//     let distLeft = x - this.left;
//     let distRight = this.right - x;
//     let distTop = y - this.top;

//     let distClosest = Math.min(distBottom, distLeft, distRight, distTop);

//     if (distClosest == distBottom && !this.sideBottom.selected) {
//       this.highlight = Side.BOTTOM;
//     } else if (distClosest == distLeft && !this.sideLeft.selected) {
//       this.highlight = Side.LEFT;
//     } else if (distClosest == distRight && !this.sideRight.selected) {
//       this.highlight = Side.RIGHT;
//     } else if (distClosest == distTop && !this.sideTop.selected) {
//       this.highlight = Side.TOP;
//     }

//     return this.highlight;
//   };

//   selectSide = () => {
//     if (this.highlight == null) {
//       return;
//     }

//     // select the highlighted side
//     switch (this.highlight) {
//       case Side.BOTTOM:
//         this.sideBottom.owner = playersTurn;
//         this.sideBottom.selected = true;
//         break;

//       case Side.LEFT:
//         this.sideLeft.owner = playersTurn;
//         this.sideLeft.selected = true;
//         break;

//       case Side.RIGHT:
//         this.sideRight.owner = playersTurn;
//         this.sideRight.selected = true;
//         break;

//       case Side.TOP:
//         this.sideTop.owner = playersTurn;
//         this.sideTop.selected = true;
//         break;
//     }

//     this.highlight = null;

//     this.numSelected++;
//     if (this.numSelected == 4) {
//       this.owner = playersTurn;

//       // handle score
//       if (playersTurn) {
//         scoreRI++;
//       } else {
//         scoreAI++;
//       }

//       return true;
//     }

//     return false;
//   };
// }

// newGame();
// playGame();

/* My code below */

// =-=-=-=-=-=- dont forget to dream =-=-=-=-=-=-=-=-

// PARAMETERS

const HEIGHT = 750;
const GRID_SIZE = 10;
const FPS = 60;
const DELAY_END = 2;

// derived DIMENSIONS

const WIDTH = HEIGHT * 0.9;
const CELL = WIDTH / (GRID_SIZE + 2);
const STROKE = CELL / 12;
const DOT = STROKE;
const MARGIN = HEIGHT - (GRID_SIZE + 1) * CELL;

// COLORS

const COLOR_BOARD = "maroon";
const COLOR_BORDER = "#f5f5dc";
const COLOR_DOT = "cornflowerblue";
const COLOR_AI = "#ffa089";
const COLOR_AI_LIGHT = "rgba(255,160,137, .3)";
const COLOR_PLAYER = "#9efd38";
const COLOR_PLAYER_LIGHT = "rgba(158,253,56,.6)";
const COLOR_TIE = "papayawhip";

// TEXT variables
const TEXT_AI = "Dr. Steve";
const TEXT_AI_SML = "SB";
const TEXT_PLAYER = "Dingus";
const TEXT_PLAYER_SML = "DN";
const TEXT_SIZE_CELL = CELL / 2.5;
const TEXT_SIZE_TOP = MARGIN / 6;
const TEXT_TIE = "We tried!";
const TEXT_WIN = "won!";

// the SIDE OBJECT

const Side = {
  BOTTOM: 0,
  LEFT: 1,
  RIGHT: 2,
  TOP: 3,
};

// the CANVAS setup

let canvasEl = document.createElement("canvas");
canvasEl.height = HEIGHT;
canvasEl.width = WIDTH;
document.body.appendChild(canvasEl);
let canvasRect = canvasEl.getBoundingClientRect();

// the CONTEXT setup

const CTX = canvasEl.getContext("2d");
CTX.lineWidth = STROKE;
CTX.textAlign = "center";
CTX.textBaseline = "middle";

// GAME VARIABLES

let currentCells, playersTurn, squares;

let scoreAI, scoreRI;

let timeEnd;

// MOUSEMOVE event listener
canvasEl.addEventListener("mousemove", highlightGrid);

// CLICK event listener
canvasEl.addEventListener("click", click);

// =-=-=-=-=-=-=-=-=-=-=- GAME LOOP -=-=-=-=-=-=-=-=-=- //

function playGame() {
  requestAnimationFrame(playGame);

  drawBoard();
  drawSquares();
  drawGrid();
}

// ----- the CLICK function

function click(e) {
  if (timeEnd > 0) {
    return;
  }

  selectSide();
}

// ----- the DRAW BOARD function

function drawBoard() {
  CTX.fillStyle = COLOR_BOARD;
  CTX.strokeStyle = COLOR_BORDER;
  CTX.fillRect(0, 0, WIDTH, HEIGHT);
  CTX.strokeRect(
    STROKE / 4,
    STROKE / 4,
    WIDTH - STROKE / 2,
    HEIGHT - STROKE / 2
  );
}

// ----- the DRAW DOT function

function drawDot(x, y) {
  CTX.fillStyle = COLOR_DOT;
  CTX.beginPath();
  CTX.arc(x, y, DOT, 0, Math.PI * 2);
  CTX.fill();
}

// ----- the DRAW GRID function

function drawGrid() {
  for (let i = 0; i < GRID_SIZE + 1; i++) {
    for (let j = 0; j < GRID_SIZE + 1; j++) {
      drawDot(getGridX(j), getGridY(i));
    }
  }
}

// ----- the DRAW LINE function

function drawLine(x0, y0, x1, y1, color) {
  CTX.strokeStyle = color;
  CTX.beginPath();
  CTX.moveTo(x0, y0);
  CTX.lineTo(x1, y1);
  CTX.stroke();
}

// ----- the DRAW SQUARES function

function drawSquares() {
  for (let row of squares) {
    for (let square of row) {
      square.drawSides();
      square.drawFill();
    }
  }
}

// ----- the GET COLOR function

function getColor(player, light) {
  if (player) {
    return light ? COLOR_PLAYER_LIGHT : COLOR_PLAYER;
  } else {
    return light ? COLOR_AI_LIGHT : COLOR_AI;
  }
}

// ----- the GET GRID X function

function getGridX(col) {
  return CELL * (col + 1);
}

// ----- the GET GRID Y function

function getGridY(row) {
  return MARGIN + CELL * row;
}

// ----- the HIGHLIGHT GRID function

function highlightGrid(e) {
  if (timeEnd > 0) {
    return;
  }

  // getting the mouse's position relative to the canvas
  let x = e.clientX - canvasRect.left;
  let y = e.clientY - canvasRect.top;

  // highlighting of the square's side
  highlightSide(x, y);
}

// ----- the HIGHLIGHT SIDE function

function highlightSide(x, y) {
  // clear any previous highlighting
  for (let row of squares) {
    for (let square of row) {
      square.highlight = null;
    }
  }

  let rows = squares.length;
  let cols = squares[0].length;

  currentCells = [];

  OUTER: for (i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (squares[i][j].contains(x, y)) {
        let side = squares[i][j].highlightSide(x, y);

        if (side != null) {
          currentCells.push({ row: i, col: j });
        }

        // determine the neighbor
        let row = i,
          col = j,
          highlight,
          neighbor = true;

        if (side == Side.LEFT && j > 0) {
          // from the neighbor perspective
          col = j - 1;
          highlight = Side.RIGHT;
        } else if (side == Side.RIGHT && j < cols - 1) {
          // from the neighbor's perspective
          col = j + 1;
          highlight = Side.LEFT;
        } else if (side == Side.TOP && j > 0) {
          // from the neighbor's perspective
          row = i - 1;
          highlight = Side.BOTTOM;
        } else if (side == Side.BOTTOM && j < rows - 1) {
          // from the neighbor's perspective
          row = i + 1;
          highlight = Side.TOP;
        } else {
          neighbor = false;
        }

        break OUTER;
      }
    }
  }
}

// ----- the NEW GAME function

function newGame() {
  currentCells = [];

  playersTurn = Math.random() >= 0.5;

  // set up the SQUARES ARRAY
  squares = [];
  for (let i = 0; i < GRID_SIZE; i++) {
    squares[i] = [];
    for (let j = 0; j < GRID_SIZE; j++) {
      squares[i][j] = new Square(getGridX(j), getGridY(i), CELL, CELL);
    }
  }
}

// ----- the SELECT SIDE function

function selectSide() {
  if (currentCells == null || currentCells.length == 0) {
    return;
  }

  // select SIDE

  for (let cell of currentCells) {
    squares[cell.row][cell.col].selectSide();
  }

  currentCells = [];

  // player switch

  playersTurn = !playersTurn;
}

// -=-=-=-=-=- the SQUARE CLASS -=-=-=-=-=-=-

class Square {
  constructor(x, y, w, h) {
    this.w = w;
    this.h = h;
    this.bottom = y + h;
    this.left = x;
    this.right = x + w;
    this.top = y;
    this.highlight = null;
    this.numSelected = 0;
    this.sideBottom = { owner: null, selected: false };
    this.sideLeft = { owner: null, selected: false };
    this.sideRight = { owner: null, selected: false };
    this.sideTop = { owner: null, selected: false };
  }

  contains = (x, y) => {
    return x >= this.left && x < this.right && y >= this.top && y < this.bottom;
  };

  drawFill = () => {};

  drawSide = (side, color) => {
    switch (side) {
      case Side.BOTTOM:
        drawLine(this.left, this.bottom, this.right, this.bottom, color);
        break;

      case Side.LEFT:
        drawLine(this.left, this.top, this.left, this.bottom, color);
        break;

      case Side.RIGHT:
        drawLine(this.right, this.top, this.right, this.bottom, color);
        break;

      case Side.TOP:
        drawLine(this.left, this.top, this.right, this.top, color);
        break;
    }
  };

  drawSides = () => {
    if (this.highlight != null) {
      this.drawSide(this.highlight, getColor(playersTurn, true));
    }

    // =-=-=-=-=-=-=-=- the SELECTED logic

    if (this.sideBottom.selected) {
      this.drawSide(Side.BOTTOM, getColor(this.sideBottom.owner, false));
    }

    if (this.sideLeft.selected) {
      this.drawSide(Side.LEFT, getColor(this.sideLeft.owner, false));
    }

    if (this.sideRight.selected) {
      this.drawSide(Side.RIGHT, getColor(this.sideRight.owner, false));
    }

    if (this.sideTop.selected) {
      this.drawSide(Side.TOP, getColor(this.sideTop.owner, false));
    }
  };

  highlightSide = (x, y) => {
    let distBottom = this.bottom - y;
    let distLeft = x - this.left;
    let distRight = this.right - x;
    let distTop = y - this.top;

    let distClosest = Math.min(distBottom, distLeft, distRight, distTop);

    if (distClosest == distBottom && !this.sideBottom.selected) {
      this.highlight = Side.BOTTOM;
    } else if (distClosest == distLeft && !this.sideLeft.selected) {
      this.highlight = Side.LEFT;
    } else if (distClosest == distRight && !this.sideRight.selected) {
      this.highlight = Side.RIGHT;
    } else if (distClosest == distTop && !this.sideTop.selected) {
      this.highlight = Side.TOP;
    }

    return this.highlight;
  };

  selectSide = () => {
    if (this.highlight == null) {
      return;
    }

    // select the HIGHLIGHTED Side
    switch (this.highlight) {
      case Side.BOTTOM:
        this.sideBottom.owner = playersTurn;
        this.sideBottom.selected = true;
        break;

      case Side.LEFT:
        this.sideLeft.owner = playersTurn;
        this.sideLeft.selected = true;
        break;

      case Side.RIGHT:
        this.sideRight.owner = playersTurn;
        this.sideRight.selected = true;
        break;

      case Side.TOP:
        this.sideTop.owner = playersTurn;
        this.sideTop.selected = true;
        break;
    }
  };
}

newGame();
playGame();
