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

exports.getClients = getClients
exports.getSales = getSales
exports.getContracts = getContracts