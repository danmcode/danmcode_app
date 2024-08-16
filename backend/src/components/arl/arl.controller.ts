import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import BaseController from '../base.controller';
import { validationResult } from 'express-validator';
import logger from '../../lib/logger';
import { Op } from 'sequelize';
import { RouteDefinition } from '../../types/route.definition';
import { ArlService } from './arl.service';
import { createARLValidator, getARLValidator, searchValidator, updateARLValidator } from './arl.validator';
import { ArlAttributes } from '../../database/models/arl';

export default class ArlController extends BaseController {

    private arl: ArlService;
    public basePath = 'arl';

    constructor() {
        super();
        this.arl = new ArlService();
    }

    public routes(): RouteDefinition[] {
        return [
            { path: '/', method: 'post', handler: this.createArl.bind(this), validator: createARLValidator() },
            { path: '/', method: 'get', handler: this.getArls.bind(this) },
            { path: '/get-arl', method: 'post', handler: this.getArl.bind(this), validator: getARLValidator() },
            { path: '/update', method: 'post', handler: this.updateArl.bind(this), validator: updateARLValidator() },
            { path: '/delete', method: 'post', handler: this.delete.bind(this), validator: getARLValidator() },
            { path: '/search', method: 'post', handler: this.search.bind(this), validator: searchValidator()},
        ];
    }

    /**
     * @param req
     * @param res
     */
    public async createArl(req: Request, res: Response): Promise<void> {
        try {

            let errors = validationResult(req);

            if (!errors.isEmpty()) {
                res.locals.data = errors
                logger.error(errors);
                return super.send(res, StatusCodes.BAD_REQUEST)
            }

            const arl: ArlAttributes = await this.arl.create(req.body);

            res.locals.data = { arl };
            logger.info(arl);
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
    public async getArls(_: Request, res: Response): Promise<void> {
        try {

            const arls = await this.arl.find();
            res.locals.data = { arls };
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
    public async getArl(req: Request, res: Response): Promise<void> {
        try {
            let errors = validationResult(req);

            if (!errors.isEmpty()) {
                res.locals.data = errors
                logger.error(errors);
                return super.send(res, StatusCodes.BAD_REQUEST)
            }

            const arl = await this.arl.findOne(req.body.arl_id);
            res.locals.data = { arl };
            logger.info(arl);
            return super.send(res, StatusCodes.OK);

        } catch (error) {

            res.locals.data = { error: error }
            logger.error({ error, 'file': 'arl.ts' });
            return super.send(res, StatusCodes.BAD_REQUEST);

        }
    }

    /**
     * @param req
     * @param res
     */
    public async updateArl(req: Request, res: Response): Promise<void> {
        try {
            let errors = validationResult(req);

            if (!errors.isEmpty()) {
                res.locals.data = errors
                logger.error(errors);
                return super.send(res, StatusCodes.BAD_REQUEST)
            }

            const arl = await this.arl.update(req.body.arl_id, req.body);
            res.locals.data = { arl };
            logger.info(arl);
            return super.send(res, StatusCodes.OK);

        } catch (error) {

            res.locals.data = { error: error }
            logger.error({ error, 'file': 'arl.ts' });
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

            const id = req.body.arl_id;
            const status: boolean = await this.arl.delete(id);

            res.locals.data = {
                status,
                'msg': `Arl con id: ${id}, eliminado`
            };

            return super.send(res, StatusCodes.OK);

        } catch (error) {
            res.locals.data = { error: error }
            logger.error({ error, 'file': 'arl.ts' });
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

            const arls = await this.arl.search(conditions);
            res.locals.data = { arls };
            logger.info(arls);

            return super.send(res, StatusCodes.OK);

        } catch (error) {
            res.locals.data = { error: error }
            logger.error({ error, 'file': 'arl.ts' });
            return super.send(res, StatusCodes.BAD_REQUEST);
        }
    }
}