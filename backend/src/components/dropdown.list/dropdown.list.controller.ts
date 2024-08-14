import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import BaseController from '../base.controller';
import { validationResult } from 'express-validator';
import logger from '../../lib/logger';
import { Op } from 'sequelize';
import { RouteDefinition } from '../../types/route.definition';
import { DropDownListService } from './dropdown.list.service';
import { createDropDownListValidator, getDropDownListValidator, searchValidator, updateDropDownListValidator } from './dropdown.list.validator';
import { DropDownListAttributes } from '../../database/models/dropdown.list';

export default class DropDownListController extends BaseController {

    private dropdownList: DropDownListService;
    public basePath = 'dropdown-lists';

    constructor() {
        super();
        this.dropdownList = new DropDownListService();
    }

    public routes(): RouteDefinition[] {
        return [
            { path: '/', method: 'post', handler: this.createDropDownList.bind(this), validator: createDropDownListValidator() },
            { path: '/', method: 'get', handler: this.getDropDownLists.bind(this) },
            { path: '/get-dropdown-list', method: 'post', handler: this.getDropDownList.bind(this), validator: getDropDownListValidator() },
            { path: '/update', method: 'post', handler: this.updateDropDownList.bind(this), validator: updateDropDownListValidator() },
            { path: '/delete', method: 'post', handler: this.delete.bind(this), validator: getDropDownListValidator() },
            { path: '/search', method: 'post', handler: this.search.bind(this), validator: searchValidator()},
        ];
    }

    /**
     * @param req
     * @param res
     */
    public async createDropDownList(req: Request, res: Response): Promise<void> {
        try {

            let errors = validationResult(req);

            if (!errors.isEmpty()) {
                res.locals.data = errors
                logger.error(errors);
                return super.send(res, StatusCodes.BAD_REQUEST)
            }

            const dropdownList: DropDownListAttributes = await this.dropdownList.create(req.body);

            res.locals.data = { dropdownList };
            logger.info(dropdownList);
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
    public async getDropDownLists(_: Request, res: Response): Promise<void> {
        try {

            const dropdownLists = await this.dropdownList.find();
            res.locals.data = { dropdownLists };
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
    public async getDropDownList(req: Request, res: Response): Promise<void> {
        try {
            let errors = validationResult(req);

            if (!errors.isEmpty()) {
                res.locals.data = errors
                logger.error(errors);
                return super.send(res, StatusCodes.BAD_REQUEST)
            }

            const dropdownList = await this.dropdownList.findOne(req.body.list_name_id);
            res.locals.data = { dropdownList };
            logger.info(dropdownList);
            return super.send(res, StatusCodes.OK);

        } catch (error) {

            res.locals.data = { error: error }
            logger.error({ error, 'file': 'dropdownList.ts' });
            return super.send(res, StatusCodes.BAD_REQUEST);

        }
    }

    /**
     * @param req
     * @param res
     */
    public async updateDropDownList(req: Request, res: Response): Promise<void> {
        try {
            let errors = validationResult(req);

            if (!errors.isEmpty()) {
                res.locals.data = errors
                logger.error(errors);
                return super.send(res, StatusCodes.BAD_REQUEST)
            }

            const dropdownList = await this.dropdownList.update(req.body.list_name_id, req.body);
            res.locals.data = { dropdownList };
            logger.info(dropdownList);
            return super.send(res, StatusCodes.OK);

        } catch (error) {

            res.locals.data = { error: error }
            logger.error({ error, 'file': 'dropdownList.ts' });
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

            const id = req.body.list_name_id;
            const status: boolean = await this.dropdownList.delete(id);

            res.locals.data = {
                status,
                'msg': `Lista con id: ${id}, eliminado`
            };

            return super.send(res, StatusCodes.OK);

        } catch (error) {
            res.locals.data = { error: error }
            logger.error({ error, 'file': 'dropdownList.ts' });
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

            const dropdownLists = await this.dropdownList.search(conditions);
            res.locals.data = { dropdownLists };
            logger.info(dropdownLists);

            return super.send(res, StatusCodes.OK);

        } catch (error) {
            res.locals.data = { error: error }
            logger.error({ error, 'file': 'dropdownList.ts' });
            return super.send(res, StatusCodes.BAD_REQUEST);
        }
    }
}