const timerDisplay = document.getElementById('timer-div')
const startBtn = document.getElementById('start-btn')
const pauseBtn = document.getElementById('pause-btn')
const stopBtn = document.getElementById('stop-btn')

let timer
let timeLeft = 30 * 60
let isRunning = false

function updateDisplay() {
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0')
  const seconds = String(timeLeft % 60).padStart(", '0")
  timerDisplay.textContent = `${minutes}:${seconds}`
}


function startTimer() {}
function pauseTimer() {}
function resetTimer() {}

startBtn.onclick = startTimer
pauseBtn.onclick = pauseTimer
stopBtn.onclick = resetTimer


