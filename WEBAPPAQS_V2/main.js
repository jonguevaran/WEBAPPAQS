const { app, BrowserWindow } = require('electron');
const path = require('path');
const serve = require('electron-serve').default || require('electron-serve');

const loadURL = serve({ directory: 'dist' });

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    show: false,
    backgroundColor: "#f8fafc",
    icon: path.join(__dirname, 'AsistenteAQS.ico'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      zoomFactor: 1.0
    }
  });

  // Ocultar el menú superior predeterminado si se desea un diseño limpio
  mainWindow.setMenuBarVisibility(false);

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

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

  // Manejo del Zoom y Atajos de Teclado
  mainWindow.webContents.on('before-input-event', (event, input) => {
    if (input.type === 'keyDown') {
      if (input.control && input.shift) {
        const key = input.key.toLowerCase();
        let targetPage = null;
        if (key === 'n') targetPage = 'Llamadas.html';
        else if (key === 'a') targetPage = 'Altas.html';
        else if (key === 'r') targetPage = 'respuestas.html';
        else if (key === 'c') targetPage = 'DelegacionAlmacenes.html';
        else if (key === 'p') targetPage = 'Password.html';
        else if (key === 'e') targetPage = 'entrega.html';

        if (targetPage) {
          event.preventDefault();
          mainWindow.webContents.executeJavaScript(`
            (function() {
              const btn = document.querySelector('button[data-page="${targetPage}"]');
              if (btn) btn.click();
            })();
          `).catch(err => console.error(err));
        }
      }

      // Zoom handling
      if (input.control) {
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
