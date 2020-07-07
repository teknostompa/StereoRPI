const { app, BrowserWindow} = require('electron')

function createWindow(){
    let win = new BrowserWindow({
        width:300,
        height:200,
        frame: false,
        fullscreen: true,
        webPreferences: {
            nodeIntegration: true
        }
    })
    win.loadFile('app/index.html')
}

app.whenReady().then(createWindow)