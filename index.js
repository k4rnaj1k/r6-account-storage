const { app, BrowserWindow } = require('electron');

// console.log('hello world');

const createWindow = () => {
    const win = new BrowserWindow({ width: 800, height: 800, autoHideMenuBar: true });
    win.loadFile('index.html');
};

app.whenReady().then(() => createWindow());