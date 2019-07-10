"use strict";

function run(cmd) {
    return new Promise((resolve, reject) => {
        child_process.exec(cmd, (err, stdout, stderr) => {
            resolve([err && err.code || 0, stdout, stderr]);
        });
    });
}

(async () => {
    let [c, out, err] = await run("git clone https://github.com/imlights/coconut-devkit");
    if (c) {
        console.error("Crash while cloning repository");
        return;
    }
    if (out && !err) {
        console.log(out);
    }
})();