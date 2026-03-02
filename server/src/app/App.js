import { createServer } from 'node:http';
import express from 'express';
import cors from 'cors';
import { LoggerService } from '@common/services/LoggerService';
import { configuration } from '@configs/envConfigs';
import { NotFoundException } from '@common/exceptions/NotFoundException';
import { ErrorHandler } from '@common/middlewares/ErrorHandler';

export class App {
    #app;
    #port;
    #logger;
    #server;

    constructor() {
        this.#logger = new LoggerService(App.name);
        this.#app = express();
        this.#port = configuration.serverPort;
        this.#initializeMiddlewares();
        this.#initializeControllers(controllers);
        this.#initializeErrorHandling();
        this.#server = createServer(this.#app);
        this.#gracefullyClose();
        this.#logger.log('Initialized');
    }

    #initializeMiddlewares() {
        this.#app.all((req, res, next) => {
            res.setHeader(
                'Access-Control-Allow-Headers',
                'X-Requested-With, Content-Type, Authorization, Accept'
            );
            res.header('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Credentials', true);
            res.header(
                'Access-Control-Allow-Methods',
                'GET,POST,DELETE,PUT,PATCH'
            );
            res.header('Access-Control-Max-Age', '3600');
            next();
        });
        this.#app.use(cors());
        this.#app.use(express.json({ limit: '100mb' }));
        this.#app.use(express.urlencoded({ limit: '50mb', extended: true }));
    }

    async listen() {
        this.#server.listen(this.#port);
        this.#server.on('listening', () => {
            this.#logger.log('Application started!');
        });
    }

    /**
     * @param {Class[]} controllers
     */
    #initializeControllers(controllers = []) {
        controllers.forEach(controller => {
            this.#app.use('/api', controller.router);
        });
    }

    #initializeErrorHandling() {
        this.#app.use('*', (req, res, next) => {
            next(
                new NotFoundException(
                    `The requested path: ${req.path} not found`
                )
            );
        });
        this.#app.use(ErrorHandler.errorHandler);
    }

    #gracefullyClose() {
        process.once('SIGTERM', () => {
            this.#logger.log('SIGTERM signal received.');
            this.#logger.log('Closing http server.');
            this.#server.close(async () => {
                this.#logger.log('Http server closed.');
                process.exit(0);
            });
        });
    }
}
