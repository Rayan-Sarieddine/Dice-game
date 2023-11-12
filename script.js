"use strict";

const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const img = document.querySelector(".dice");
const info = document.querySelector(".info");

let player = 1;
let score = 0;
let mainScore = 0;
let playing = true;
document.querySelector(`#name--1`).innerHTML = "Player 1";
document.querySelector(`#name--2`).innerHTML = "Player2";
btnRoll.addEventListener("click", () => {
  if (playing) {
    play(player);
  }
});
btnHold.addEventListener("click", () => {
  if (playing) {
    mainScore = Number(document.querySelector(`#score--${player}`).innerHTML);

    mainScore += score;
    score = 0;
    document.querySelector(`#current--${player}`).innerHTML = score;
    document.querySelector(`#score--${player}`).innerHTML = mainScore;
    if (mainScore > 50) {
      playing = false;
      info.innerHTML = `Player ${player} is the winner`;
      createConfetti();
    } else {
      switchPlayer(player);
    }
  }
});

function play(plr) {
  score = Number(document.querySelector(`#current--${plr}`).innerHTML);
  let random = Math.trunc(Math.random() * 6 + 1);
  if (img.classList.contains("hidden")) {
    img.classList.remove("hidden");
  }
  img.setAttribute("src", `Assets/dice-${random}.png`);
  if (random == 1) {
    document.querySelector(`#current--${plr}`).innerHTML = 0;
    switchPlayer(plr);
  } else {
    score += random;
    document.querySelector(`#current--${plr}`).innerHTML = score;
  }
}

function switchPlayer(plr) {
  if (plr == 1) {
    document.querySelector(`.player--1`).classList.remove("player--active");
    document.querySelector(`.player--2`).classList.add("player--active");
    player = 2;
  }
  if (plr == 2) {
    document.querySelector(`.player--2`).classList.remove("player--active");
    document.querySelector(`.player--1`).classList.add("player--active");
    player = 1;
  }
}

btnNew.addEventListener("click", () => {
  img.classList.add("hidden");
  score = 0;
  switchPlayer(2);
  mainScore = 0;
  playing = true;
  document.querySelector(`#current--1`).innerHTML = 0;
  document.querySelector(`#current--2`).innerHTML = 0;
  document.querySelector(`#score--1`).innerHTML = 0;
  document.querySelector(`#score--2`).innerHTML = 0;
  info.innerHTML = "Score more than 50 to win!";
});
function createConfetti() {
  const confettiConfig = {
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  };
  confetti(confettiConfig);
}
