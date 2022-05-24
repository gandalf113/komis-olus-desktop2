const path = require('path')
const { ipcMain } = require('electron')


var knex = require("knex")({
    client: "sqlite3",
    connection: {
        filename: path.join(__dirname, '../database.sqlite')
    }
});

const getClients = ipcMain.handle("get/clients", async (event, args) => {
    return knex.select().from("klienci")
})

const getSales = ipcMain.handle("get/sales", async (event, args) => {
    return knex.select().from("sprzedaz")
})

const getContracts = ipcMain.handle("get/contracts", async (event, args) => {
    return knex.select().from("umowy")
})

const getContractsWithClients = ipcMain.handle("get/contracts-clients", async (event, args) => {
    return knex.select('*').from('umowy').leftOuterJoin('klienci', 'klienci.id_klienta', 'umowy.id_klienta')
})

const getSalesWithItems = ipcMain.handle("get/sales-items", async (event, args) => {
    return knex.select('*').from('sprzedaz').leftOuterJoin('przedmioty', 'przedmioty.id_przedmiotu', 'sprzedaz.id_przedmiotu')
})

exports.getClients = getClients
exports.getSales = getSales
exports.getContracts = getContracts
exports.getContractsWithClients = getContractsWithClients