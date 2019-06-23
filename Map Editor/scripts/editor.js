var editorState;
const { ipcRenderer } = require("electron");

ipcRenderer.on("getState", function() {
    event.returnValue = editorState;
});

ipcRenderer.on("promptSave", function() {
    // TODO - Write Me
});

$(document).on("ready", function () {
    $("#editor").innerHTML = (function() {
        let html = "";
        let tabs = ipcRenderer.sendSync("querytabs");
        if (tabs && Number(tabs.length) > 1) {
            for (const tab of tabs) {
                html += `<button id="${tab.toLowerCase()}" class="editor-tab${tab.toLowerCase() === $("meta[name=tabid]").attr("content") ? "focused" : ""}">${tab}</button>`;
            }
        }
        return html;
    })();

    $(".editor-tab").on("click", function() {
        if ($(this).hasClass("focused")) return;
        let id = $(this).id;
        let thisid = $("meta[name=tabid]").attr("content");
        ipcRenderer.send("tab", "focus", thisid, id);
    });

    $(".editor-tab-close").on("click", function() {
        ipcRenderer.send("tab", "remove", $(this).id);
    });
});