import { exec, ExecOptions } from "child_process";
import * as util from "util";

import CommandExecutor from "../abstract/commandExecutor";
import Command from "../abstract/command";

const execPromise = util.promisify(exec);

export default class NodeExecutor implements CommandExecutor {
    /**
     *
     */
    private command: string;
    private options: ExecOptions;

    constructor(command: Command) {
        this.command = command.command;
        this.options = command.commandOptions;
    }

    execute(): Promise<{
        stdout: string;
        stderr: string;
    }> {
        try {
            return execPromise(`node -e "${this.command}"`, this.options);
        } catch (e) {
            throw e;
        }
    }
}
