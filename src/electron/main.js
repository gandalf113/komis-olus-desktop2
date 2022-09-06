// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const fs = require('fs')
const os = require('os')
const isDev = require('electron-is-dev');

let mainWindow;

const createWindow = () => {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    })

    // and load the index.html of the app.
    //   mainWindow.loadFile('index.html')
    mainWindow.loadURL(isDev ?
        'http://localhost:3000/' :
        `file://${path.join(__dirname, "../../build/index.html")}`
    )

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()
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

// var current = document.getElementById('current');
var options = {
    silent: false,
    printBackground: true,
    color: false,
    margin: {
        marginType: 'printableArea'
    },
    landscape: false,
    pagesPerSheet: 1,
    collate: false,
    copies: 1,
    header: 'Header of the Page',
    footer: 'Footer of the Page'
}

// ipcMain.on("print", (event, args) => {

//     mainWindow.webContents.print(options, (success, failureReason) => {
//         if (!success) console.log(failureReason);

//         console.log('Print Initiated');
//     });
// })

ipcMain.on('print', (event, filename) => {
    // Use default printing options
    const pdfPath = path.join('C:\\', 'KOMIS_OLUS', 'zwroty', `${filename}.pdf`)
    mainWindow.webContents.printToPDF({}).then(data => {
        fs.writeFile(pdfPath, data, (error) => {
            if (error) throw error
            console.log(`Wrote PDF successfully to ${pdfPath}`)
        })
    }).catch(error => {
        console.log(`Failed to write PDF to ${pdfPath}: `, error)
    })
})

require('./db-manager');