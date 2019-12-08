import * as WebSocket from "ws";

export default interface WSSessionSubscriber {
  updateWS(ws: WebSocket);
}
