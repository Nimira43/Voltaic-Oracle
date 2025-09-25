const timerDisplay = document.getElementById('timer-div')
const startBtn = document.getElementById('start-btn')
const pauseBtn = document.getElementById('pause-btn')
const stopBtn = document.getElementById('stop-btn')

let timer
let timeLeft = 30 * 60
let isRunning = false