const path = require('path')
const { ipcMain } = require('electron')


var knex = require("knex")({
    client: "sqlite3",
    connection: {
        filename: path.join(__dirname, '../database.sqlite')
    }
});

getClients = ipcMain.handle("get/clients", async (event, args) => {
    return knex.select().from("klienci")
})

getSales = ipcMain.handle("get/sales", async (event, args) => {
    return knex.select().from("sprzedaz")
})

getContracts = ipcMain.handle("get/contracts", async (event, args) => {
    return knex.select().from("umowy")
})

getItems = ipcMain.handle("get/items", async (event, args) => {
    return knex.select().from("przedmioty")
})

getContractsWithClients = ipcMain.handle("get/contracts-clients", async (event, args) => {
    return knex.select('*').from('umowy').leftOuterJoin('klienci', 'klienci.id_klienta', 'umowy.id_klienta')
})

getSalesWithItems = ipcMain.handle("get/sales-items", async (event, args) => {
    return knex.select('*').from('sprzedaz').leftOuterJoin('przedmioty', 'przedmioty.id_przedmiotu', 'sprzedaz.id_przedmiotu')
})

getItemsWithContracts = ipcMain.handle("get/items-contracts", async (event, args) => {
    const { contractId } = args
    return knex.select('*').from('przedmioty').leftOuterJoin('umowy', 'umowy.id_umowy', 'przedmioty.id_umowy').where('przedmioty.id_umowy', contractId)
})

getClientsWithContractsAndItems = ipcMain.handle("get/clients-contracts-items", async (event, args) => {
    const { search } = args

    const hexToDec = (hex) => {
        return parseInt(hex, 16);
    }

    return knex.select('*').from('klienci')
        .leftJoin('umowy', 'umowy.id_klienta', 'klienci.id_klienta')
        .leftJoin('przedmioty', 'przedmioty.id_umowy', 'umowy.id_umowy')
        .whereLike('id_przedmiotu', `%${hexToDec(search)}%`)
})