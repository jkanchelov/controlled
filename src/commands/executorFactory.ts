import CommandExecutor from "./abstract/commandExecutor";
import Command from "./abstract/command";
import CommandType from "./abstract/commandType";

import ShellExecutor from "./executors/shellExecutor";
import NodeExecutor from "./executors/nodeExecutor";

export default (command: Command): CommandExecutor => {
    switch (command.type) {
        case CommandType.shell:
            return new ShellExecutor(command);
        case CommandType.node:
            return new NodeExecutor(command);
        case CommandType.download:
        default:
            throw "Command not implemented";
    }
};
