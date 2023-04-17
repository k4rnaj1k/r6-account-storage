const { contextBridge, ipcMain, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  // we can also expose variables, not just functions
})

contextBridge.exposeInMainWorld('backend', {
  readAccounts: (masterPass) => ipcRenderer.invoke('readAccounts', masterPass),
  createAccount: (username, password, passKey) => ipcRenderer.invoke('createAccount', username, password, passKey),
  getAccountImage: (username) => ipcRenderer.invoke('getAccountImage', username),
})


// contextBridge.exposeInIsolatedWorld('backend', {
//   readAccounts: () => 'test',
// });