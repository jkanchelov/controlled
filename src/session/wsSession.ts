import * as WebSocket from "ws";
import WSSessionSubscriber from "./wsSessionSubscriber";

export default class WSSessionKeeper {
  /**
   *
   */
  public ws: WebSocket;
  public address: string;

  private sessionSubscribers: WSSessionSubscriber[];

  constructor(address: string, attemptToReconnect = true) {
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

  addSubscriber(subscriber: WSSessionSubscriber): void {
    this.sessionSubscribers.push(subscriber);
  }

  private updateSubscribers(): void {
    this.sessionSubscribers.forEach(subscriber => {
      subscriber.updateWS(this.ws);
    });
  }

  private connectToServer(): void {
    const ws = new WebSocket(this.address);
    ws.on("open", () => {
      console.log("Connection opened");
      ws.send(
        JSON.stringify({
          command: "subscribe",
          name: `[${process.env.USERDOMAIN}]-${process.env.SVUSERNAME ||
            process.env.USERNAME}`,
        })
      );
    });
    ws.on("error", e => {
      console.error(e);
    });
    ws.on("close", () => {
      this.ws = null;
      console.log("Connection closed");
    });

    this.attachPingPong(ws);

    this.ws = ws;
  }

  private attachPingPong(ws: WebSocket): void {
    let pingTimeout: NodeJS.Timeout;
    function heartbeat(): void {
      clearTimeout(pingTimeout);
      pingTimeout = setTimeout(() => {
        this.terminate();
      }, 30000 + 1000);
    }
    ws.on("open", heartbeat);
    ws.on("ping", heartbeat);
    ws.on("close", () => {
      clearTimeout(pingTimeout);
      ws.off("open", heartbeat);
      ws.off("ping", heartbeat);
    });
  }
}
