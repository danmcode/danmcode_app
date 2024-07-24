import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import BaseController from '../base.controller';
import { validationResult } from 'express-validator';
import logger from '../../lib/logger';
import { Op } from 'sequelize';
import { RouteDefinition } from '../../types/route.definition';
import { LocationTypeService } from './location.type.service';
import { createLocationTypeValidator, getLocationTypeValidator, searchValidator, updateLocationTypeValidator } from './location.type.validator';

export default class LocationTypeController extends BaseController {

    private locationType: LocationTypeService;
    public basePath = 'location-types';

    constructor() {
        super();
        this.locationType = new LocationTypeService();
    }

    public routes(): RouteDefinition[] {
        return [
            { path: '/', method: 'post', handler: this.createLocationType.bind(this), validator: createLocationTypeValidator() },
            { path: '/', method: 'get', handler: this.getLocationTypes.bind(this) },
            { path: '/get-location-type', method: 'post', handler: this.getLocationType.bind(this), validator: getLocationTypeValidator() },
            { path: '/update', method: 'post', handler: this.updateLocationType.bind(this), validator: updateLocationTypeValidator() },
            { path: '/delete', method: 'post', handler: this.delete.bind(this), validator: getLocationTypeValidator() },
            { path: '/search', method: 'post', handler: this.search.bind(this), validator: searchValidator()},
        ];
    }

    /**
     * @param req
     * @param res
     */
    public async createLocationType(req: Request, res: Response): Promise<void> {
        try {

            let errors = validationResult(req);

            if (!errors.isEmpty()) {
                res.locals.data = errors
                logger.error(errors);
                return super.send(res, StatusCodes.BAD_REQUEST)
            }

            const locationType: LocationTypeAttributes = await this.locationType.create(req.body);

            res.locals.data = { locationType };
            logger.info(locationType);
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
    public async getLocationTypes(_: Request, res: Response): Promise<void> {
        try {

            const locationTypes = await this.locationType.find();
            res.locals.data = { locationTypes };
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
    public async getLocationType(req: Request, res: Response): Promise<void> {
        try {
            let errors = validationResult(req);

            if (!errors.isEmpty()) {
                res.locals.data = errors
                logger.error(errors);
                return super.send(res, StatusCodes.BAD_REQUEST)
            }

            const locationType = await this.locationType.findOne(req.body.location_type_id);
            res.locals.data = { locationType };
            logger.info(locationType);
            return super.send(res, StatusCodes.OK);

        } catch (error) {

            res.locals.data = { error: error }
            logger.error({ error, 'file': 'locationType.ts' });
            return super.send(res, StatusCodes.BAD_REQUEST);

        }
    }

    /**
     * @param req
     * @param res
     */
    public async updateLocationType(req: Request, res: Response): Promise<void> {
        try {
            let errors = validationResult(req);

            if (!errors.isEmpty()) {
                res.locals.data = errors
                logger.error(errors);
                return super.send(res, StatusCodes.BAD_REQUEST)
            }

            const locationType = await this.locationType.update(req.body.location_type_id, req.body);
            res.locals.data = { locationType };
            logger.info(locationType);
            return super.send(res, StatusCodes.OK);

        } catch (error) {

            res.locals.data = { error: error }
            logger.error({ error, 'file': 'locationType.ts' });
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

            const id = req.body.location_type_id;
            const status: boolean = await this.locationType.delete(id);

            res.locals.data = {
                status,
                'msg': `Tipo de locatione con id: ${id}, eliminado`
            };

            return super.send(res, StatusCodes.OK);

        } catch (error) {
            res.locals.data = { error: error }
            logger.error({ error, 'file': 'locationType.ts' });
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

            const locationTypes = await this.locationType.search(conditions);
            res.locals.data = { locationTypes };
            logger.info(locationTypes);

            return super.send(res, StatusCodes.OK);

        } catch (error) {
            res.locals.data = { error: error }
            logger.error({ error, 'file': 'locationType.ts' });
            return super.send(res, StatusCodes.BAD_REQUEST);
        }
    }
}