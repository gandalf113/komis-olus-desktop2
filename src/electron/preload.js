const { ipcRenderer, contextBridge, ipcMain } = require('electron')

const WINDOW_API = {
    greet: (message) => ipcRenderer.send("greet", message),
    GetVersion: () => ipcRenderer.invoke("get/version"),
    getClients: () => ipcRenderer.invoke("get/clients"),
    getSales: () => ipcRenderer.invoke("get/sales"),
    getContracts: () => ipcRenderer.invoke("get/contracts"),
    getContractsWithClients: () => ipcRenderer.invoke("get/contracts-clients"),
    getSalesWithItems: () => ipcRenderer.invoke("get/sales-items"),
}

contextBridge.exposeInMainWorld("api", WINDOW_API)