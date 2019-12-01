import * as WebSocket from "ws";

import Command from "./commands/abstract/command";
import executeCommand from "./commands/executeCommand";
import WSSessionSubscriber from "./session/wsSessionSubscriber";

export default class CommandHandler implements WSSessionSubscriber {
    /**
     *
     */
    private ws: WebSocket;

    constructor(ws: WebSocket) {
        this.ws = ws;

        this.startListening();
    }

    updateWS(ws: WebSocket) {
        this.stopListening();

        this.ws = ws;

        this.startListening();
    }

    private startListening() {
        this.ws.on("message", this.onMessage);
    }

    private stopListening() {
        this.ws.off("message", this.onMessage);
    }

    private onMessage = async (data: string) => {
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
