const { app, BrowserWindow, Menu, shell, ipcMain } = require('electron')
const path = require('node:path')
const isDev = process.eventNames.NODE_ENV === 'development'

let mainWindow

const stopTimer = () => {
  mainWindow.webContents.send('timer-control', 'stop')
}

const startTimer = () => {
  mainWindow.webContents.send('timer-control', 'start')
}

const pauseTimer = () => {
  mainWindow.webContents.send('timer-control', 'pause')
}

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 400,
    height: 550,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  mainWindow.loadFile('index.html')

  const menu = Menu.buildFromTemplate(menuTemplate)
  Menu.setApplicationMenu(menu)

  mainWindow.webContents.openDevTools()
}

const menuTemplate = [
  {
    label: 'Timer',
    submenu: [
      {
        label: 'Start',
        click: startTimer,
      },
      {
        label: 'Pause',
        click: pauseTimer,
      },
      {
        label: 'Stop',
        click: stopTimer,
      },
    ],
  },
  ...(isDev
    ? [
        {
          label: 'View',
          submenu: [
            {
              label: 'Reload',
              role: 'reload'
            },
            {
              label: 'Show DevTools',
              role: 'toggledevtools' 
            }
          ]
        }
      ]
    : []
  ),
]

app.whenReady().then(() => {
  createWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})