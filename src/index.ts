import CommandHandler from "./commandHandler";
import WSSessionKeeper from "./session/wsSession";
import startupService from "./startupService";

import axios from "axios";
(async (): Promise<void> => {
  const { data: serverAddress } = await axios.get(
    "https://control-js.azurewebsites.net/api/getServerAddress"
  );

  const wsSession = new WSSessionKeeper(serverAddress);
  const commandHandler = new CommandHandler(wsSession.ws);

  wsSession.addSubscriber(commandHandler);

  await startupService();
})();
