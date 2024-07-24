import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import BaseController from '../base.controller';
import { validationResult } from 'express-validator';
import logger from '../../lib/logger';
import { Op } from 'sequelize';
import { RouteDefinition } from '../../types/route.definition';
import { ClientService } from './client.service';
import { createClientValidator, getClientValidator, searchClientValidator, updateClientValidator } from './client.validator';
import { ClientAttributes } from '../../database/models/client.model';

export default class ClientController extends BaseController {

    private client: ClientService;
    public basePath = 'clients';

    constructor() {
        super();
        this.client = new ClientService();
    }

    public routes(): RouteDefinition[] {
        return [
            { path: '/', method: 'post', handler: this.createClient.bind(this), validator: createClientValidator() },
            { path: '/', method: 'get', handler: this.getClients.bind(this) },
            { path: '/get-client', method: 'post', handler: this.getClient.bind(this), validator: getClientValidator() },
            { path: '/update', method: 'post', handler: this.updateClient.bind(this), validator: updateClientValidator() },
            { path: '/delete', method: 'post', handler: this.delete.bind(this), validator: getClientValidator() },
            { path: '/search', method: 'post', handler: this.search.bind(this), validator: searchClientValidator() },
        ];
    }

    /**
     * @param req
     * @param res
     */
    public async createClient(req: Request, res: Response): Promise<void> {
        try {

            let errors = validationResult(req);

            if (!errors.isEmpty()) {
                res.locals.data = errors
                logger.error(errors);
                return super.send(res, StatusCodes.BAD_REQUEST)
            }

            const client: ClientAttributes = await this.client.create(req.body);

            res.locals.data = { client };
            logger.info(client);
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
    public async getClients(_: Request, res: Response): Promise<void> {
        try {

            const clients = await this.client.find();
            res.locals.data = { clients };
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
    public async getClient(req: Request, res: Response): Promise<void> {
        try {
            let errors = validationResult(req);

            if (!errors.isEmpty()) {
                res.locals.data = errors
                logger.error(errors);
                return super.send(res, StatusCodes.BAD_REQUEST)
            }

            const client = await this.client.findOne(req.body.client_id);
            res.locals.data = { client };
            logger.info(client);
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
    public async updateClient(req: Request, res: Response): Promise<void> {
        try {
            let errors = validationResult(req);

            if (!errors.isEmpty()) {
                res.locals.data = errors
                logger.error(errors);
                return super.send(res, StatusCodes.BAD_REQUEST)
            }

            const client = await this.client.update(req.body.client_id, req.body);
            res.locals.data = { client };
            logger.info(client);
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

            const id = req.body.client_id;
            const status: boolean = await this.client.delete(id);

            res.locals.data = {
                status,
                'msg': `Cliente con id: ${id}, eliminado`
            };

            return super.send(res, StatusCodes.OK);

        } catch (error) {
            res.locals.data = { error: error }
            logger.error({ error, 'file': 'client.ts' });
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

            const clients = await this.client.search(conditions);
            res.locals.data = { clients };
            logger.info(clients);

            return super.send(res, StatusCodes.OK);

        } catch (error) {
            res.locals.data = { error: error }
            logger.error({ error, 'file': 'client.ts' });
            return super.send(res, StatusCodes.BAD_REQUEST);
        }
    }
}