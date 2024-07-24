import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import BaseController from '../base.controller';
import { validationResult } from 'express-validator';
import logger from '../../lib/logger';
import { Op } from 'sequelize';
import { RouteDefinition } from '../../types/route.definition';
import { LocationService } from './location.service';
import { createLocationValidator, getLocationValidator, searchValidator, updateLocationValidator } from './location.validator';
import { LocationAttributes } from '../../database/models/location';

export default class LocationController extends BaseController {

    private location: LocationService;
    public basePath = 'locations';

    constructor() {
        super();
        this.location = new LocationService();
    }

    public routes(): RouteDefinition[] {
        return [
            { path: '/', method: 'post', handler: this.createLocation.bind(this), validator: createLocationValidator() },
            { path: '/', method: 'get', handler: this.getLocations.bind(this) },
            { path: '/get-location', method: 'post', handler: this.getLocation.bind(this), validator: getLocationValidator() },
            { path: '/update', method: 'post', handler: this.updateLocation.bind(this), validator: updateLocationValidator() },
            { path: '/delete', method: 'post', handler: this.delete.bind(this), validator: getLocationValidator() },
            { path: '/search', method: 'post', handler: this.search.bind(this), validator: searchValidator()},
        ];
    }

    /**
     * @param req
     * @param res
     */
    public async createLocation(req: Request, res: Response): Promise<void> {
        try {

            let errors = validationResult(req);

            if (!errors.isEmpty()) {
                res.locals.data = errors
                logger.error(errors);
                return super.send(res, StatusCodes.BAD_REQUEST)
            }

            const location: LocationAttributes = await this.location.create(req.body);

            res.locals.data = { location };
            logger.info(location);
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
    public async getLocations(_: Request, res: Response): Promise<void> {
        try {

            const locations = await this.location.find();
            res.locals.data = { locations };
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
    public async getLocation(req: Request, res: Response): Promise<void> {
        try {
            let errors = validationResult(req);

            if (!errors.isEmpty()) {
                res.locals.data = errors
                logger.error(errors);
                return super.send(res, StatusCodes.BAD_REQUEST)
            }

            const location = await this.location.findOne(req.body.location_id);
            res.locals.data = { location };
            logger.info(location);
            return super.send(res, StatusCodes.OK);

        } catch (error) {

            res.locals.data = { error: error }
            logger.error({ error, 'file': 'location.ts' });
            return super.send(res, StatusCodes.BAD_REQUEST);

        }
    }

    /**
     * @param req
     * @param res
     */
    public async updateLocation(req: Request, res: Response): Promise<void> {
        try {
            let errors = validationResult(req);

            if (!errors.isEmpty()) {
                res.locals.data = errors
                logger.error(errors);
                return super.send(res, StatusCodes.BAD_REQUEST)
            }

            const location = await this.location.update(req.body.location_id, req.body);
            res.locals.data = { location };
            logger.info(location);
            return super.send(res, StatusCodes.OK);

        } catch (error) {

            res.locals.data = { error: error }
            logger.error({ error, 'file': 'location.ts' });
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

            const id = req.body.location_id;
            const status: boolean = await this.location.delete(id);

            res.locals.data = {
                status,
                'msg': `Ubicación con id: ${id}, eliminada`
            };

            return super.send(res, StatusCodes.OK);

        } catch (error) {
            res.locals.data = { error: error }
            logger.error({ error, 'file': 'location.ts' });
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

            const locations = await this.location.search(conditions);
            res.locals.data = { locations };
            logger.info(locations);

            return super.send(res, StatusCodes.OK);

        } catch (error) {
            res.locals.data = { error: error }
            logger.error({ error, 'file': 'location.ts' });
            return super.send(res, StatusCodes.BAD_REQUEST);
        }
    }
}