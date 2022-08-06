const path = require('path')
const { ipcMain } = require('electron')


var knex = require("knex")({
    client: "sqlite3",
    connection: {
        filename: path.join(__dirname, '../database.sqlite')
    }
});

getClients = ipcMain.handle("get/clients", async (event, args) => {
    return knex.select().from("klienci").orderBy('skrot', 'asc')
})

getSales = ipcMain.handle("get/sales", async (event, args) => {
    return knex.select().from("sprzedaz")
})

getContracts = ipcMain.handle("get/contracts", async (event, args) => {
    return knex.select().from("umowy")
})

getContract = ipcMain.handle("get/contract", async (event, args) => {
    const { contractId } = args

    return knex.select().from("umowy").where('id_umowy', contractId)
})

getItems = ipcMain.handle("get/items", async (event, args) => {
    return knex.select().from("przedmioty")
})

getContractsWithClients = ipcMain.handle("get/contracts-clients", async (event, args) => {
    const { contractId } = args

    let query = knex.select('*').from('umowy').leftOuterJoin('klienci', 'klienci.id_klienta', 'umowy.id_klienta')

    if (contractId === undefined) {
        return query
    } else {
        return query.where('umowy.id_umowy', contractId)
    }
})

getSalesWithItems = ipcMain.handle("get/sales-items", async (event, args) => {
    return knex.select('*').from('sprzedaz')
        .leftJoin('przedmioty', 'przedmioty.id_przedmiotu', 'sprzedaz.id_przedmiotu')
        .orderBy('id_sprzedazy', 'desc')
})

getSalesWithItemsByDate = ipcMain.handle("get/sales-items/date", async (event, args) => {
    const { date } = args

    return knex.select('*').from('sprzedaz')
        .leftJoin('przedmioty', 'przedmioty.id_przedmiotu', 'sprzedaz.id_przedmiotu')
        .orderBy('id_sprzedazy', 'desc').where('sprzedaz.data', date)
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

searchClients = ipcMain.handle("search/clients", async (event, args) => {
    const { search } = args

    return knex.select('*').from('klienci')
        .whereLike('skrot', `%${search}%`)
})

searchClientExact = ipcMain.handle("search/clients/exact", async (event, args) => {
    const { search } = args

    return knex.select('*').from('klienci')
        .whereLike('skrot', `${search}%`)
})






createClient = ipcMain.handle("create/client", async (event, args) => {
    const { firstName, lastName, short } = args

    return knex('klienci')
        .insert({
            imie: firstName,
            nazwisko: lastName,
            skrot: short
        })
})

createContract = ipcMain.handle("create/contract", async (event, args) => {
    const { clientId, date } = args

    return knex('umowy')
        .insert({
            id_klienta: clientId,
            data: date
        })
})

createSale = ipcMain.handle("create/sale", async (event, args) => {
    const { itemId, date } = args

    return knex('sprzedaz')
        .insert({
            id_przedmiotu: itemId,
            data: date
        })
})

createItem = ipcMain.handle("create/item", async (event, args) => {
    const { contractId, name, commiterValue, margin, price, amount } = args

    return knex('przedmioty')
        .insert({
            id_umowy: contractId,
            nazwa: name,
            kwotaDlaKomitenta: commiterValue,
            marza: margin,
            cena: price,
            przyjetaIlosc: amount,
            sprzedanaIlosc: 0
        })
})

incrementSoldAmount = ipcMain.handle('increment/soldAmount', async (event, args) => {
    const { itemId } = args

    return knex('przedmioty')
        .where('id_przedmiotu', '=', itemId)
        .increment('sprzedanaIlosc', 1)
})

getItemsDetailed = ipcMain.handle('get/items/detailed', async (event, args) => {
    const { search } = args

    const hexToDec = (hex) => {
        return parseInt(hex, 16);
    }

    return knex.select('*').from('klienci')
        .leftJoin('umowy', 'umowy.id_klienta', 'klienci.id_klienta')
        .leftJoin('przedmioty', 'przedmioty.id_umowy', 'umowy.id_umowy')
        .whereLike('id_przedmiotu', `%${hexToDec(search)}%`)
})

/**
 * Zwraca wszystkie pozycje sprzedaży dla danego miesiąca połączonego z rokiem
 * Przykładowy argument month: 2022-07
 */
 getMonthlySales = ipcMain.handle("get/sales/monthly", async (event, args) => {
    const { month } = args

    return knex.select('*').from('sprzedaz')
        .leftJoin('przedmioty', 'przedmioty.id_przedmiotu', 'sprzedaz.id_przedmiotu')
        .orderBy('id_sprzedazy', 'desc').whereLike('sprzedaz.data', `%${month}-%`)
})
