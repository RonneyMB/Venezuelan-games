const { app, BrowserWindow } = require('electron')
const path = require('path')

const isDev = !app.isPackaged

const baseWindowOptions = {
  autoHideMenuBar: true,
  webPreferences: {
    contextIsolation: true,
    nodeIntegration: false,
  },
}

function loadApp(win) {
  if (isDev) {
    win.loadURL(process.env.ELECTRON_START_URL || 'http://localhost:5173')
  } else {
    win.loadFile(path.join(__dirname, '..', 'dist', 'index.html'))
  }
}

function createMainWindow() {
  const win = new BrowserWindow({
    ...baseWindowOptions,
    width: 1280,
    height: 800,
    title: 'Incret 360NET',
  })

  // Las pantallas de proyección (display) se abren como ventanas nativas nuevas.
  win.webContents.setWindowOpenHandler(() => ({
    action: 'allow',
    overrideBrowserWindowOptions: {
      ...baseWindowOptions,
      width: 1280,
      height: 720,
    },
  }))

  loadApp(win)

  if (isDev) {
    win.webContents.openDevTools({ mode: 'detach' })
  }
}

app.whenReady().then(() => {
  createMainWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
