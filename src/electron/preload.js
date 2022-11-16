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
    createClient: (firstName, lastName, short, address, phone) => ipcRenderer.invoke("create/client", { firstName: firstName, lastName: lastName, short: short, address: address, phone: phone }),
    createContract: (clientId, contractNumber, date) => ipcRenderer.invoke("create/contract", { clientId: clientId, contractNumber: contractNumber, date: date }),
    createSale: (itemId, margin, price, date) => ipcRenderer.invoke("create/sale", { itemId: itemId, margin: margin, price: price, date: date }),
    createItem: (name, amount, commiterValue, defaultMargin, contractId) => ipcRenderer.invoke("create/item", { name: name, amount: amount, commiterValue: commiterValue, defaultMargin: defaultMargin, contractId: contractId }),
    createWithdraw: (clientId, amount, date) => ipcRenderer.invoke("create/withdraw", { clientId: clientId, amount: amount, date: date }),
    createReturn: (itemId, returnedAmount, date) => ipcRenderer.invoke("create/return", { itemId: itemId, returnedAmount: returnedAmount, date: date }),
    // Update
    updateClient: (clientId, firstName, lastName, short, address, phone) => ipcRenderer.invoke("update/client", { clientId: clientId, firstName: firstName, lastName: lastName, short: short, address: address, phone }),
    updateContract: (contractId, contractNumber, clientId) => ipcRenderer.invoke("update/contract", { contractId: contractId, contractNumber: contractNumber, clientId: clientId }),
    updateSale: (saleId, margin, price, date) => ipcRenderer.invoke("update/sale", { saleId: saleId, margin: margin, price: price, date: date }),
    updateItem: (itemId, name, amount, soldAmount, commiterValue, defaultMargin) => ipcRenderer.invoke("update/item", { itemId: itemId, name: name, amount: amount, soldAmount: soldAmount, commiterValue: commiterValue, defaultMargin: defaultMargin }),
    // Increment
    incrementSoldAmount: (itemId) => ipcRenderer.invoke("increment/soldAmount", { itemId: itemId }),
    incrementReturnedAmountBy: (itemId, amount) => ipcRenderer.invoke("increment/returnedAmount", { itemId: itemId, amount: amount }),
    // Delete
    deleteClient: (clientId) => ipcRenderer.invoke("delete/client", { clientId: clientId }),
    deleteItem: (itemId) => ipcRenderer.invoke("delete/item", { itemId: itemId }),
    deleteContract: (contractId) => ipcRenderer.invoke("delete/contract", { contractId: contractId }),
    deleteWithdraw: (withdrawId) => ipcRenderer.invoke("delete/withdraw", { withdrawId: withdrawId }),
}

const PRINTER_API = {
    print: (message) => ipcRenderer.send("print", message)
}

contextBridge.exposeInMainWorld("api", WINDOW_API)
contextBridge.exposeInMainWorld("printer", PRINTER_API)