import CommandType from "./commandType";

export default interface Command {
    type: CommandType;
    command: string;
    commandID: string;
    commandOptions?: any;
}
