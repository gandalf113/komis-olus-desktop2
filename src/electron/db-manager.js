const path = require('path')
const { ipcMain } = require('electron')


var knex = require("knex")({
    client: "sqlite3",
    connection: {
        // filename: path.join(__dirname, '../database.sqlite').replace('/app.asar', '')
        filename: 'C:/KOMIS_OLUS/database.sqlite'
    }
});

getClients = ipcMain.handle("get/clients", async (event, args) => {
    return knex.select().from("klienci").orderBy('skrot', 'asc')
})

getClient = ipcMain.handle("get/client", async (event, args) => {
    const { clientId } = args

    return knex.select().from("klienci").where('id_klienta', clientId)
})

getClientsContracts = ipcMain.handle("get/client/contracts", async (event, args) => {
    const { clientId } = args

    return knex.select().from("umowy").where('id_klienta', clientId)

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

getWithdraws = ipcMain.handle("get/withdraws", async (event, args) => {
    return knex.select().from("wyplaty")
});

getReturns = ipcMain.handle("get/returns", async (event, args) => {
    // knex.select('zwroty.id_zwrotu','przedmioty.id_przedmiotu', 'przedmioty.nazwa', 'zwroty.data', 'klienci.skrot').from("zwroty")
    return knex.select().from("zwroty")
        .leftOuterJoin('przedmioty', 'zwroty.id_przedmiotu', 'przedmioty.id_przedmiotu')
        .leftOuterJoin('umowy', 'przedmioty.id_umowy', 'umowy.id_umowy')
        .leftOuterJoin('klienci', 'umowy.id_klienta', 'klienci.id_klienta');
});

getReturn = ipcMain.handle("get/return", async (event, args) => {
    const { returnId } = args

    return knex.select().from("zwroty")
        .where('id_zwrotu', returnId)
        .leftOuterJoin('przedmioty', 'zwroty.id_przedmiotu', 'przedmioty.id_przedmiotu')
        .leftOuterJoin('umowy', 'przedmioty.id_umowy', 'umowy.id_umowy')
        .leftOuterJoin('klienci', 'umowy.id_klienta', 'klienci.id_klienta');
});

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
        .leftJoin('umowy', 'przedmioty.id_umowy', 'umowy.id_umowy')
        .leftJoin('klienci', 'umowy.id_klienta', 'klienci.id_klienta')
        .orderBy('id_sprzedazy', 'desc')
})

getSalesWithItemsByDate = ipcMain.handle("get/sales-items/date", async (event, args) => {
    const { date } = args

    return knex.select('*').from('sprzedaz')
        .leftJoin('przedmioty', 'przedmioty.id_przedmiotu', 'sprzedaz.id_przedmiotu')
        .leftJoin('umowy', 'przedmioty.id_umowy', 'umowy.id_umowy')
        .leftJoin('klienci', 'umowy.id_klienta', 'klienci.id_klienta')
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

getItemsForGivenClient = ipcMain.handle("get/client/items", async (event, args) => {
    const { clientId } = args;

    return knex.select("*").from('przedmioty')
        .leftJoin('umowy', 'przedmioty.id_umowy', 'umowy.id_umowy')
        .leftJoin('klienci', 'umowy.id_klienta', 'klienci.id_klienta')
        .where('klienci.id_klienta', clientId)
});

getWithdrawsForGivenClient = ipcMain.handle("get/client/withdraws", async (event, args) => {
    const { clientId } = args;

    return knex.select("*").from("wyplaty").where("id_klienta", clientId);

});

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
    const { firstName, lastName, short, address, phone } = args

    return knex('klienci')
        .insert({
            imie: firstName,
            nazwisko: lastName,
            skrot: short,
            adres: address,
            nr_tel: phone
        })
})

createContract = ipcMain.handle("create/contract", async (event, args) => {
    const { clientId, contractNumber, date } = args

    return knex('umowy')
        .insert({
            id_klienta: clientId,
            numer_umowy: contractNumber,
            data: date
        })
})

