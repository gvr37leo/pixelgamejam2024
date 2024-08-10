const { app, BrowserWindow,globalShortcut } = require('electron')


let globaldata = 'asldjkaslkjd'

app.whenReady().then(() => {
    globalShortcut.register('CommandOrControl+Shift+I', () => {
        win.webContents.toggleDevTools();
    });
    const win = new BrowserWindow({
        width: 1920,
        height: 1080,
        autoHideMenuBar:true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });
    
    win.loadFile('./src/index.html')
    win.webContents.toggleDevTools();
});