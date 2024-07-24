import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import BaseController from '../base.controller';
import { validationResult } from 'express-validator';
import logger from '../../lib/logger';
import { Op } from 'sequelize';
import { ClientTypeService } from './client.type.service';
import { RouteDefinition } from '../../types/route.definition';
import { ClientTypeAttributes } from '../../database/models/client.type.model';
import { createClientTypeValidator, getClientTypeValidator, searchValidator, updateClientTypeValidator } from './client.type.validator';

export default class ClientTypeController extends BaseController {

    private clientType: ClientTypeService;
    public basePath = 'client-types';

    constructor() {
        super();
        this.clientType = new ClientTypeService();
    }

    public routes(): RouteDefinition[] {
        return [
            { path: '/', method: 'post', handler: this.createClientType.bind(this), validator: createClientTypeValidator() },
            { path: '/', method: 'get', handler: this.getClientTypes.bind(this) },
            { path: '/get-client-type', method: 'post', handler: this.getClientType.bind(this), validator: getClientTypeValidator() },
            { path: '/update', method: 'post', handler: this.updateClientType.bind(this), validator: updateClientTypeValidator() },
            { path: '/delete', method: 'post', handler: this.delete.bind(this), validator: getClientTypeValidator() },
            { path: '/search', method: 'post', handler: this.search.bind(this), validator: searchValidator()},
        ];
    }

    /**
     * @param req
     * @param res
     */
    public async createClientType(req: Request, res: Response): Promise<void> {
        try {

            let errors = validationResult(req);

            if (!errors.isEmpty()) {
                res.locals.data = errors
                logger.error(errors);
                return super.send(res, StatusCodes.BAD_REQUEST)
            }

            const clientType: ClientTypeAttributes = await this.clientType.create(req.body);

            res.locals.data = { clientType };
            logger.info(clientType);
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
    public async getClientTypes(_: Request, res: Response): Promise<void> {
        try {

            const clientTypes = await this.clientType.find();
            res.locals.data = { clientTypes };
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
    public async getClientType(req: Request, res: Response): Promise<void> {
        try {
            let errors = validationResult(req);

            if (!errors.isEmpty()) {
                res.locals.data = errors
                logger.error(errors);
                return super.send(res, StatusCodes.BAD_REQUEST)
            }

            const clientType = await this.clientType.findOne(req.body.client_type_id);
            res.locals.data = { clientType };
            logger.info(clientType);
            return super.send(res, StatusCodes.OK);

        } catch (error) {

            res.locals.data = { error: error }
            logger.error({ error, 'file': 'clientType.ts' });
            return super.send(res, StatusCodes.BAD_REQUEST);

        }
    }

    /**
     * @param req
     * @param res
     */
    public async updateClientType(req: Request, res: Response): Promise<void> {
        try {
            let errors = validationResult(req);

            if (!errors.isEmpty()) {
                res.locals.data = errors
                logger.error(errors);
                return super.send(res, StatusCodes.BAD_REQUEST)
            }

            const clientType = await this.clientType.update(req.body.client_type_id, req.body);
            res.locals.data = { clientType };
            logger.info(clientType);
            return super.send(res, StatusCodes.OK);

        } catch (error) {

            res.locals.data = { error: error }
            logger.error({ error, 'file': 'clientType.ts' });
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

            const id = req.body.client_type_id;
            const status: boolean = await this.clientType.delete(id);

            res.locals.data = {
                status,
                'msg': `Tipo de cliente con id: ${id}, eliminado`
            };

            return super.send(res, StatusCodes.OK);

        } catch (error) {
            res.locals.data = { error: error }
            logger.error({ error, 'file': 'clientType.ts' });
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

            const clientTypes = await this.clientType.search(conditions);
            res.locals.data = { clientTypes };
            logger.info(clientTypes);

            return super.send(res, StatusCodes.OK);

        } catch (error) {
            res.locals.data = { error: error }
            logger.error({ error, 'file': 'clientType.ts' });
            return super.send(res, StatusCodes.BAD_REQUEST);
        }
    }
}