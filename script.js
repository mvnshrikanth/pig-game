'use strict';

const btnDiceRoll = document.querySelector('.btn--roll');
const btnNewGame = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const imgDice = document.querySelector('.dice');
const pPlayerOneScore = document.getElementById('score--0');
const pPlayerTwoScore = document.getElementById('score--1');
const pPlayerOneCurrentScore = document.getElementById('current--0');
const pPlayerTwoCurrentScore = document.getElementById('current--1');
const sectionPlayerOne = document.querySelector('.player--0');
const sectionPlayerTwo = document.querySelector('.player--1');

let playerOneScore = 0;
let playerTwoScore = 0;
let playerOneCurrentScore = 0;
let playerTwoCurrentScore = 0;

let playerOneActive = false;
let playerTwoActive = false;

let playing = false;

function initializeGame() {
  playing = true;
  playerOneScore = 0;
  playerTwoScore = 0;
  playerOneCurrentScore = 0;
  playerTwoCurrentScore = 0;
  pPlayerOneScore.textContent = playerOneScore;
  pPlayerTwoScore.textContent = playerTwoScore;
  pPlayerOneCurrentScore.textContent = playerOneCurrentScore;
  pPlayerTwoCurrentScore.textContent = playerTwoCurrentScore;
  playerOneActive = true;
  sectionPlayerOne.classList.remove('player--winner');
  sectionPlayerOne.classList.remove('player--winner');
  imgDice.classList.remove('hidden');
  displayActivePlayer();
}

initializeGame();

function rndNumberGen() {
  let min = 1;
  let max = 6;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function displayCurrentScore() {
  pPlayerOneCurrentScore.textContent = playerOneCurrentScore;
  pPlayerTwoCurrentScore.textContent = playerTwoCurrentScore;
}

function updateCurrentScore(rndNumber) {
  if (playerOneActive) {
    playerOneCurrentScore = playerOneCurrentScore + rndNumber;
  } else {
    playerTwoCurrentScore = playerTwoCurrentScore + rndNumber;
  }
  displayCurrentScore();
}

function updateTotalScore() {
  if (playerOneActive) {
    playerOneScore = playerOneScore + playerOneCurrentScore;
    playerOneCurrentScore = 0;
  } else {
    playerTwoScore = playerTwoScore + playerTwoCurrentScore;
    playerTwoCurrentScore = 0;
  }
  checkWinner();
  displayCurrentScore();
  displayTotalScore();
}

function checkWinner() {
  let maxScore = 20;
  if (playerOneScore >= maxScore) {
    sectionPlayerOne.classList.add('player--winner');
    playing = false;
    imgDice.classList.add('hidden');
  } else if (playerTwoScore >= maxScore) {
    sectionPlayerTwo.classList.add('player--winner');
    playing = false;
    imgDice.classList.add('hidden');
  }
}

function displayTotalScore() {
  pPlayerOneScore.textContent = playerOneScore;
  pPlayerTwoScore.textContent = playerTwoScore;
}

function rolledOne() {
  if (playerOneActive) {
    playerOneCurrentScore = 0;
  } else {
    playerTwoCurrentScore = 0;
  }
  displayCurrentScore();
  switchPlayer();
}

function switchPlayer() {
  updateTotalScore();
  if (playerOneActive) {
    playerOneActive = false;
    playerTwoActive = true;
  } else {
    playerOneActive = true;
    playerTwoActive = false;
  }
  displayActivePlayer();
}

function displayActivePlayer() {
  if (playerOneActive) {
    sectionPlayerTwo.classList.remove('player--active');
    sectionPlayerOne.classList.add('player--active');
  } else {
    sectionPlayerOne.classList.remove('player--active');
    sectionPlayerTwo.classList.add('player--active');
  }
}

btnDiceRoll.addEventListener('click', () => {
  if (playing) {
    let rndNumber = rndNumberGen();
    let imageName = 'dice-' + rndNumber + '.png';
    imgDice.src = imageName;
    if (rndNumber === 1) {
      rolledOne();
    } else {
      updateCurrentScore(rndNumber);
    }
  }
});

btnNewGame.addEventListener('click', initializeGame);
btnHold.addEventListener('click', () => {
  if (playing) {
    switchPlayer();
  }
});
