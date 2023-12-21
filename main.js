const { app, BrowserWindow } = require("electron");
console.log(app)

const createWindow = () => {
    let window = new BrowserWindow({
        width: 500,
        height: 500,
        webPreferences: {
            preload: __dirname + "/preload.js"
        }
    });

    window.loadFile("index.html");
}

app.whenReady().then(() => createWindow());