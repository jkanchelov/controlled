import * as WebSocket from "ws";
import * as os from "os";
import WSSessionSubscriber from "./wsSessionSubscriber";

export default class WSSessionKeeper {
    /**
     *
     */
    public ws: WebSocket;
    public address: string;

    private sessionSubscribers: WSSessionSubscriber[];

    constructor(address: string, attemptToReconnect: boolean = true) {
        this.address = address;
        this.sessionSubscribers = [];

        if (attemptToReconnect) {
            setInterval(() => {
                if (!this.ws) {
                    this.connectToServer();
                    this.updateSubscribers();
                }
            }, 10000);
        }

        this.connectToServer();
    }

    addSubscriber(subscriber: WSSessionSubscriber) {
        this.sessionSubscribers.push(subscriber);
    }

    private updateSubscribers() {
        this.sessionSubscribers.forEach(subscriber => {
            subscriber.updateWS(this.ws);
        });
    }

    private connectToServer() {
        let socket: WebSocket;
        socket = new WebSocket(this.address);
        socket.on("open", function open() {
            console.log("Connection opened");
            socket.send(
                JSON.stringify({
                    command: "subscribe",
                    name: `[${process.env.USERDOMAIN}].${os.userInfo().username}`,
                })
            );
        });
        socket.on("error", e => {
            console.error(e);
        });
        socket.on("close", () => {
            this.ws = null;
            console.log("Connection closed");
        });

        this.ws = socket;
    }
}
