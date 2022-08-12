const { ipcRenderer, contextBridge, ipcMain } = require('electron')

const WINDOW_API = {
    greet: (message) => ipcRenderer.send("greet", message),
    GetVersion: () => ipcRenderer.invoke("get/version"),
    // Get list
    getClients: () => ipcRenderer.invoke("get/clients"),
    getSales: () => ipcRenderer.invoke("get/sales"),
    getContracts: () => ipcRenderer.invoke("get/contracts"),
    getItems: () => ipcRenderer.invoke("get/items"),
    getSalesWithItems: () => ipcRenderer.invoke("get/sales-items"),
    getSalesWithItemsByDate: (date) => ipcRenderer.invoke("get/sales-items/date", { date: date }),
    // Search
    getContract: (contractId) => ipcRenderer.invoke("get/contract", { contractId: contractId }),
    getContractsWithClients: (contractId = undefined) => ipcRenderer.invoke("get/contracts-clients", { contractId: contractId }),
    getItemsWithContracts: (contractId) => ipcRenderer.invoke("get/items-contracts", { contractId: contractId }),
    getClientsWithContractsAndItems: (search) => ipcRenderer.invoke("get/clients-contracts-items", { search: search }),
    getItemsDetailed: (search) => ipcRenderer.invoke("get/items/detailed", { search: search }),
    searchClients: (search) => ipcRenderer.invoke("search/clients", { search: search }),
    searchClientExact: (search) => ipcRenderer.invoke("search/clients/exact", { search: search }),
    // Create
    createClient: (firstName, lastName, short) => ipcRenderer.invoke("create/client", { firstName: firstName, lastName: lastName, short: short }),
    createContract: (clientId, date) => ipcRenderer.invoke("create/contract", { clientId: clientId, date: date }),
    createSale: (itemId, date) => ipcRenderer.invoke("create/sale", { itemId: itemId, date: date }),
    createItem: (name, amount, commiterValue, margin, price, contractId) => ipcRenderer.invoke("create/item", { name: name, amount: amount, commiterValue: commiterValue, margin: margin, price: price, contractId: contractId }),
    // Update
    updateItem: (itemId, name, amount, commiterValue, margin, price) => ipcRenderer.invoke("update/item", { itemId: itemId, name: name, amount: amount, commiterValue: commiterValue, margin: margin, price: price }),

    // Increment
    incrementSoldAmount: (itemId) => ipcRenderer.invoke("increment/soldAmount", { itemId: itemId }),
}

contextBridge.exposeInMainWorld("api", WINDOW_API)