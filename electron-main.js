"use strict";

const { app, BrowserWindow, ipcMain } = require("electron");
let Window;
const editor = {
    focused: 0,
    states: {
        mapeditor: false,
        tileseteditor: false,
        soundscapeeditor: false,
        buildingeditor: false,
        classeditor: false,
        itemeditor: false,
        mounteditor: false,
        skillseditor: false,
        imagepackager: false,
        fontpackager: false
    },
    tabs: [],
    tools: {
        mapeditor: {
            name: "Map Editor"
        }
    },
    tabExists: id => {
        let returnValue = false;
        for (const tab of editorTabs) {
            if (tab.id === id) {
                returnValue = true;
                break;
            }
        }
        return returnValue;
    },
    removeTab(id) {
        this.states[id] = false;
        let index = false;
        for (let i = 0; i < this.tabs.length; i++) {
            if (this.tabs[i].id === id) {
                index = i;
                break;
            }
        }
        if (index) {
            this.tabs.splice(index, 1);
            this.focused--;
        }
    }
};

function spawnWindow() {
    Window = new BrowserWindow({
        height: 600,
        width: 800,
        webPreferences: {
            nodeIntegration: true
        }
    });

    ipcMain.on("querytabs", (event) => {
        event.returnValue = Editor.tabs.map(function(value) {
            return value.name;
        })
    });

    ipcMain.on("tab", (event, flag, args) => {
        console.log(flag, args);
        switch(flag) {
            case "add":
                if (Editor.tabExists(args[0])) break;
                Editor.tabs.push({
                    id: args[0],
                    name: Editor.tools[args[0]].name,
                    data: {}
                });
                Editor.states[args[0]] = event.sender.sendSync("getState");
                Editor.focused = Editor.tabs.length - 1;
                Window.loadURL(`file://${__dirname}/${args[0]}.html`);
                break;
            case "remove":
                if (Editor.states[args[0]] !== event.sender.sendSync("getState"))
                    event.sender.send("promptsave");
                else
                    Editor.removeTab(args[0]);
                break;
            case "focus":
                if (Editor.focused === Editor.tabIndex(args[1])) break;
                Editor.states[args[0]] = event.sender.sendSync("getState");
                Editor.focused = Editor.tabIndex(args[1]);
                Window.loadFile("./html/" + args[1] + ".html", { query: { data: Editor.states[args[1]] } });
                break;
        }
    });

    ipcMain.on("confirmsave", (event, ...args) => editor.removeTab(args[0]))

    Window.loadURL("file://" + __dirname + "/index.html");
}

app.on("ready", spawnWindow);

// TODO - implement tabs for windows
// TODO - save editor states
// TODO - research electron ipc