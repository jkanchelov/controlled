import listServices from "./utils/listServices";
import * as Service from "node-windows";

import * as path from "path";

export default async () => {
    const installedServices: string[] = await listServices();
    console.log(installedServices.filter(service => service.includes("hello")));

    var svc = new Service.Service({
        name: "Hello World",
        description: "Hello world service",
        script: path.join(__dirname + `/index.js`),
        env: [
            {
                name: "HOME",
                value: process.env["USERPROFILE"], // service is now able to access the user who created its' home directory
            },
            {
                name: "TEMP",
                value: path.join(process.env["USERPROFILE"], "/temp"), // use a temp directory in user's home directory
            },
        ],
    });

    svc.stop();

    // svc.on("install", () => svc.start());

    // svc.on("alreadyinstalled", () => {
    //     console.log(`service is already installed`);
    // });

    // svc.on("invalidinstallation", e => {
    //     console.error("invalid installation", e);
    // });

    // svc.install();

    // if (installedServices.includes("Hello World")) {
    //     console.log("Service is installed");
    // }

    // var svc = new Service.Service({
    //     name: "Hello World",
    //     "script"
    // });
};
