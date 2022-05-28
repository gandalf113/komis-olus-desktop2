const { ipcRenderer, contextBridge, ipcMain } = require('electron')

const WINDOW_API = {
    greet: (message) => ipcRenderer.send("greet", message),
    GetVersion: () => ipcRenderer.invoke("get/version"),
    getClients: () => ipcRenderer.invoke("get/clients"),
    getSales: () => ipcRenderer.invoke("get/sales"),
    getContracts: () => ipcRenderer.invoke("get/contracts"),
    getItems: () => ipcRenderer.invoke("get/items"),
    getContractsWithClients: () => ipcRenderer.invoke("get/contracts-clients"),
    getSalesWithItems: () => ipcRenderer.invoke("get/sales-items"),
    getItemsWithContracts: (contractId) => ipcRenderer.invoke("get/items-contracts", { contractId: contractId }),
    getClientsWithContractsAndItems: (search) => ipcRenderer.invoke("get/clients-contracts-items", { search: search }),
    searchClients: (search) => ipcRenderer.invoke("search/clients", { search: search }),
    createContract: (clientId, date) => ipcRenderer.invoke("create/contract", { clientId: clientId, date: date }),
}

contextBridge.exposeInMainWorld("api", WINDOW_API)