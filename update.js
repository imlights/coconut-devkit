"use strict";

const child_process = require("child_process");

console.log("Checking for Updates...");

UpdateMain();

function run(cmd) {
    return new Promise((resolve, reject) => {
        console.log(`executing '${cmd}'`);
        child_process.exec(cmd, (err, stdout, stderr) => {
            //console.log(`DEBUG: output for '${cmd}': \nerr: ${err}\nstdout: ${stdout}\nstderr: ${stderr}`)
            if (err)
                reject([err && err.code || 0, stdout, stderr]);
            else
                resolve([err && err.code || 0, stdout, stderr]);
        });
    }).catch(data => {
        console.error(data[0]);
        return data;
    });
}

function TryUpdate() {
    return new Promise(async (resolve, reject) => {
        let foundupdate = false;
        let [c, out, err] = await run("git fetch");
        if (c && c !== 0) {
            console.error("Crash while fetching update from Repo.");
            return reject(c);
        } else if (err && err !== "") {
            console.log(err); // Not actually an Error
            foundupdate = true;
        }

        if (!foundupdate) {
            console.log("No updates to fetch from Repo.");
            return resolve(true);
        } else {
            [c, out, err] = await run("git pull origin master");
            if (c && c !== 0) {
                console.error("Crash while pulling new source files");
                return reject(c);
            } else if (err && err !== 0) {
                console.log(err);
                return resolve(true);
            }
        }
    }).catch((err) => {
        console.error("err: " + err);
        return false;
    });
}

async function UpdateMain() {
    try {
        let returnValue = await TryUpdate();
        if (returnValue) {
            console.log("Autoupdate successfully exited, launching...");
            require("./electron-main");
        } else {
            console.error("Autoupdate closed with an error, Unable to launch.");
            process.exit();
        }
    } catch (e) {
        console.error("Fatal Crash: Unable to launch devkit.");
        console.error(e);
        process.exit();
    }
}