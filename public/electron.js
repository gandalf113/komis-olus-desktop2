// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')
const sqlite3 = require('sqlite3').verbose()

let db;

const createWindow = () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    // and load the index.html of the app.
    //   mainWindow.loadFile('index.html')
    mainWindow.loadURL(isDev ?
        'http://localhost:3000/' :
        `file://${path.join(__dirname, "../build/index.html")}`
    )

    db = new sqlite3.Database(path.join(__dirname, "../src/testdb.db"), sqlite3.OPEN_READWRITE, (err) => {
        if (err) return console.error(err.message);

        console.log("connection successful")
    })

    // Open the DevTools.
    mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    db.close((err) => {
        if (err) return console.error(err.message);
    })
    if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// IPC HANDLERS
ipcMain.on("greet", (event, args) => {
    console.log(args)
})

ipcMain.handle("get/version", async (event, args) => {
    return app.getVersion();
})


ipcMain.handle("get/clients", async (event, args) => {
    const query = "SELECT * FROM klienci";
    console.log("hello?")
    
    const response = await db.all(query, [], (err, rows) => {
        if (err) return err.message;
        console.log(rows)
        return rows
    })

    return response
})

ipcMain.handle("create/client", async (event, args) => {
    const sql = 'INSERT INTO users (first_name, last_name, phone_num, id) \
    VALUES(?,?,?,?)';

    db.run(sql, ['Jan', 'Kowalski', '123123123, 1'], (err) => {
        if (err) return console.error(err.message);
        console.log("a new row has been appended")
    });
})

