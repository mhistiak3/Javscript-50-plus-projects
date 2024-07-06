// Initial Variable
let globalState = {
  name: "Player",
  timer: 60,
  timerId: 0,
  sentenceNumber: 0,
  score: 0,
  sentences: [
    "The quick brown fox jumps over the lazy dog quickly.",
    "Every morning, I drink coffee while reading the daily newspaper.",
    "She enjoys baking cookies and cakes for her family members.",
    "They decided to go hiking in the mountains last weekend.",
    "Our team won the championship after a thrilling final match.",
    "He loves playing guitar and singing songs in his free time.",
    "She studied hard for the final exams and passed successfully.",
    "We spent the whole day exploring the beautiful city of Paris.",
    "He practices yoga every morning to maintain his physical health.",
    "They watched a movie together and then went out for dinner.",
  ],
  playerSentences: [],
};

// Dom Selection

let textDisplay = document.getElementById("text-display");
let textArea = document.getElementById("text-input");
let startButton = document.getElementById("start-button");
let resetButton = document.getElementById("reset-button");

// Initial Funnction
function init() {
  globalState.name = "Player";
  globalState.timer = 60;
  globalState.sentenceNumber = 0;
  globalState.score = 0;
  globalState.playerSentences = [];

  textArea.disabled = true;
  textArea.value = "";
  textDisplay.textContent = globalState.sentences[globalState.sentenceNumber];
}

// All Event
document.addEventListener("DOMContentLoaded", init);
startButton.addEventListener("click", startGame);
resetButton.addEventListener("click", resetGame);
textArea.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    changeSentence();
    checkSentence();
  }
});
textArea.addEventListener("paste", function (e) {
  e.preventDefault();
  textArea.value = textArea.value;
});

// function: Start Game
function startGame() {
  textArea.disabled = false;
  textArea.classList.remove("opacity-75");
  // Start Timer of 60s
  setUpTimer();
}

// function: Timer funtion
function setUpTimer() {
  globalState.timerId = setInterval(() => {
    globalState.timer -= 1;
    document.getElementById("time").textContent = globalState.timer;
    if (globalState.timer === 0) {
      clearInterval(globalState.timerId);
      endGame();
    }
  }, 1000);
}

// function: Change to another sentence after complete the current sentence
function changeSentence() {
  globalState.playerSentences.push(textArea.value);
  textArea.value = "";
  ++globalState.sentenceNumber;
  if (globalState.sentenceNumber > 9) {
    endGame();
    return;
  }
  textDisplay.textContent = globalState.sentences[globalState.sentenceNumber];
}

// function: check player sentence
function checkSentence() {
  let playerWord = globalState.playerSentences.join(" ").split(" ");
  let gameWord = globalState.sentences.join(" ").split(" ");
  let wordCount = playerWord.length;

  let errorsCount = 0;
  for (let i = 0; i < wordCount; i++) {
    if (playerWord[i] !== gameWord[i]) {
      ++errorsCount;
    }
  }

  document.getElementById("wc").textContent = wordCount;
  document.getElementById("errors").textContent = errorsCount;
}

// function: End Game
function endGame() {
  globalState.playerSentences.push(textArea.value);
  document.getElementById("popup").style.display = "flex";
  let playerWord = globalState.playerSentences.join(" ").split(" ");
  let gameWord = globalState.sentences.join(" ").split(" ");

  let wordCount = playerWord.length;
  globalState.score = wordCount;
  let errorsCount = 0;
  for (let i = 0; i < wordCount; i++) {
    if (playerWord[i] !== gameWord[i]) {
      ++errorsCount;
    }
  }
  globalState.score -= errorsCount;
  document.getElementById("words-typed").textContent = wordCount;
  document.getElementById("mistakes-made").textContent = errorsCount;
  document.getElementById("final-score").textContent = globalState.score;
  document.getElementById("player-name-display").textContent =
    document.getElementById("player-name").value;
}

// function: Reset game
function resetGame() {
  init();
  clearInterval(globalState.timerId);

  document.getElementById("time").textContent = globalState.timer;
  document.getElementById("wc").textContent = 0;
  document.getElementById("errors").textContent = 0;
}

// Take screenshot yuor result
document
  .getElementById("take-screenshot-popup")
  .addEventListener("click", function () {
    // Take screenshot of the popup content
    html2canvas(document.querySelector(".popup-content")).then((canvas) => {
      var link = document.createElement("a");
      link.download = "typing-game-score.png";
      link.href = canvas.toDataURL();
      link.click();
      hidePopup()
    });
  });

function hidePopup() {
  resetGame();
  document.getElementById("popup").style.display = "none";
}
