const { ipcRenderer } = require('electron')

let newButton, saveButton, openButton
let editor

const updateInfo = () => {
  let typeDisplayed = 'No document loaded.'
  let type = 'javascript'

  if (path) {
    let filename = path.match(/[^/]+$/)[0]
    document.getElementById('filename-span').innerHTML = filename
    document.title = filename
    
  }
}

const handleNewButton = () => {}
const handleSaveButton = () => {}
const handleOpenButton = () => {}

onload = function() {
  newButton = this.document.getElementById('btn-new')
  saveButton = this.document.getElementById('btn-save')
  openButton = this.document.getElementById('btn-open')

  newButton.addEventListener('click', handleNewButton)
  saveButton.addEventListener('click', handleSaveButton)
  openButton.addEventListener('click', handleOpenButton)

  editor = CodeMirror(
    document.getElementById('editor'), {
      mode: {
        name: 'javascript',
        json: 'true'
      },
      lineNumbers: true,
      theme: 'lesser-dark'
    }
  )

  updateInfo(null)
}
