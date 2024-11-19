import { app, BrowserWindow, screen } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  // Caminho do arquivo preload
  const preloadPath = path.join(__dirname, 'electron-preload.js');
  
  const mainWindow = new BrowserWindow({
    width: width,
    height: height,
    webPreferences: {
      preload: fs.existsSync(preloadPath) ? preloadPath : undefined,
      contextIsolation: true,
      nodeIntegration: false,
      allowFileAccessFromFiles: true,
    },
    minimizable: true,
    resizable: false,
  });

  // Carregar URL ou arquivo local para produção
  const startUrl = process.env.VITE_DEV_SERVER_URL || `file://${path.join(__dirname, 'dist', 'index.html')}`;
  mainWindow.loadURL(startUrl);

  // Maximiza a janela ao abrir
  mainWindow.maximize();

  // Abre o DevTools apenas no ambiente de desenvolvimento
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }
}

// Controle de instâncias duplicadas
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    const mainWindow = BrowserWindow.getAllWindows()[0];
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
}
