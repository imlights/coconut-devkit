"use strict";

console.log("Checking for Updates...");

UpdateMain();

function run(cmd) {
    return new Promise((resolve, reject) => {
        child_process.exec(cmd, (err, stdout, stderr) => {
            resolve([err && err.code || 0, stdout, stderr]);
        });
    });
}

function TryUpdate() {
    return new Promise(async (resolve, reject) => {
        let [c, out, err] = await run("git fetch");
        if (c) {
            console.error("Crash while fetching update from Repo.");
            return resolve(false);
        }
        if (!out && !err) {
            console.log("No updates to fetch from Repo.");
            return resolve(true);
        }

        [c, out, err] = await run("git pull origin master");
        if (c || err) {
            console.error("Crash while pulling new source files");
            return resolve(false);
        } else {
            return resolve(true);
        }

    }).catch((err) => console.error);
}

async function UpdateMain() {
    let returnValue = await TryUpdate();
    if (returnValue) {
        console.log("Autoupdate successfully exited, launching...");
        require("electron-main");
    } else {
        console.error("Autoupdate closed with an error, Unable to launch.");
        process.exit();
    }
}