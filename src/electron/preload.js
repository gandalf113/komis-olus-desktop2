const { ipcRenderer, contextBridge, ipcMain} = require('electron')

const WINDOW_API = {
    greet: (message) => ipcRenderer.send("greet", message),
    GetVersion: () => ipcRenderer.invoke("get/version"),
    getClients: () => ipcRenderer.invoke("get/clients"),
    getSales: () => ipcRenderer.invoke("get/sales"),
    getContracts: () => ipcRenderer.invoke("get/contracts"),
}

contextBridge.exposeInMainWorld("api", WINDOW_API)