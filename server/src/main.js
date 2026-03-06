import { App } from '@app/App';
import { AuthController } from '@controllers/AuthController';
import { UserController } from '@controllers/UserController';
import { LoggerService } from '@common/services/LoggerService';
import { ErrorHandler } from '@common/middlewares/ErrorHandler';
import { AuthService } from '@services/AuthService';
import { UserService } from '@services/UserService';

const main = async () => {
    try {
        const [authService, userService] = [new AuthService(), new UserService()];
        const controllers = [new AuthController(authService), new UserController(userService)];
        const app = new App(controllers);
        await app.listen();
    } catch (err) {
        new LoggerService(main.name).error(err);
        process.exit(1);
    }
};

void main();
void ErrorHandler.initializeUnhandledException();
