const { ipcRenderer, contextBridge, ipcMain} = require('electron')

const WINDOW_API = {
    greet: (message) => ipcRenderer.send("greet", message),
    GetVersion: () => ipcRenderer.invoke("get/version"),
    getClients: () => ipcRenderer.invoke("get/clients"),
    insertClient: () => ipcRenderer.invoke("create/client")
}

contextBridge.exposeInMainWorld("api", WINDOW_API)