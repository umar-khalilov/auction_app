import { availableParallelism } from 'node:os';
import cluster from 'node:cluster';
import { LoggerService } from '@common/services/LoggerService';

export class AppClusterizeService {
    static #logger = new LoggerService(AppClusterizeService.name);
    static #numberOfCores = availableParallelism();

    static runInCluster(callback) {
        if (cluster.isPrimary) {
            AppClusterizeService.#logger.system(
                `Primary server started on: ${process.pid}`
            );
            let core = 0;
            while (core < AppClusterizeService.#numberOfCores) {
                cluster.fork();
                core++;
            }
            cluster.on('exit', (worker, code, signal) => {
                AppClusterizeService.#logger.error(
                    `Worker: ${worker.process.pid} died with code: ${code} and signal: ${signal}. Restarting`
                );
                cluster.fork();
            });
        } else {
            AppClusterizeService.#logger.system(
                `Cluster server started on: ${process.pid}`
            );
            void callback();
        }
    }
}
