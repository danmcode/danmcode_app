import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import BaseController from '../base.controller';
import { validationResult } from 'express-validator';
import logger from '../../lib/logger';
import { Op } from 'sequelize';
import { RouteDefinition } from '../../types/route.definition';
import { IdentificationTypeAttributes } from '../../database/models/identification.type';
import { IdentificationTypeService } from '../identification.type/identification.type.service';
import { createIdentificationTypeValidator, getIdentificationTypeValidator, searchValidator, updateIdentificationTypeValidator } from '../identification.type/identification.type.validator';

export default class IdentificationTypeController extends BaseController {

    private identificationType: IdentificationTypeService;
    public basePath = 'identification-types';

    constructor() {
        super();
        this.identificationType = new IdentificationTypeService();
    }

    public routes(): RouteDefinition[] {
        return [
            { path: '/', method: 'post', handler: this.createIdentificationType.bind(this), validator: createIdentificationTypeValidator() },
            { path: '/', method: 'get', handler: this.getIdentificationTypes.bind(this) },
            { path: '/get-identification-type', method: 'post', handler: this.getIdentificationType.bind(this), validator: getIdentificationTypeValidator() },
            { path: '/update', method: 'post', handler: this.updateIdentificationType.bind(this), validator: updateIdentificationTypeValidator() },
            { path: '/delete', method: 'post', handler: this.delete.bind(this), validator: getIdentificationTypeValidator() },
            { path: '/search', method: 'post', handler: this.search.bind(this), validator: searchValidator()},
        ];
    }

    /**
     * @param req
     * @param res
     */
    public async createIdentificationType(req: Request, res: Response): Promise<void> {
        try {

            let errors = validationResult(req);

            if (!errors.isEmpty()) {
                res.locals.data = errors
                logger.error(errors);
                return super.send(res, StatusCodes.BAD_REQUEST)
            }

            const identificationType: IdentificationTypeAttributes = await this.identificationType.create(req.body);

            res.locals.data = { identificationType };
            logger.info(identificationType);
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
    public async getIdentificationTypes(_: Request, res: Response): Promise<void> {
        try {

            const identificationTypes = await this.identificationType.find();
            res.locals.data = { identificationTypes };
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
    public async getIdentificationType(req: Request, res: Response): Promise<void> {
        try {
            let errors = validationResult(req);

            if (!errors.isEmpty()) {
                res.locals.data = errors
                logger.error(errors);
                return super.send(res, StatusCodes.BAD_REQUEST)
            }

            const identificationType = await this.identificationType.findOne(req.body.identification_type_id);
            res.locals.data = { identificationType };
            logger.info(identificationType);
            return super.send(res, StatusCodes.OK);

        } catch (error) {

            res.locals.data = { error: error }
            logger.error({ error, 'file': 'identificationType.ts' });
            return super.send(res, StatusCodes.BAD_REQUEST);

        }
    }

    /**
     * @param req
     * @param res
     */
    public async updateIdentificationType(req: Request, res: Response): Promise<void> {
        try {
            let errors = validationResult(req);

            if (!errors.isEmpty()) {
                res.locals.data = errors
                logger.error(errors);
                return super.send(res, StatusCodes.BAD_REQUEST)
            }

            const identificationType = await this.identificationType.update(req.body.identification_type_id, req.body);
            res.locals.data = { identificationType };
            logger.info(identificationType);
            return super.send(res, StatusCodes.OK);

        } catch (error) {

            res.locals.data = { error: error }
            logger.error({ error, 'file': 'identificationType.ts' });
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

            const id = req.body.identification_type_id;
            const status: boolean = await this.identificationType.delete(id);

            res.locals.data = {
                status,
                'msg': `Tipo de identificatione con id: ${id}, eliminado`
            };

            return super.send(res, StatusCodes.OK);

        } catch (error) {
            res.locals.data = { error: error }
            logger.error({ error, 'file': 'identificationType.ts' });
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

            const identificationTypes = await this.identificationType.search(conditions);
            res.locals.data = { identificationTypes };
            logger.info(identificationTypes);

            return super.send(res, StatusCodes.OK);

        } catch (error) {
            res.locals.data = { error: error }
            logger.error({ error, 'file': 'identificationType.ts' });
            return super.send(res, StatusCodes.BAD_REQUEST);
        }
    }
}