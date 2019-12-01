import * as util from "util";

var exec = require("child_process").exec;

const execPromise = util.promisify(exec);

export default async () => {
    const { stdout } = await execPromise("sc query state= all");

    return stdout
        .toString()
        .split("\r\n")
        .filter(function(line) {
            return line.indexOf("SERVICE_NAME") !== -1;
        })
        .map(function(line) {
            return line.replace("SERVICE_NAME: ", "");
        });
};