createSale = ipcMain.handle("create/sale", async (event, args) => {
    const { itemId, margin, price, date } = args

    return knex('sprzedaz')
        .insert({
            id_przedmiotu: itemId,
            marza: margin,
            cena: price,
            data_sprzedazy: date
        })
})

createItem = ipcMain.handle("create/item", async (event, args) => {
    const { contractId, name, commiterValue, defaultMargin, amount } = args

    return knex('przedmioty')
        .insert({
            id_umowy: contractId,
            nazwa: name,
            kwotaDlaKomitenta: commiterValue,
            domyslnaMarza: defaultMargin,
            przyjetaIlosc: amount,
            sprzedanaIlosc: 0,
            zwroconaIlosc: 0
        })
})

createWithdraw = ipcMain.handle("create/withdraw", async (event, args) => {
    const { clientId, amount, date } = args

    return knex('wyplaty')
        .insert({
            id_klienta: clientId,
            kwota: amount,
            data: date
        })
})

createReturn = ipcMain.handle("create/return", async (event, args) => {
    const { itemId, returnedAmount, date } = args

    return knex('zwroty')
        .insert({
            id_przedmiotu: itemId,
            ilosc: returnedAmount,
            data: date
        })
})

updateClient = ipcMain.handle("update/client", async (event, args) => {
    const { clientId, firstName, lastName, short, address, phone } = args

    return knex('klienci')
        .where({ id_klienta: clientId })
        .update({
            imie: firstName,
            nazwisko: lastName,
            skrot: short,
            adres: address,
            nr_tel: phone
        })
})

updateSale = ipcMain.handle("update/sale", async (event, args) => {
    const { saleId, margin, price, date } = args

    console.log(date)

    return knex('sprzedaz')
        .where({ id_sprzedazy: saleId })
        .update({
            marza: margin,
            cena: price,
            data_sprzedazy: date
        })
})

updateItem = ipcMain.handle("update/item", async (event, args) => {
    const { itemId, name, commiterValue, defaultMargin, amount } = args

    return knex('przedmioty')
        .where({ id_przedmiotu: itemId })
        .update({
            nazwa: name,
            kwotaDlaKomitenta: commiterValue,
            domyslnaMarza: defaultMargin,
            przyjetaIlosc: amount
        })
})

updateContract = ipcMain.handle("update/contract", async (event, args) => {
    const { contractId, clientId } = args

    return knex('umowy')
        .where({ id_umowy: contractId })
        .update({
            id_klienta: clientId
        })
})

incrementSoldAmount = ipcMain.handle('increment/soldAmount', async (event, args) => {
    const { itemId } = args

    return knex('przedmioty')
        .where('id_przedmiotu', '=', itemId)
        .increment('sprzedanaIlosc', 1)
})

incrementReturnedAmountBy = ipcMain.handle('increment/returnedAmount', async (event, args) => {
    const { itemId, amount } = args

    return knex('przedmioty')
        .where('id_przedmiotu', '=', itemId)
        .increment('zwroconaIlosc', amount)
})

getItemsDetailed = ipcMain.handle('get/items/detailed', async (event, args) => {
    const { search } = args

    const hexToDec = (hex) => {
        return parseInt(hex, 16);
    }

    return knex.select('*').from('klienci')
        .leftJoin('umowy', 'umowy.id_klienta', 'klienci.id_klienta')
        .leftJoin('przedmioty', 'przedmioty.id_umowy', 'umowy.id_umowy')
        .where('id_przedmiotu', hexToDec(search))
})

deleteClient = ipcMain.handle('delete/client', async (event, args) => {
    const { clientId } = args

    await knex.raw('PRAGMA foreign_keys = ON');

    return knex.select('*').from('klienci')
        .where('id_klienta', clientId).del();
})

deleteItem = ipcMain.handle('delete/item', async (event, args) => {
    const { itemId } = args

    return knex.select('*').from('przedmioty')
        .where('id_przedmiotu', itemId).del();
})

deleteContract = ipcMain.handle('delete/contract', async (event, args) => {
    const { contractId } = args

    await knex.raw('PRAGMA foreign_keys = ON');

    return knex.select('*').from('umowy')
        .where('id_umowy', contractId).del();
})