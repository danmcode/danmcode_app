import { Router } from 'express';
import RoleController from './components/role/role.controller';
import { RouteDefinition } from './types/route.definition';
import logger from './lib/logger';
import UserController from './components/user/user.controller';
import ClientTypeController from './components/client.type/client.type.controller';
import ClientController from './components/client/client.controller';
import IdentificationTypeController from './components/client.type/client.type.controller';
import LocationTypeController from './components/location.type/client.type.controller';
/**
 *
 * The registerControllerRoutes function creates an Express Router instance and
 * maps route definitions to corresponding HTTP methods
 * such as GET, POST, PUT, PATCH, and DELETE, with their respective handlers.
 * It then returns the configured router.
 * @param routes
 * @returns
 */
function registerControllerRoutes(routes: RouteDefinition[]): Router {
    const controllerRouter = Router();
    routes.forEach((route) => {
        switch (route.method) {
            case 'get':
                controllerRouter.get(route.path, route.handler);
                break;
            case 'post':
                controllerRouter.post(route.path, route.validator!, route.handler);
                break;
            default:
                throw new Error(`Unsupported HTTP method: ${route.method}`);
        }
    });
    return controllerRouter;
}

export default function registerRoutes(): Router {
    try {
        const router = Router();

        const controllers = [
            new RoleController(),
            new UserController(),
            new ClientTypeController(),
            new ClientController(),
            new IdentificationTypeController(),
            new LocationTypeController()
        ];

        controllers.forEach((controller) => {
            router.use(
                `/v1/${controller.basePath}`,
                registerControllerRoutes(controller.routes()),
            );
        });

        return router;
    } catch (error) {
        logger.error('Unable to register the routes:', error);
        return Router();
    }
}
