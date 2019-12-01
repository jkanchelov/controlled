export default interface CommandExecutor {
    execute(): Promise<{
        stdout: string;
        stderr: string;
    }>;
}
