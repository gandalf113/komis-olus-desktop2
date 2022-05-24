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

const getSalesInnerJoin = ipcMain.handle("get/sales_clients", async (event, args) => {
    return knex.select().from("sprzedaz").leftJoin('klienci', 'sprzedaz.idNabywcy', 'klienci.id')
})

exports.getClients = getClients
exports.getSales = getSales