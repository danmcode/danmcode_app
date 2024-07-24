import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import BaseController from '../base.controller';
import { validationResult } from 'express-validator';
import logger from '../../lib/logger';
import { Op } from 'sequelize';
import { RouteDefinition } from '../../types/route.definition';
import { SubLocationService } from './sub.location.service';
import { createSubLocationValidator, getSubLocationValidator, searchValidator, updateSubLocationValidator } from './sub.location.validator';
import { SubLocationAttributes } from '../../database/models/sub.location';

export default class SubLocationController extends BaseController {

    private subLocation: SubLocationService;
    public basePath = 'sub-locations';

    constructor() {
        super();
        this.subLocation = new SubLocationService();
    }

    public routes(): RouteDefinition[] {
        return [
            { path: '/', method: 'post', handler: this.createSubLocation.bind(this), validator: createSubLocationValidator() },
            { path: '/', method: 'get', handler: this.getSubLocations.bind(this) },
            { path: '/get-sub-location', method: 'post', handler: this.getSubLocation.bind(this), validator: getSubLocationValidator() },
            { path: '/update', method: 'post', handler: this.updateSubLocation.bind(this), validator: updateSubLocationValidator() },
            { path: '/delete', method: 'post', handler: this.delete.bind(this), validator: getSubLocationValidator() },
            { path: '/search', method: 'post', handler: this.search.bind(this), validator: searchValidator()},
        ];
    }

    /**
     * @param req
     * @param res
     */
    public async createSubLocation(req: Request, res: Response): Promise<void> {
        try {

            let errors = validationResult(req);

            if (!errors.isEmpty()) {
                res.locals.data = errors
                logger.error(errors);
                return super.send(res, StatusCodes.BAD_REQUEST)
            }

            const subLocation: SubLocationAttributes = await this.subLocation.create(req.body);

            res.locals.data = { subLocation };
            logger.info(subLocation);
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
    public async getSubLocations(_: Request, res: Response): Promise<void> {
        try {

            const subLocations = await this.subLocation.find();
            res.locals.data = { subLocations };
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
    public async getSubLocation(req: Request, res: Response): Promise<void> {
        try {
            let errors = validationResult(req);

            if (!errors.isEmpty()) {
                res.locals.data = errors
                logger.error(errors);
                return super.send(res, StatusCodes.BAD_REQUEST)
            }

            const subLocation = await this.subLocation.findOne(req.body.sub_location_id);
            res.locals.data = { subLocation };
            logger.info(subLocation);
            return super.send(res, StatusCodes.OK);

        } catch (error) {

            res.locals.data = { error: error }
            logger.error({ error, 'file': 'subLocation.ts' });
            return super.send(res, StatusCodes.BAD_REQUEST);

        }
    }

    /**
     * @param req
     * @param res
     */
    public async updateSubLocation(req: Request, res: Response): Promise<void> {
        try {
            let errors = validationResult(req);

            if (!errors.isEmpty()) {
                res.locals.data = errors
                logger.error(errors);
                return super.send(res, StatusCodes.BAD_REQUEST)
            }

            const subLocation = await this.subLocation.update(req.body.sub_location_id, req.body);
            res.locals.data = { subLocation };
            logger.info(subLocation);
            return super.send(res, StatusCodes.OK);

        } catch (error) {

            res.locals.data = { error: error }
            logger.error({ error, 'file': 'subLocation.ts' });
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

            const id = req.body.sub_location_id;
            const status: boolean = await this.subLocation.delete(id);

            res.locals.data = {
                status,
                'msg': `Sub Ubicación con id: ${id}, eliminada`
            };

            return super.send(res, StatusCodes.OK);

        } catch (error) {
            res.locals.data = { error: error }
            logger.error({ error, 'file': 'subLocation.ts' });
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

            const subLocations = await this.subLocation.search(conditions);
            res.locals.data = { subLocations };
            logger.info(subLocations);

            return super.send(res, StatusCodes.OK);

        } catch (error) {
            res.locals.data = { error: error }
            logger.error({ error, 'file': 'subLocation.ts' });
            return super.send(res, StatusCodes.BAD_REQUEST);
        }
    }
}