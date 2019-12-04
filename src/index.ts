import axios from "axios";
import CommandHandler from "./commandHandler";
import WSSessionKeeper from "./session/wsSession";
import startupService from "./startupService";

(async () => {
    const { data: serverAddress } = await axios.get("https://control-js.azurewebsites.net/api/getServerAddress");

    let wsSession = new WSSessionKeeper(serverAddress);
    let commandHandler = new CommandHandler(wsSession.ws);

    wsSession.addSubscriber(commandHandler);

    await startupService();
})();
