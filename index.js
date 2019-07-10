$(document).on("ready", function() {
    $("button").on("click", function() {
        console.log($(this).id);
        ipcRenderer.send("tab", "add", $(this).id);
    });
});