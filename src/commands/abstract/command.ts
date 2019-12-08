import CommandType from "./commandType";
import { ProcessEnvOptions } from "child_process";

export default interface Command {
  type: CommandType;
  command: string;
  commandID: string;
  commandOptions?: ProcessEnvOptions;
}
