import { list as listServices } from "node-windows";

export default (): Promise<string[]> => {
    return new Promise((resolve, reject) => {
        try {
            listServices(
                (
                    services: {
                        ImageName: string;
                        PID: string;
                        SessionName: string;
                        MemUsage: string;
                    }[]
                ) => {
                    resolve(Array.from(new Set(services.map(service => service.ImageName).sort())));
                }
            );
        } catch (e) {
            reject(e);
        }
    });
};
