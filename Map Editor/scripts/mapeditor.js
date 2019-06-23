var VIEWS = ["tiles", "script", "lights", "sounds", "meta"];

var editorstate = {
    view: 0
    tiles: {
        tileset: false,

    }
};

function initTileView() {
    $("#newtileset").on("click", function() {

    });

    $("#loadtileset").on("click", function() {

    });
    if (editorstate.tiles.tileset) {

    }
}

function main() {
    // Control Panel Functionality

    // View Mode Tabs
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