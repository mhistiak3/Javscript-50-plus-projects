// local state
let playeres = ["X", "O"];
let currentPlayer = 1;
let gameMove = [0, 0, 0, 0, 0, 0, 0, 0, 0];
// let gameMove = [
//   [0, 0, 0],
//   [0, 0, 0],
//   [0, 0, 0],
// ];

// Dom Select
let gameBoxes = document.getElementById("allBox");
let gameBox = document.querySelectorAll(".box");
let alertBox = document.querySelector(".alert-box");

let playerOne = document.getElementById("playerOne");
let playerTow = document.getElementById("playerTow");

// Some Settings
playerOne.innerText = playeres[0];
playerTow.innerText = playeres[1];
currentPlayerActive()


// User Move

function userMove(boxId) {
    
  if (gameMove[boxId] === 0) {
    alertBox.classList.add("d-none");

    if (currentPlayer === 1) {
      gameMove[boxId] = 1;
      gameBox[boxId].innerHTML = playeres[0];
      gameLogic(currentPlayer);
      currentPlayer = 2;
    } else if (currentPlayer === 2) {
      gameMove[boxId] = 2;
      gameBox[boxId].innerHTML = playeres[1];
      gameLogic(currentPlayer);

      currentPlayer = 1;
    }
    currentPlayerActive();
  } else {
    alertBox.classList.remove("d-none");
  }
}

function gameLogic(player) {
  if (
    gameMove[0] === gameMove[3] &&
    gameMove[3] === gameMove[6] &&
    gameMove[0] !== 0 &&
    gameMove[3] !== 0 &&
    gameMove[6] !== 0
  ) {
    winPlayer(player);
  } else if (
    gameMove[0] === gameMove[1] &&
    gameMove[1] === gameMove[2] &&
    gameMove[0] !== 0 &&
    gameMove[1] !== 0 &&
    gameMove[2] !== 0
  ) {
    winPlayer(player);
  } else if (
    gameMove[2] === gameMove[5] &&
    gameMove[5] === gameMove[8] &&
    gameMove[2] !== 0 &&
    gameMove[5] !== 0 &&
    gameMove[8] !== 0
  ) {
    winPlayer(player);
  } else if (
    gameMove[6] === gameMove[7] &&
    gameMove[7] === gameMove[8] &&
    gameMove[6] !== 0 &&
    gameMove[7] !== 0 &&
    gameMove[8] !== 0
  ) {
    winPlayer(player);
  } else if (
    gameMove[1] === gameMove[4] &&
    gameMove[4] === gameMove[7] &&
    gameMove[1] !== 0 &&
    gameMove[4] !== 0 &&
    gameMove[7] !== 0
  ) {
   winPlayer(player);
  } else if (
    gameMove[0] === gameMove[4] &&
    gameMove[4] === gameMove[9] &&
    gameMove[0] !== 0 &&
    gameMove[4] !== 0 &&
    gameMove[9] !== 0
  ) {
    winPlayer(player);
  }
   else if (
    gameMove[2] === gameMove[4] &&
    gameMove[4] === gameMove[6] &&
    gameMove[2] !== 0 &&
    gameMove[4] !== 0 &&
    gameMove[6] !== 0
  ) {
    winPlayer(player);
  }
   else if (
    gameMove[3] === gameMove[4] &&
    gameMove[4] === gameMove[5] &&
    gameMove[3] !== 0 &&
    gameMove[4] !== 0 &&
    gameMove[5] !== 0
  ) {
    winPlayer(player);
  }
}

// currenttPlayer
function currentPlayerActive(){
     if (currentPlayer === 1) {
       playerOne.classList.add("bg-info");
       playerTow.classList.remove("bg-info");
     } else if (currentPlayer === 2) {
       playerTow.classList.add("bg-info");
       playerOne.classList.remove("bg-info");
     }
}

// win fun
function winPlayer(player) {
  gameBoxes.innerHTML = `
    
    <main class="p-4">
     <h2 class="mb-2">Player ${playeres[player - 1]} Win this Game</h2>
     <a href="/" class="btn btn-dark">Play Again</a>
     </main>
    `;
     playerTow.classList.remove("bg-info");
     playerOne.classList.remove("bg-info");
}
