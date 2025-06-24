const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let win; // ✅ Declaración global

function createWindow() {
    win = new BrowserWindow({
        width: 1280,
        height: 800,
        frame: false,
        title: "Bruma",
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),  // ✅ Carga el preload correctamente
            contextIsolation: true,
            nodeIntegration: false,
            webviewTag: true
        }
    });

    win.loadFile('index.html');
}

// Crear ventana cuando esté listo
app.whenReady().then(() => {
    createWindow();

    // En macOS, volver a abrir la app si no hay ventanas activas
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

// Cerrar app si no es macOS
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

// ✅ Control de botones personalizados
ipcMain.on('minimize', () => {
    if (win) win.minimize();
});

ipcMain.on('maximize', () => {
    if (win) {
        win.isMaximized() ? win.unmaximize() : win.maximize();
    }
});

ipcMain.on('close', () => {
    if (win) win.close();
});