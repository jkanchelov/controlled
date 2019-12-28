import * as WebSocket from "ws";

import Command from "./commands/abstract/command";
import executeCommand from "./commands/executeCommand";
import WSSessionSubscriber from "./session/wsSessionSubscriber";

export default class CommandHandler implements WSSessionSubscriber {
    private ws: WebSocket;

    constructor(ws: WebSocket) {
        this.ws = ws;

        this.startListening();
    }

    updateWS(ws: WebSocket): void {
        this.stopListening();

        this.ws = ws;

        this.startListening();
    }

    private startListening(): void {
        this.ws.on("message", this.onMessage);
    }

    private stopListening(): void {
        this.ws.off("message", this.onMessage);
    }

    private onMessage = async (data: string): Promise<void> => {
        const command: Command = JSON.parse(data);

        const { stdout, stderr } = await executeCommand(command);

        this.ws.send(
            JSON.stringify({
                commandID: command.commandID,
                stdout,
                stderr,
            })
        );
    };
}
