import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import BaseController from '../base.controller';
import { RoleAttributes } from '../../database/models/role.model';
import { RouteDefinition } from '../../types/route.definition';
import { RoleService } from './role.service';
import { createRoleValidator, getRoleValidator, searchValidator, updateRoleValidator } from './role.validator';
import { validationResult } from 'express-validator';
import logger from '../../lib/logger';
import { Op } from 'sequelize';

export default class RoleController extends BaseController {

    private role: RoleService;
    public basePath = 'roles';

    constructor() {
        super();
        this.role = new RoleService();
    }

    public routes(): RouteDefinition[] {
        return [
            { path: '/', method: 'post', handler: this.createRole.bind(this), validator: createRoleValidator() },
            { path: '/', method: 'get', handler: this.getRoles.bind(this) },
            { path: '/get-rol', method: 'post', handler: this.getRole.bind(this), validator: getRoleValidator() },
            { path: '/update', method: 'post', handler: this.updateRole.bind(this), validator: updateRoleValidator() },
            { path: '/delete', method: 'post', handler: this.delete.bind(this), validator: getRoleValidator() },
            { path: '/search', method: 'post', handler: this.search.bind(this), validator: searchValidator()},
        ];
    }

    /**
     * @param req
     * @param res
     */
    public async createRole(req: Request, res: Response): Promise<void> {
        try {

            let errors = validationResult(req);

            if (!errors.isEmpty()) {
                res.locals.data = errors
                logger.error(errors);
                return super.send(res, StatusCodes.BAD_REQUEST)
            }

            const role: RoleAttributes = await this.role.create(req.body);

            res.locals.data = { role };
            logger.info(role);
            return super.send(res, StatusCodes.CREATED);

        } catch (error) {
            res.locals.data = { error: error }
            logger.error(error);
            return super.send(res, StatusCodes.BAD_REQUEST)
        }
    }

    /**
     * @param req
     * @param res
     */
    public async getRoles(_: Request, res: Response): Promise<void> {
        try {

            const roles = await this.role.find();
            res.locals.data = { roles };
            return super.send(res, StatusCodes.OK);

        } catch (error) {

            res.locals.data = { error: error }
            logger.error(error);
            return super.send(res, StatusCodes.BAD_REQUEST);

        }
    }

    /**
     * @param req
     * @param res
     */
    public async getRole(req: Request, res: Response): Promise<void> {
        try {
            let errors = validationResult(req);

            if (!errors.isEmpty()) {
                res.locals.data = errors
                logger.error(errors);
                return super.send(res, StatusCodes.BAD_REQUEST)
            }

            const role = await this.role.findOne(req.body.role_id);
            res.locals.data = { role };
            logger.info(role);
            return super.send(res, StatusCodes.OK);

        } catch (error) {

            res.locals.data = { error: error }
            logger.error({ error, 'file': 'role.controler.ts' });
            return super.send(res, StatusCodes.BAD_REQUEST);

        }
    }

    /**
     * @param req
     * @param res
     */
    public async updateRole(req: Request, res: Response): Promise<void> {
        try {
            let errors = validationResult(req);

            if (!errors.isEmpty()) {
                res.locals.data = errors
                logger.error(errors);
                return super.send(res, StatusCodes.BAD_REQUEST)
            }

            const role = await this.role.update(req.body.role_id, req.body);
            res.locals.data = { role };
            logger.info(role);
            return super.send(res, StatusCodes.OK);

        } catch (error) {

            res.locals.data = { error: error }
            logger.error({ error, 'file': 'role.controler.ts' });
            return super.send(res, StatusCodes.BAD_REQUEST);
        }
    }

    /**
     * @param req
     * @param res
     * @param next
     */
    public async delete(req: Request, res: Response): Promise<void> {
        try {

            let errors = validationResult(req);

            if (!errors.isEmpty()) {
                res.locals.data = errors
                logger.error(errors);
                return super.send(res, StatusCodes.BAD_REQUEST)
            }

            const id = req.body.role_id;
            const status: boolean = await this.role.delete(id);

            res.locals.data = {
                status,
                'msg': `Rol con id: ${id}, eliminado`
            };

            return super.send(res, StatusCodes.OK);

        } catch (error) {
            res.locals.data = { error: error }
            logger.error({ error, 'file': 'role.controler.ts' });
            return super.send(res, StatusCodes.BAD_REQUEST);
        }
    }

    /**
     * @param req
     * @param res
     * @param next
     */
    public async search(req: Request, res: Response): Promise<void> {
        try {
            const conditions: any = {
                is_active: true
            };

            for (const [key, value] of Object.entries(req.body)) {
                if (key !== 'is_active') {
                    conditions[key] = { [Op.like]: `%${value}%` };
                }
            }

            const roles = await this.role.search(conditions);
            res.locals.data = { roles };
            logger.info(roles);

            return super.send(res, StatusCodes.OK);

        } catch (error) {
            res.locals.data = { error: error }
            logger.error({ error, 'file': 'role.controler.ts' });
            return super.send(res, StatusCodes.BAD_REQUEST);
        }
    }
}