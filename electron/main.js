/**
 * ApexRepairBench Electron Main Process
 * Handles desktop app window creation and lifecycle
 */

const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

/**
 * Create the main application window
 */
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      // Security: Enable context isolation and disable Node integration in renderer
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      // Use preload script for secure IPC communication if needed
      // preload: path.join(__dirname, 'preload.js'),
    },
    icon: path.join(__dirname, '../dist/icon.png'),
    title: 'ApexRepairBench',
    backgroundColor: '#0f172a', // slate-900
    show: false, // Don't show until ready-to-show
  });

  // Load the built React app
  const startUrl = process.env.ELECTRON_START_URL || 
    `file://${path.join(__dirname, '../dist/index.html')}`;
  
  mainWindow.loadURL(startUrl);

  // Show window when ready
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Open DevTools in development
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

/**
 * App lifecycle: Ready
 */
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // On macOS, re-create window when dock icon is clicked
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

/**
 * App lifecycle: All windows closed
 */
app.on('window-all-closed', () => {
  // On macOS, apps stay active until Cmd+Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

/**
 * Handle any uncaught errors
 */
process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
});
