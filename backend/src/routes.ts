import { Router } from 'express';
import RoleController from './components/role/role.controller';
import { RouteDefinition } from './types/route.definition';
import logger from './lib/logger';
import UserController from './components/user/user.controller';
import ClientController from './components/client/client.controller';
import LocationController from './components/location/location.controller';
import SubLocationController from './components/sub.location/sub.location.controller';
import DropDownListController from './components/dropdown.list/dropdown.list.controller';
import DropDownListItemController from './components/dropdown.list.item/dropdown.list.item.controller';
import JobTitleController from './components/job.title/job.title.controller';
import ContactController from './components/contact/contact.controller';
import ArlController from './components/arl/arl.controller';
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
            new DropDownListController(),
            new DropDownListItemController(),
            new RoleController(),
            new UserController(),
            new ClientController(),
            new LocationController(),
            new SubLocationController(),
            new JobTitleController(),
            new ContactController(),
            new ArlController(),
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
