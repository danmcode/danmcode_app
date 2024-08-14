import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import BaseController from '../base.controller';
import { validationResult } from 'express-validator';
import logger from '../../lib/logger';
import { Op } from 'sequelize';
import { RouteDefinition } from '../../types/route.definition';
import { DropDownListItemService } from './dropdown.list.item.service';
import { createDropDownListItemValidator, getDropDownListItemValidator, searchValidator, updateDropDownListItemValidator } from './dropdown.list.item.validator';
import { DropDownListItemAttributes } from '../../database/models/dropdown.list.item';

export default class DropDownListItemController extends BaseController {

    private dropdownListItem: DropDownListItemService;
    public basePath = 'dropdown-lists-item';

    constructor() {
        super();
        this.dropdownListItem = new DropDownListItemService();
    }

    public routes(): RouteDefinition[] {
        return [
            { path: '/', method: 'post', handler: this.createDropDownListItem.bind(this), validator: createDropDownListItemValidator() },
            { path: '/', method: 'get', handler: this.getDropDownListItems.bind(this) },
            { path: '/get-dropdown-list-item', method: 'post', handler: this.getDropDownListItem.bind(this), validator: getDropDownListItemValidator() },
            { path: '/update', method: 'post', handler: this.updateDropDownListItem.bind(this), validator: updateDropDownListItemValidator() },
            { path: '/delete', method: 'post', handler: this.delete.bind(this), validator: getDropDownListItemValidator() },
            { path: '/search', method: 'post', handler: this.search.bind(this), validator: searchValidator()},
        ];
    }

    /**
     * @param req
     * @param res
     */
    public async createDropDownListItem(req: Request, res: Response): Promise<void> {
        try {

            let errors = validationResult(req);

            if (!errors.isEmpty()) {
                res.locals.data = errors
                logger.error(errors);
                return super.send(res, StatusCodes.BAD_REQUEST)
            }

            const dropdownListItem: DropDownListItemAttributes = await this.dropdownListItem.create(req.body);

            res.locals.data = { dropdownListItem };
            logger.info(dropdownListItem);
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
    public async getDropDownListItems(_: Request, res: Response): Promise<void> {
        try {

            const dropdownListItems = await this.dropdownListItem.find();
            res.locals.data = { dropdownListItems };
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
    public async getDropDownListItem(req: Request, res: Response): Promise<void> {
        try {
            let errors = validationResult(req);

            if (!errors.isEmpty()) {
                res.locals.data = errors
                logger.error(errors);
                return super.send(res, StatusCodes.BAD_REQUEST)
            }

            const dropdownListItem = await this.dropdownListItem.findOne(req.body.list_item_id);
            res.locals.data = { dropdownListItem };
            logger.info(dropdownListItem);
            return super.send(res, StatusCodes.OK);

        } catch (error) {

            res.locals.data = { error: error }
            logger.error({ error, 'file': 'dropdownListItem.ts' });
            return super.send(res, StatusCodes.BAD_REQUEST);

        }
    }

    /**
     * @param req
     * @param res
     */
    public async updateDropDownListItem(req: Request, res: Response): Promise<void> {
        try {
            let errors = validationResult(req);

            if (!errors.isEmpty()) {
                res.locals.data = errors
                logger.error(errors);
                return super.send(res, StatusCodes.BAD_REQUEST)
            }

            const dropdownListItem = await this.dropdownListItem.update(req.body.list_item_id, req.body);
            res.locals.data = { dropdownListItem };
            logger.info(dropdownListItem);
            return super.send(res, StatusCodes.OK);

        } catch (error) {

            res.locals.data = { error: error }
            logger.error({ error, 'file': 'dropdownListItem.ts' });
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

            const id = req.body.list_item_id;
            const status: boolean = await this.dropdownListItem.delete(id);

            res.locals.data = {
                status,
                'msg': `Lista con id: ${id}, eliminado`
            };

            return super.send(res, StatusCodes.OK);

        } catch (error) {
            res.locals.data = { error: error }
            logger.error({ error, 'file': 'dropdownListItem.ts' });
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

            const dropdownListItems = await this.dropdownListItem.search(conditions);
            res.locals.data = { dropdownListItems };
            logger.info(dropdownListItems);

            return super.send(res, StatusCodes.OK);

        } catch (error) {
            res.locals.data = { error: error }
            logger.error({ error, 'file': 'dropdownListItem.ts' });
            return super.send(res, StatusCodes.BAD_REQUEST);
        }
    }
}