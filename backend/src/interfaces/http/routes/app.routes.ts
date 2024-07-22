import express, { Application, Router } from 'express';
import rolesRouter from './roles.router';

class AppRoutes {
    public router: Router;

    constructor(app: Application) {
        this.router = express.Router();
        this.initializeRoutes(app);
    }

    private initializeRoutes(app: Application): void {
        app.use('/api/v1', this.router);
        this.router.use('/roles', rolesRouter);
    }
}

export default AppRoutes;