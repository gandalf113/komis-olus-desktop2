const { ipcRenderer, contextBridge, ipcMain } = require('electron')

const WINDOW_API = {
    greet: (message) => ipcRenderer.send("greet", message),
    GetVersion: () => ipcRenderer.invoke("get/version"),
    getClients: () => ipcRenderer.invoke("get/clients"),
    getSales: () => ipcRenderer.invoke("get/sales"),
    getContracts: () => ipcRenderer.invoke("get/contracts"),
    getContract: (contractId) => ipcRenderer.invoke("get/contract", { contractId: contractId }),
    getItems: () => ipcRenderer.invoke("get/items"),
    getItemsDetailed: (search) => ipcRenderer.invoke("get/items/detailed", { search: search }),
    getContractsWithClients: (contractId = undefined) => ipcRenderer.invoke("get/contracts-clients", { contractId: contractId }),
    getSalesWithItems: () => ipcRenderer.invoke("get/sales-items"),
    getItemsWithContracts: (contractId) => ipcRenderer.invoke("get/items-contracts", { contractId: contractId }),
    getClientsWithContractsAndItems: (search) => ipcRenderer.invoke("get/clients-contracts-items", { search: search }),
    searchClients: (search) => ipcRenderer.invoke("search/clients", { search: search }),
    createContract: (clientId, date) => ipcRenderer.invoke("create/contract", { clientId: clientId, date: date }),
    createSale: (itemId, date) => ipcRenderer.invoke("create/sale", { itemId: itemId, date: date }),
    incrementSoldAmount: (itemId) => ipcRenderer.invoke("increment/soldAmount", { itemId: itemId }),
}

contextBridge.exposeInMainWorld("api", WINDOW_API)