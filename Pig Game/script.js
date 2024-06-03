// Local State
let mainScore = [0, 0];
let currentScore = 0;
let currentPlayer = 1;

// Buttons
let resetBtn = document.querySelector('.btn--new');
let rollDiceBtn = document.querySelector('.btn--roll');
let holdBtn = document.querySelector('.btn--hold');

let alertBox = document.querySelector('.alert');

// dice
let dice = document.querySelector('.dice');
dice.classList.add('hide');
// HACK: All Events
rollDiceBtn.addEventListener('click', rollDice);
holdBtn.addEventListener('click', gameHold);
resetBtn.addEventListener('click', resetGame);
alertBox.addEventListener('click', function () {
  resetGame();
  alertBox.classList.add('hide');
});

// HACK: Rool Dice function for change player score
function rollDice() {
  let diceScore = diceImageChange();
  dice.classList.remove('hide');
  if (diceScore !== 1) {
    document
      .querySelector(`.player--${currentPlayer}`)
      .classList.add('player--active');
    currentScore += diceScore;

    document.getElementById(`current--${currentPlayer}`).textContent =
      currentScore;
      
  } else {
    document
      .querySelector(`.player--${currentPlayer}`)
      .classList.remove('player--active');
    mainScore[currentPlayer - 1] += currentScore;
    win(mainScore[currentPlayer - 1]);
    document.getElementById(`score--${currentPlayer}`).textContent =
      mainScore[currentPlayer - 1];
    currentScore = 0;
    document.getElementById(`current--${currentPlayer}`).textContent =
      currentScore;
    currentPlayer = currentPlayer === 1 ? 2 : 1;
  }
}

// HACK: Dice image change
function diceImageChange() {
  let randomeNum = Math.floor(Math.random() * 6) + 1;
  dice.src = `dice-${randomeNum}.png`;
  return randomeNum;
}

// HACK: Hold func
function gameHold() {
    mainScore[currentPlayer - 1] += currentScore;
      win(mainScore[currentPlayer - 1]);
  document
    .querySelector(`.player--${currentPlayer}`)
    .classList.remove('player--active');
  document.getElementById(`score--${currentPlayer}`).textContent =
    mainScore[currentPlayer - 1];
  currentScore = 0;
  document.getElementById(`current--${currentPlayer}`).textContent =
    currentScore;
  currentPlayer = currentPlayer === 1 ? 2 : 1;
}

// HACK: Reset Game
function resetGame() {
    console.log('e');
  document
    .querySelector(`.player--${currentPlayer}`)
    .classList.remove('player--active');
  dice.classList.add('hide');
  alertBox.classList.add('hide');
  document.getElementById(`score--1`).textContent = 0;
  document.getElementById(`score--2`).textContent = 0;
  document.getElementById('current--1').textContent = 0;
  document.getElementById('current--2').textContent = 0;
  mainScore = [0, 0];
  currentScore = 0;
  currentPlayer = 1;
}


// Game win func 
function win(score){
      if (score >= 100) {
        alertBox.classList.remove('hide');
        alertBox.innerHTML = `
    <h2>Player ${currentPlayer} Win <br> Score: ${
          mainScore[currentPlayer - 1]
        }</h2>
      <button onclick="${() => resetGame()}">Play Again</button>
    `;
      }
}