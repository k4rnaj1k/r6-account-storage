const { AES, enc } = require('crypto-js');
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { readAccounts, addAcount } = require('./src/service/accountService');
const { getAccountImage } = require('./src/service/r6dataService');

getAccountImage('k4rnaj1k').then((image) => console.log(image));

const createWindow = () => {
    const win = new BrowserWindow({ width: 800, height: 800, autoHideMenuBar: true, webPreferences: { preload: path.join(__dirname, 'src/preload.js') } });
    ipcMain.handle('readAccounts', (_, masterPass) => readAccounts(masterPass));
    ipcMain.handle('createAccount', (_, username, password, masterPass) => addAcount(username, password, masterPass))
    ipcMain.handle('getAccountImage', (_, username) => getAccountImage(username));
    win.loadFile('src/index.html');
};

app.whenReady().then(() => createWindow());