/*----- constants -----*/
const AUDIO = new Audio(
  "https://assets.mixkit.co/sfx/preview/mixkit-simple-countdown-922.mp3"
);

const IMAGE = {
  rock: "imgs/rock.png",
  paper: "imgs/paper.png",
  scissors: "imgs/scissors.png",
};

/*----- app's state (variables) -----*/
const scoreBoard = {
  player: 0,
  tie: 0,
  computer: 0,
};

let winner;

//identify what could be state variables
// declare variable for rock, paper, scissors

/*----- cached element references -----*/
const playerImageBox = document.getElementById("p-result");
const computerImageBox = document.getElementById("c-result");
const countdwonElement = document.getElementById("countdown");
const imageElements = document.querySelectorAll("img");
let playerChoice;
let computerChoice;

/*----- event listeners -----*/

const buttons = document.querySelectorAll("button");
buttons.forEach(handleButton);

function handleButton(button) {
  button.addEventListener("click", buttonClicked);
}
/*----- functions -----*/
init();

function init() {
  document.getElementById("p-score").innerText = scoreBoard.player;
  document.getElementById("t-score").innerText = scoreBoard.tie;
  document.getElementById("c-score").innerText = scoreBoard.computer;
  winner = null;
}

function buttonClicked(event) {
  playerChoice =
    event.target.innerText === "R"
      ? "rock"
      : event.target.innerText === "P"
      ? "paper"
      : "scissors";
  computerChoice = renderComputerChoice();
  hideImage();
  render();
}

function render() {
  renderCountdown(function () {
    imageRender();
    getWinner();
    scoreRender();
    borderRender();
  });
}

function hideImage() {
  imageElements.forEach((image) => (image.style.visibility = "hidden"));
}

function scoreRender() {
  document.getElementById("p-score").innerText = scoreBoard.player;
  document.getElementById("t-score").innerText = scoreBoard.tie;
  document.getElementById("c-score").innerText = scoreBoard.computer;
}

function getWinner() {
  if (playerChoice === computerChoice) {
    scoreBoard.tie += 1;
    winner = null;
  } else {
    if (playerChoice === "rock") {
      if (computerChoice === "paper") {
        scoreBoard.computer += 1;
        winner = -1;
      } else {
        scoreBoard.player += 1;
        winner = 1;
      }
    }
    if (playerChoice === "paper") {
      if (computerChoice === "rock") {
        scoreBoard.player += 1;
        winner = 1;
      } else {
        scoreBoard.computer += 1;
        winner = -1;
      }
    }
    if (playerChoice === "scissors") {
      if (computerChoice === "paper") {
        scoreBoard.player += 1;
        winner = 1;
      } else {
        scoreBoard.computer += 1;
        winner = -1;
      }
    }
  }
}

function renderComputerChoice() {
  const randomNumber = Math.floor(Math.random() * 3);
  const computerChoice =
    randomNumber === 0 ? "rock" : randomNumber === 1 ? "paper" : "scissors";
  return computerChoice;
}

function imageRender() {
  computerImageBox.setAttribute("src", IMAGE[computerChoice]);
  playerImageBox.setAttribute("src", IMAGE[playerChoice]);
}
function borderRender() {
  if (winner === 1) {
    playerImageBox.style.borderColor = "gray";
    computerImageBox.style.borderColor = "white";
  } else if (winner === -1) {
    computerImageBox.style.borderColor = "gray";
    playerImageBox.style.borderColor = "white";
  } else {
    playerImageBox.style.borderColor = "white";
    computerImageBox.style.borderColor = "white";
  }
}

function renderCountdown(cb) {
  function handleButton(button) {
    button.removeEventListener("click", buttonClicked);
  }
  buttons.forEach(handleButton);
  let count = 3;
  AUDIO.currentTime = 0;
  AUDIO.play();
  countdwonElement.style.visibility = "visible";
  countdwonElement.innerText = count;
  const timerId = setInterval(function () {
    count--;
    if (count) {
      countdwonElement.innerText = count;
    } else {
      countdwonElement.style.visibility = "hidden";
      imageElements.forEach((image) => (image.style.visibility = "visible"));
      clearInterval(timerId);
      cb();
      function handleButton(button) {
        button.addEventListener("click", buttonClicked);
      }
      buttons.forEach(handleButton);
    }
  }, 1000);
}

/* sudo code
  1. evoke initializer -> declare function for init()
    1.1 3 score board are rendered 0
  2. Once a player click one of the buttons(eventListener) 
    2.1 countdown starts from 3 to 1
    2.2 computer randomly selects one 
    2.3 compare 
*/
