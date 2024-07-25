import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import BaseController from '../base.controller';
import { validationResult } from 'express-validator';
import logger from '../../lib/logger';
import { Op } from 'sequelize';
import { RouteDefinition } from '../../types/route.definition';
import { ContactTypeService } from './contact.type.service';
import { createContactTypeValidator, getContactTypeValidator, searchValidator, updateContactTypeValidator } from './contact.type.validator';
import { ContactTypeAttributes } from '../../database/models/contact.type';

export default class ContactTypeController extends BaseController {

    private contactType: ContactTypeService;
    public basePath = 'contact-types';

    constructor() {
        super();
        this.contactType = new ContactTypeService();
    }

    public routes(): RouteDefinition[] {
        return [
            { path: '/', method: 'post', handler: this.createContactType.bind(this), validator: createContactTypeValidator() },
            { path: '/', method: 'get', handler: this.getContactTypes.bind(this) },
            { path: '/get-contact-type', method: 'post', handler: this.getContactType.bind(this), validator: getContactTypeValidator() },
            { path: '/update', method: 'post', handler: this.updateContactType.bind(this), validator: updateContactTypeValidator() },
            { path: '/delete', method: 'post', handler: this.delete.bind(this), validator: getContactTypeValidator() },
            { path: '/search', method: 'post', handler: this.search.bind(this), validator: searchValidator()},
        ];
    }

    /**
     * @param req
     * @param res
     */
    public async createContactType(req: Request, res: Response): Promise<void> {
        try {

            let errors = validationResult(req);

            if (!errors.isEmpty()) {
                res.locals.data = errors
                logger.error(errors);
                return super.send(res, StatusCodes.BAD_REQUEST)
            }

            const contactType: ContactTypeAttributes = await this.contactType.create(req.body);

            res.locals.data = { contactType };
            logger.info(contactType);
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
    public async getContactTypes(_: Request, res: Response): Promise<void> {
        try {

            const contactTypes = await this.contactType.find();
            res.locals.data = { contactTypes };
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
    public async getContactType(req: Request, res: Response): Promise<void> {
        try {
            let errors = validationResult(req);

            if (!errors.isEmpty()) {
                res.locals.data = errors
                logger.error(errors);
                return super.send(res, StatusCodes.BAD_REQUEST)
            }

            const contactType = await this.contactType.findOne(req.body.contact_type_id);
            res.locals.data = { contactType };
            logger.info(contactType);
            return super.send(res, StatusCodes.OK);

        } catch (error) {

            res.locals.data = { error: error }
            logger.error({ error, 'file': 'contactType.ts' });
            return super.send(res, StatusCodes.BAD_REQUEST);

        }
    }

    /**
     * @param req
     * @param res
     */
    public async updateContactType(req: Request, res: Response): Promise<void> {
        try {
            let errors = validationResult(req);

            if (!errors.isEmpty()) {
                res.locals.data = errors
                logger.error(errors);
                return super.send(res, StatusCodes.BAD_REQUEST)
            }

            const contactType = await this.contactType.update(req.body.contact_type_id, req.body);
            res.locals.data = { contactType };
            logger.info(contactType);
            return super.send(res, StatusCodes.OK);

        } catch (error) {

            res.locals.data = { error: error }
            logger.error({ error, 'file': 'contactType.ts' });
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

            const id = req.body.contact_type_id;
            const status: boolean = await this.contactType.delete(id);

            res.locals.data = {
                status,
                'msg': `Tipo de contacto con id: ${id}, eliminado`
            };

            return super.send(res, StatusCodes.OK);

        } catch (error) {
            res.locals.data = { error: error }
            logger.error({ error, 'file': 'contactType.ts' });
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

            const contactTypes = await this.contactType.search(conditions);
            res.locals.data = { contactTypes };
            logger.info(contactTypes);

            return super.send(res, StatusCodes.OK);

        } catch (error) {
            res.locals.data = { error: error }
            logger.error({ error, 'file': 'contactType.ts' });
            return super.send(res, StatusCodes.BAD_REQUEST);
        }
    }
}