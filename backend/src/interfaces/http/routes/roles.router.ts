import { Router } from 'express';
import { RolController } from "../controllers/rol.controller";


class RolesRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router
        .get('/', RolController.get)
        .get('/:id', RolController.getById)
        .post('/', RolController.create)
        .post('/search', RolController.search)
        .put('/:id',RolController.update)
        .delete('/:id', RolController._delete);;
    }
}

export default new RolesRouter().router;