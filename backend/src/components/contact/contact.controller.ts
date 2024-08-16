import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import BaseController from '../base.controller';
import { validationResult } from 'express-validator';
import logger from '../../lib/logger';
import { Op } from 'sequelize';
import { RouteDefinition } from '../../types/route.definition';
import { ContactService } from './contact.service';
import { createContactValidator, getContactValidator, searchValidator, updateContactValidator } from './contact.validator';
import { ContactAttributes } from '../../database/models/contact';

export default class ContactController extends BaseController {

    private contact: ContactService;
    public basePath = 'contact';

    constructor() {
        super();
        this.contact = new ContactService();
    }

    public routes(): RouteDefinition[] {
        return [
            { path: '/', method: 'post', handler: this.createContact.bind(this), validator: createContactValidator() },
            { path: '/', method: 'get', handler: this.getContacts.bind(this) },
            { path: '/get-contact', method: 'post', handler: this.getContact.bind(this), validator: getContactValidator() },
            { path: '/update', method: 'post', handler: this.updateContact.bind(this), validator: updateContactValidator() },
            { path: '/delete', method: 'post', handler: this.delete.bind(this), validator: getContactValidator() },
            { path: '/search', method: 'post', handler: this.search.bind(this), validator: searchValidator()},
        ];
    }

    /**
     * @param req
     * @param res
     */
    public async createContact(req: Request, res: Response): Promise<void> {
        try {

            let errors = validationResult(req);

            if (!errors.isEmpty()) {
                res.locals.data = errors
                logger.error(errors);
                return super.send(res, StatusCodes.BAD_REQUEST)
            }

            const contact: ContactAttributes = await this.contact.create(req.body);

            res.locals.data = { contact };
            logger.info(contact);
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
    public async getContacts(_: Request, res: Response): Promise<void> {
        try {

            const contacts = await this.contact.find();
            res.locals.data = { contacts };
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
    public async getContact(req: Request, res: Response): Promise<void> {
        try {
            let errors = validationResult(req);

            if (!errors.isEmpty()) {
                res.locals.data = errors
                logger.error(errors);
                return super.send(res, StatusCodes.BAD_REQUEST)
            }

            const contact = await this.contact.findOne(req.body.contact_id);
            res.locals.data = { contact };
            logger.info(contact);
            return super.send(res, StatusCodes.OK);

        } catch (error) {

            res.locals.data = { error: error }
            logger.error({ error, 'file': 'contact.ts' });
            return super.send(res, StatusCodes.BAD_REQUEST);

        }
    }

    /**
     * @param req
     * @param res
     */
    public async updateContact(req: Request, res: Response): Promise<void> {
        try {
            let errors = validationResult(req);

            if (!errors.isEmpty()) {
                res.locals.data = errors
                logger.error(errors);
                return super.send(res, StatusCodes.BAD_REQUEST)
            }

            const contact = await this.contact.update(req.body.contact_id, req.body);
            res.locals.data = { contact };
            logger.info(contact);
            return super.send(res, StatusCodes.OK);

        } catch (error) {

            res.locals.data = { error: error }
            logger.error({ error, 'file': 'contact.ts' });
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
            const status: boolean = await this.contact.delete(id);

            res.locals.data = {
                status,
                'msg': `Contacto con id: ${id}, eliminado`
            };

            return super.send(res, StatusCodes.OK);

        } catch (error) {
            res.locals.data = { error: error }
            logger.error({ error, 'file': 'contact.ts' });
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

            const contacts = await this.contact.search(conditions);
            res.locals.data = { contacts };
            logger.info(contacts);

            return super.send(res, StatusCodes.OK);

        } catch (error) {
            res.locals.data = { error: error }
            logger.error({ error, 'file': 'contact.ts' });
            return super.send(res, StatusCodes.BAD_REQUEST);
        }
    }
}