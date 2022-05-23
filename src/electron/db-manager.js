const path = require('path')
const { ipcMain } = require('electron')


var knex = require("knex")({
    client: "sqlite3",
    connection: {
        filename: path.join(__dirname, '../databse.sqlite')
    }
});

const getClients = ipcMain.handle("get/clients", async (event, args) => {
    return knex.select("FirstName").from("User")
})

exports.getClients = getClients