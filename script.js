let playerScore = 0
let computerScore = 0
let roundWinner = ''

function playRound(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    roundWinner = 'tie'
  }
  if (
    (playerSelection === 'STEIN' && computerSelection === 'SCHERE') ||
    (playerSelection === 'SCHERE' && computerSelection === 'PAPIER') ||
    (playerSelection === 'PAPIER' && computerSelection === 'STEIN')
  ) {
    playerScore++
    roundWinner = 'spieler'
  }
  if (
    (computerSelection === 'STEIN' && playerSelection === 'SCHERE') ||
    (computerSelection === 'SCHERE' && playerSelection === 'PAPIER') ||
    (computerSelection === 'PAPIER' && playerSelection === 'STEIN')
  ) {
    computerScore++
    roundWinner = 'computer'
  }
  updateScoreMessage(roundWinner, playerSelection, computerSelection)
}

function getRandomChoice() {
  let randomNumber = Math.floor(Math.random() * 3)
  switch (randomNumber) {
    case 0:
      return 'STEIN'
    case 1:
      return 'PAPIER'
    case 2:
      return 'SCHERE'
  }
}

function isGameOver() {
  return playerScore === 5 || computerScore === 5
}

// UI

const scoreInfo = document.getElementById('scoreInfo')
const scoreMessage = document.getElementById('scoreMessage')
const playerScorePara = document.getElementById('playerScore')
const computerScorePara = document.getElementById('computerScore')
const playerSign = document.getElementById('playerSign')
const computerSign = document.getElementById('computerSign')
const rockBtn = document.getElementById('rockBtn')
const paperBtn = document.getElementById('paperBtn')
const scissorsBtn = document.getElementById('scissorsBtn')
const endgameModal = document.getElementById('endgameModal')
const endgameMsg = document.getElementById('endgameMsg')
const overlay = document.getElementById('overlay')
const restartBtn = document.getElementById('restartBtn')

rockBtn.addEventListener('click', () => handleClick('STEIN'))
paperBtn.addEventListener('click', () => handleClick('PAPIER'))
scissorsBtn.addEventListener('click', () => handleClick('SCHERE'))
restartBtn.addEventListener('click', restartGame)
overlay.addEventListener('click', closeEndgameModal)

function handleClick(playerSelection) {
  if (isGameOver()) {
    return endgameModal()
   
  }

  const computerSelection = getRandomChoice()
  playRound(playerSelection, computerSelection)
  updateChoices(playerSelection, computerSelection)
  updateScore()

  if (isGameOver()) {
    openEndgameModal()
    setFinalMessage()
  }
}

function updateChoices(playerSelection, computerSelection) {
  switch (playerSelection) {
    case 'STEIN':
      playerSign.textContent = '✊'
      break
    case 'PAPIER':
      playerSign.textContent = '✋'
      break
    case 'SCHERE':
      playerSign.textContent = '✌'
      break
  }

  switch (computerSelection) {
    case 'STEIN':
      computerSign.textContent = '✊'
      break
    case 'PAPIER':
      computerSign.textContent = '✋'
      break
    case 'SCHERE':
      computerSign.textContent = '✌'
      break
  }
}

function updateScore() {
  if (roundWinner === 'tie') {
    scoreInfo.textContent = "Unentschieden!"
  } else if (roundWinner === 'player') {
    scoreInfo.textContent = 'Du gewinnst!'
  } else if (roundWinner === 'computer') {
    scoreInfo.textContent = 'Du verlierst!'
  }

  playerScorePara.textContent = `Spieler: ${playerScore}`
  computerScorePara.textContent = `Computer: ${computerScore}`
}

function updateScoreMessage(winner, playerSelection, computerSelection) {
  if (winner === 'spieler') {
    scoreMessage.textContent = `${capitalizeFirstLetter(
      playerSelection
    )} schlägt ${computerSelection.toLowerCase()}`
    return
  }
  if (winner === 'computer') {
    scoreMessage.textContent = `${capitalizeFirstLetter(
      playerSelection
    )} wurde geschlagen von ${computerSelection.toLowerCase()}`
    return
  }

  scoreMessage.textContent = `${capitalizeFirstLetter(
    playerSelection
  )} ist gleich ${computerSelection.toLowerCase()}`
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

function openEndgameModal() {
  endgameModal.classList.add('active')
  overlay.classList.add('active')
}

function closeEndgameModal() {
  endgameModal.classList.remove('active')
  overlay.classList.remove('active')
}

function setFinalMessage() {
  return playerScore > computerScore
    ? (endgameMsg.textContent = 'Du gewinnst!')
    : (endgameMsg.textContent = 'Verkackt...')
}

function restartGame() {
  playerScore = 0
  computerScore = 0
  scoreInfo.textContent = 'Womit kämpfst du?'
  scoreMessage.textContent = '5 gewinnt'
  playerScorePara.textContent = 'Spieler: 0'
  computerScorePara.textContent = 'Computer: 0'
  playerSign.textContent = '❔'
  computerSign.textContent = '❔'
  endgameModal.classList.remove('active')
  overlay.classList.remove('active')
}