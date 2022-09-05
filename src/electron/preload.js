const { ipcRenderer, contextBridge, ipcMain } = require('electron')

const WINDOW_API = {
    greet: (message) => ipcRenderer.send("greet", message),
    GetVersion: () => ipcRenderer.invoke("get/version"),
    // Get list
    getClients: () => ipcRenderer.invoke("get/clients"),
    getSales: () => ipcRenderer.invoke("get/sales"),
    getContracts: () => ipcRenderer.invoke("get/contracts"),
    getItems: () => ipcRenderer.invoke("get/items"),
    getWithdraws: () => ipcRenderer.invoke("get/withdraws"),
    getReturns: () => ipcRenderer.invoke("get/returns"),
    getSalesWithItems: () => ipcRenderer.invoke("get/sales-items"),
    getSalesWithItemsByDate: (date) => ipcRenderer.invoke("get/sales-items/date", { date: date }),
    getClientsContracts: (clientId) => ipcRenderer.invoke("get/client/contracts", { clientId: clientId }),
    // Search
    getContract: (contractId) => ipcRenderer.invoke("get/contract", { contractId: contractId }),
    getClient: (clientId) => ipcRenderer.invoke("get/client", { clientId: clientId }),
    getReturn: (returnId) => ipcRenderer.invoke("get/return", { returnId: returnId }),
    getContractsWithClients: (contractId = undefined) => ipcRenderer.invoke("get/contracts-clients", { contractId: contractId }),
    getItemsWithContracts: (contractId) => ipcRenderer.invoke("get/items-contracts", { contractId: contractId }),
    getClientsWithContractsAndItems: (search) => ipcRenderer.invoke("get/clients-contracts-items", { search: search }),
    getItemsForGivenClient: (clientId) => ipcRenderer.invoke("get/client/items", { clientId: clientId }),
    getWithdrawsForGivenClient: (clientId) => ipcRenderer.invoke("get/client/withdraws", { clientId: clientId }),
    getItemsDetailed: (search) => ipcRenderer.invoke("get/items/detailed", { search: search }),
    searchClients: (search) => ipcRenderer.invoke("search/clients", { search: search }),
    searchClientExact: (search) => ipcRenderer.invoke("search/clients/exact", { search: search }),
    // Create
    createClient: (firstName, lastName, short) => ipcRenderer.invoke("create/client", { firstName: firstName, lastName: lastName, short: short }),
    createContract: (clientId, contractNumber, date) => ipcRenderer.invoke("create/contract", { clientId: clientId, contractNumber: contractNumber, date: date }),
    createSale: (itemId, date) => ipcRenderer.invoke("create/sale", { itemId: itemId, date: date }),
    createItem: (name, amount, commiterValue, margin, price, contractId) => ipcRenderer.invoke("create/item", { name: name, amount: amount, commiterValue: commiterValue, margin: margin, price: price, contractId: contractId }),
    createWithdraw: (clientId, amount, date) => ipcRenderer.invoke("create/withdraw", { clientId: clientId, amount: amount, date: date }),
    createReturn: (itemId, date) => ipcRenderer.invoke("create/return", { itemId: itemId, date: date }),
    // Update
    updateItem: (itemId, name, amount, commiterValue, margin, price) => ipcRenderer.invoke("update/item", { itemId: itemId, name: name, amount: amount, commiterValue: commiterValue, margin: margin, price: price }),
    updateContract: (contractId, clientId) => ipcRenderer.invoke("update/contract", { contractId: contractId, clientId: clientId }),
    // Increment
    incrementSoldAmount: (itemId) => ipcRenderer.invoke("increment/soldAmount", { itemId: itemId }),
    incrementReturnedAmount: (itemId) => ipcRenderer.invoke("increment/returnedAmount", { itemId: itemId }),
    // Delete
    deleteItem: (itemId) => ipcRenderer.invoke("delete/item", { itemId: itemId }),
    deleteContract: (contractId) => ipcRenderer.invoke("delete/contract", { contractId: contractId }),

}

contextBridge.exposeInMainWorld("api", WINDOW_API)