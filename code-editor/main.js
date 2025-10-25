const { app, BrowserWindow, ipcMain, dialog, Menu } = require('electron')
const path = require('node:path')
const fs = require('fs')

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  mainWindow.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()
  Menu.setApplicationMenu(null)
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

ipcMain.on('file-open', (event) => {
  const paths = dialog.showOpenDialogSync({
    properties: ['openFile'],
    filters: [{
      name: 'Code Files', 
      extensions: ['js', 'css', 'html']
    }]
  })

  if (paths && paths.length > 0) {
    const path = paths[0]
    const fileContent = fs.readFileSync(path, 'utf-8')
    event.returnValue = {
      content: fileContent,
      filePath: path
    }
  } else {
    event.returnValue = null
  }
})

ipcMain.on('file-save', (event, content) => {
  const path = dialog.showSaveDialogSync({
    filters: [{
      name: 'Code Files', 
      extensions: ['js', 'css', 'html']
    }]
  })

  if (path) {
    try {
      fs.writeFileSync(path, content, 'utf-8')
      event.returnValue = path
    } catch {
      event.returnValue = null  
    }    
  }
})