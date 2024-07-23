import { NextFunction, Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import BaseController from '../base.controller';
import { RoleAttributes } from '../../database/models/role.model';
import ApiError from '../../abstractions/api.error';
import { RouteDefinition } from '../../types/route.definition';
import { RoleService } from './role.service';

export default class RoleController extends BaseController {

    private role: RoleService;
    public basePath = 'roles';

    constructor() {
        super();
        this.role = new RoleService();
    }

    public routes(): RouteDefinition[] {
        return [
            {
                path: '/',
                method: 'post',
                handler: this.createRole.bind(this),
            }
        ];
    }

    /**
     *
     * @param req
     * @param res
     * @param next
     */
    public async createRole(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {

            const { role_name, description} = req.body;
            if (!role_name && !description) {
                throw new ApiError(
                    ReasonPhrases.BAD_REQUEST,
                    StatusCodes.BAD_REQUEST,
                );
            }

            const role: RoleAttributes = await this.role.create({
                role_name,
                description,
            });

            res.locals.data = {
                role,
            };

            super.send(res, StatusCodes.CREATED);

        } catch (err) {
            next(err);
        }
    }






}