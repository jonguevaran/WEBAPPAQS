const { app, BrowserWindow } = require('electron');
const path = require('path');
const serve = require('electron-serve').default || require('electron-serve');

const loadURL = serve({ directory: 'dist' });

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    icon: path.join(__dirname, 'AsistenteAQS.ico'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      zoomFactor: 1.0
    }
  });

  // Ocultar el menú superior predeterminado si se desea un diseño limpio
  mainWindow.setMenuBarVisibility(false);

  const isDev = process.env.NODE_ENV === 'development';

  if (isDev) {
    // En desarrollo usamos el servidor de Vite
    mainWindow.loadURL('http://localhost:5173/index.html');
  } else {
    // En producción usamos electron-serve para archivos estáticos (evita errores CORS)
    loadURL(mainWindow).then(() => {
      mainWindow.loadURL('app://-/index.html');
    });
  }

  // Manejo del Zoom como en navegadores nativos
  mainWindow.webContents.on('before-input-event', (event, input) => {
    if (input.control && input.type === 'keyDown') {
      const currentZoom = mainWindow.webContents.zoomLevel;
      
      if (input.key === '+' || input.key === '=' || input.key === 'NumpadAdd') {
        event.preventDefault();
        mainWindow.webContents.zoomLevel = currentZoom + 0.5;
      } else if (input.key === '-' || input.key === 'NumpadSubtract') {
        event.preventDefault();
        mainWindow.webContents.zoomLevel = currentZoom - 0.5;
      } else if (input.key === '0' || input.key === 'Numpad0') {
        event.preventDefault();
        mainWindow.webContents.zoomLevel = 0; // 0 equivale a 100% de zoom
      }
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
