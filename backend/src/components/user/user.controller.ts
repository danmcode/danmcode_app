import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import BaseController from '../base.controller';
import { UserService } from './user.service';
import { validationResult } from 'express-validator';
import logger from '../../lib/logger';
import { Op } from 'sequelize';
import { RouteDefinition } from '../../types/route.definition';
import { createUserValidator, getUserValidator, searchUserValidator, updateUserValidator } from './user.validator';
import { UserAttributes } from '../../database/models/user.model';

export default class UserController extends BaseController {

    private user: UserService;
    public basePath = 'users';

    constructor() {
        super();
        this.user = new UserService();
    }

    public routes(): RouteDefinition[] {
        return [
            { path: '/', method: 'post', handler: this.createUser.bind(this), validator: createUserValidator() },
            { path: '/', method: 'get', handler: this.getUsers.bind(this) },
            { path: '/get-user', method: 'post', handler: this.getUser.bind(this), validator: getUserValidator() },
            { path: '/update', method: 'post', handler: this.updateUser.bind(this), validator: updateUserValidator() },
            { path: '/delete', method: 'post', handler: this.delete.bind(this), validator: getUserValidator() },
            { path: '/search', method: 'post', handler: this.search.bind(this), validator: searchUserValidator()},
        ];
    }

    /**
     * @param req
     * @param res
     */
    public async createUser(req: Request, res: Response): Promise<void> {
        try {

            let errors = validationResult(req);

            if (!errors.isEmpty()) {
                res.locals.data = errors
                logger.error(errors);
                return super.send(res, StatusCodes.BAD_REQUEST)
            }

            const user: UserAttributes = await this.user.create(req.body);

            res.locals.data = { user };
            logger.info(user);
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
    public async getUsers(_: Request, res: Response): Promise<void> {
        try {

            const users = await this.user.find();
            res.locals.data = { users };
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
    public async getUser(req: Request, res: Response): Promise<void> {
        try {
            let errors = validationResult(req);

            if (!errors.isEmpty()) {
                res.locals.data = errors
                logger.error(errors);
                return super.send(res, StatusCodes.BAD_REQUEST)
            }

            const user = await this.user.findOne(req.body.user_id);
            res.locals.data = { user };
            logger.info(user);
            return super.send(res, StatusCodes.OK);

        } catch (error) {

            res.locals.data = { error: error }
            logger.error({ error });
            return super.send(res, StatusCodes.BAD_REQUEST);

        }
    }

    /**
     * @param req
     * @param res
     */
    public async updateUser(req: Request, res: Response): Promise<void> {
        try {
            let errors = validationResult(req);

            if (!errors.isEmpty()) {
                res.locals.data = errors
                logger.error(errors);
                return super.send(res, StatusCodes.BAD_REQUEST)
            }

            const user = await this.user.update(req.body.user_id, req.body);
            res.locals.data = { user };
            logger.info(user);
            return super.send(res, StatusCodes.OK);

        } catch (error) {
            res.locals.data = { error: error }
            logger.error({ error });
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

            const id = req.body.user_id;
            const status: boolean = await this.user.delete(id);

            res.locals.data = {
                status,
                'msg': `Usuario con id: ${id}, eliminado`
            };

            return super.send(res, StatusCodes.OK);

        } catch (error) {
            res.locals.data = { error: error }
            logger.error({ error, 'file': 'user.contuser.ts' });
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

            const users = await this.user.search(conditions);
            res.locals.data = { users };
            logger.info(users);

            return super.send(res, StatusCodes.OK);

        } catch (error) {
            res.locals.data = { error: error }
            logger.error({ error, 'file': 'user.contuserr.ts' });
            return super.send(res, StatusCodes.BAD_REQUEST);
        }
    }
}