"use strict";

console.log("Checking for Updates...");

const http = require("http");
const fs = require("fs");
const v = (() => {
    let out;
    try {
        out = fs.readFileSync("./package.json", "utf-8");
        out = JSON.parse(out);
    } catch (e) {
        console.error(e);
        process.exit();
    }
    return out;
})();

function Update() {
    return new Promise((resolve, reject) => {
        resolve(true);
    }).catch((err) => console.error);
}

const req = http.request({
    hostname: "",
    port: 80,
    path: "/",
    method: "POST",
    headers: {
        Content-Type: "plain-text",
        Content-Length: Buffer.byteLength(`version,${v}`);
    },
    agent: false
}, async (response) => {
    response.setEncoding("utf-8");
    res.on("data", (buffer) => {
        let data = buffer.toString();
        if (data === "update") {
            console.log("New version found, updating...");
            await Update();
        }
        console.log("Devkit up to date, launching...");
        require("./electron-main");
    })
});

req.on("error", (e) => {
    console.error("Fatal Error Launching Devkit auto-update");
    console.error(e.message);
    process.exit();
});


