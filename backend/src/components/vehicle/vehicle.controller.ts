import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import BaseController from '../base.controller';
import { validationResult } from 'express-validator';
import logger from '../../lib/logger';
import { Op } from 'sequelize';
import { RouteDefinition } from '../../types/route.definition';
import { VehicleService } from './vehicle.service';
import { createVehicleValidator, getVehicleValidator, searchValidator, updateVehicleValidator } from './vehicle.validator';
import { VehicleAttributes } from '../../database/models/vehicle';

export default class VehicleController extends BaseController {

    private Vehicle: VehicleService;
    public basePath = 'vehicle';

    constructor() {
        super();
        this.Vehicle = new VehicleService();
    }

    public routes(): RouteDefinition[] {
        return [
            { path: '/', method: 'post', handler: this.createVehicle.bind(this), validator: createVehicleValidator() },
            { path: '/', method: 'get', handler: this.getVehicles.bind(this) },
            { path: '/get-vehicle', method: 'post', handler: this.getVehicle.bind(this), validator: getVehicleValidator() },
            { path: '/update', method: 'post', handler: this.updateVehicle.bind(this), validator: updateVehicleValidator() },
            { path: '/delete', method: 'post', handler: this.delete.bind(this), validator: getVehicleValidator() },
            { path: '/search', method: 'post', handler: this.search.bind(this), validator: searchValidator()},
        ];
    }

    /**
     * @param req
     * @param res
     */
    public async createVehicle(req: Request, res: Response): Promise<void> {
        try {

            let errors = validationResult(req);

            if (!errors.isEmpty()) {
                res.locals.data = errors
                logger.error(errors);
                return super.send(res, StatusCodes.BAD_REQUEST)
            }

            const Vehicle: VehicleAttributes = await this.Vehicle.create(req.body);

            res.locals.data = { Vehicle };
            logger.info(Vehicle);
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
    public async getVehicles(_: Request, res: Response): Promise<void> {
        try {

            const Vehicles = await this.Vehicle.find();
            res.locals.data = { Vehicles };
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
    public async getVehicle(req: Request, res: Response): Promise<void> {
        try {
            let errors = validationResult(req);

            if (!errors.isEmpty()) {
                res.locals.data = errors
                logger.error(errors);
                return super.send(res, StatusCodes.BAD_REQUEST)
            }

            const Vehicle = await this.Vehicle.findOne(req.body.vehicle_id);
            res.locals.data = { Vehicle };
            logger.info(Vehicle);
            return super.send(res, StatusCodes.OK);

        } catch (error) {

            res.locals.data = { error: error }
            logger.error({ error, 'file': 'Vehicle.ts' });
            return super.send(res, StatusCodes.BAD_REQUEST);

        }
    }

    /**
     * @param req
     * @param res
     */
    public async updateVehicle(req: Request, res: Response): Promise<void> {
        try {
            let errors = validationResult(req);

            if (!errors.isEmpty()) {
                res.locals.data = errors
                logger.error(errors);
                return super.send(res, StatusCodes.BAD_REQUEST)
            }

            const Vehicle = await this.Vehicle.update(req.body.vehicle_id, req.body);
            res.locals.data = { Vehicle };
            logger.info(Vehicle);
            return super.send(res, StatusCodes.OK);

        } catch (error) {

            res.locals.data = { error: error }
            logger.error({ error, 'file': 'Vehicle.ts' });
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

            const id = req.body.vehicle_id;
            const status: boolean = await this.Vehicle.delete(id);

            res.locals.data = {
                status,
                'msg': `Tipo de identificatione con id: ${id}, eliminado`
            };

            return super.send(res, StatusCodes.OK);

        } catch (error) {
            res.locals.data = { error: error }
            logger.error({ error, 'file': 'Vehicle.ts' });
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

            const Vehicles = await this.Vehicle.search(conditions);
            res.locals.data = { Vehicles };
            logger.info(Vehicles);

            return super.send(res, StatusCodes.OK);

        } catch (error) {
            res.locals.data = { error: error }
            logger.error({ error, 'file': 'Vehicle.ts' });
            return super.send(res, StatusCodes.BAD_REQUEST);
        }
    }
}