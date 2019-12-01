import CommandHandler from "./commandHandler";
import WSSessionKeeper from "./session/wsSession";

(async () => {
    let wsSession = new WSSessionKeeper("http://localhost:8080");
    let commandHandler = new CommandHandler(wsSession.ws);

    wsSession.addSubscriber(commandHandler);
})();
