// local state
let playeres = ["X", "O"];
let currentPlayer = 1;
let gameMove = Array(9).fill(0);

// Dom Select
let gameBoxes = document.getElementById("allBox");
let gameBox = document.querySelectorAll(".box");
let alertBox = document.querySelector(".alert-box");
let playerOne = document.getElementById("playerOne");
let playerTow = document.getElementById("playerTow");

// Some Settings
playerOne.innerText = playeres[0];
playerTow.innerText = playeres[1];
currentPlayerActive();

// Evens
gameBox.forEach((box, index) => {
  box.addEventListener("click", () => userMove(index));
});

// User Move
function userMove(boxId) {
  if (gameMove[boxId] === 0) {
    alertBox.classList.add("d-none");

    gameMove[boxId] = currentPlayer;
    gameBox[boxId].innerHTML = playeres[currentPlayer - 1];
    if (checkDraw()) {
      endGame(`Game Draw`);
    }
    if (checkWin()) {
      endGame(`Player ${playeres[currentPlayer - 1]} Win this Game`);
    } else {
      currentPlayer = currentPlayer === 1 ? 2 : 1;
      currentPlayerActive();
    }
  } else {
    alertBox.classList.remove("d-none");
  }
}

// Check Win Logic
function checkWin() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winPatterns.some(
    (pattern) =>
      gameMove[pattern[0]] !== 0 &&
      gameMove[pattern[0]] === gameMove[pattern[1]] &&
      gameMove[pattern[1]] === gameMove[pattern[2]]
  );
}

function currentPlayerActive() {
  if (currentPlayer === 1) {
    playerOne.classList.add("bg-info");
    playerTow.classList.remove("bg-info");
  } else if (currentPlayer === 2) {
    playerTow.classList.add("bg-info");
    playerOne.classList.remove("bg-info");
  }
}

// win fun
function endGame(player) {
  gameBoxes.innerHTML = `
    
    <main class="p-4">
     <h2 class="mb-2">${player}</h2>
     <a href="/" class="btn btn-dark">Play Again</a>
     </main>
    `;
  playerTow.classList.remove("bg-info");
  playerOne.classList.remove("bg-info");
}

//  funtion foe draw

function checkDraw() {
  let a = gameMove.every((move) => {
    return move !== 0;
  });
  return a;
}
