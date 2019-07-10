const remote = require("electron").remote
const dialog = remote.require("dialog");
const userdata = remote.app.getPath("userData");
const gm = remote.require("gm");
const path = remote.require("path");
const fs = remote.require("fs");

const WIDTH = 32;
const HEIGHT = 32;

var editorstate = {
    loaded: false,
    focused: false
};

function newTileset() {
    if (editorstate.loaded) {
        // TODO - Prompt save or export
    }

    // TODO - Prompt tileset name

    editorstate.loaded = {
        resources: [],
        tiles: [],
        metadata: {
            name: "",
            filepath: ""
        }
    };
    editorstate.focused = false;
    refresh();
}

function saveTileset() {

}

function loadTileset() {

}

function exportTileset() {

}

function loadImage() {
    return new Promise((resolve, reject) => {
        dialog.showOpenDialog({
            title: "Load Spritesheet(s)",
            buttonLabel: "Load",
            filters: [{ name: "PNG", extensions: ["png"] }],
            properties: ["openFile", "multipleSelections"]
        }, async (files) => {
            if (typeof files === "undefined") {
                return resolve(true); // User closed dialog
            }

            let success;
            for (const file of files) {
                success = ((f) => {
                    return new Promise((res, rej) => {
                        let img = gm(f);
                        img.size((err, out) => {
                            if (err)
                                return resolve(false);
                            else {
                                let parts = out.split("x").map((v) => parseInt(v));
                                if (parts[0] % WIDTH !== 0 || parts[1] % HEIGHT !== 0)
                                    return resolve(false);

                            }
                            let x, y;
                            let dir = path.join(userdata, "tilesets", editorstate.loaded.metadata.name, "images");
                            for (y = 0; y < parts[1]; y += HEIGHT) {
                                for (x = 0; x < parts[0]; x += WIDTH) {
                                    img.crop(WIDTH, HEIGHT, x, y).write(path.join(dir, `${fs.readdirSync(dir).length}.png`));
                                }
                            }
                            resolve(true);
                        });
                    });
                })(file);
                if (!success)
                    return reject("Invalid spritesheet. Ensure Width and Height are multiples of 32.");
                else
                    return resolve(true);
            }
        })
    }).catch((err) => {
        dialog.showMessageBox({
            type: "error",
            buttons: ["Ok"],
            title: "Spriteloader",
            message: "Error loading spritesheet file.",
            detail: err
        });
    });
}

function init() {
    $("#control>button").on("click", function() {
        let id = $(this).id;
        switch(id) {
            case "new": newTileset(); break;
            case "save": saveTileset(); break;
            case "load": loadTileset(); break;
            case "export": exportTileset(); break;
            default: return;
        }
    });

    $("#addimage").on("click", async function() {
        await loadImage();
        refresh();
    });
    if (editorstate.tiles.tileset) {

    }
}

function refresh() {
    let invisible = $(".container").hasClass("invisible");
    if (!editorstate.loaded) {
        // No Tileset loaded, hide everything
        if (!invisible) $(".container").addClass("invisible");
    } else {
        // Update loaded tileset metadata
        $("#tilesetname").innerText = editorstate.loaded.metadata.name;
        $("#tilesetpath").innerText = editorstate.loaded.metadata.filepath;

        // Refresh Tile view
        $(".tileentry").remove(); // Clear old tile list
        let tilelist = ""; // HTML for tile list
        for (const tile of editorstate.loaded.tiles) {
            tilelist += `<div id="${tile.id}" class="tileentry ${editorstate.focused === tile.id ? "focusedtile" : ""}></div>`;
        }
        $("#list").innerHTML = tilelist;
        if (invisible) $(".container").removeClass("invisible");
    }
}

function main() {
    init();
    $(".view").on("click", function() {
        if ($(this).hasClass("focused")) return; // Already Focused
        let view = VIEWS.indexOf($(this).id);
        if (view < 0) return; // Error?
        $(".viewmode").hide();
        $(`.${$(this).id}view`).show();
        editorstate.view = view;
    });

}

$(document).ready(main);