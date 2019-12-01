import Command from "./abstract/command";
import executorFactory from "./executorFactory";
import CommandExecutor from "./abstract/commandExecutor";

export default async (
    command: Command
): Promise<{
    stdout: string;
    stderr: string;
}> => {
    const executor: CommandExecutor = executorFactory(command);

    return executor.execute();
};
