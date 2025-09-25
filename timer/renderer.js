const {ipcRenderer} = require('electron')

const timerDisplay = document.getElementById('timer-div')

const startBtn = document.getElementById('start-btn')
const pauseBtn = document.getElementById('pause-btn')
const stopBtn = document.getElementById('stop-btn')

let timer
let timeLeft = 30 * 60
let isRunning = false

function updateDisplay() {
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0')
  const seconds = String(timeLeft % 60).padStart(2, '0')
  timerDisplay.textContent = `${minutes}:${seconds}`
}

function startTimer() {
  if (isRunning) return
  isRunning = true

  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--
      updateDisplay()
    } else {
      clearInterval(timer)
      isRunning = false
      new Notification('Time is up', {body: 'Take a breather.'})
    }
  }, 1000)
}

function pauseTimer() {
  clearInterval(timer)
  isRunning = false
}

function resetTimer() {
  clearInterval(timer)
  isRunning = false
  timeLeft = 30 * 60
  updateDisplay()
}

startBtn.onclick = startTimer
pauseBtn.onclick = pauseTimer
stopBtn.onclick = resetTimer

ipcRenderer.on('timer-control', (event, command) => {
  if (command === 'start') startTimer()
  else if (command === 'pause') pauseTimer()
  else if (command === 'stop') resetTimer()
})
