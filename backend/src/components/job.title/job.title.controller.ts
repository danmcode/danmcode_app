import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import BaseController from '../base.controller';
import { validationResult } from 'express-validator';
import logger from '../../lib/logger';
import { Op } from 'sequelize';
import { RouteDefinition } from '../../types/route.definition';
import { JobTitleService } from './job.title.service';
import { createJobTitleValidator, getJobTitleValidator, searchValidator, updateJobTitleValidator } from './job.title.validator';
import { JobTitleAttributes } from '../../database/models/job.titles.model';

export default class JobTitleController extends BaseController {

    private jobTitle: JobTitleService;
    public basePath = 'job-title';

    constructor() {
        super();
        this.jobTitle = new JobTitleService();
    }

    public routes(): RouteDefinition[] {
        return [
            { path: '/', method: 'post', handler: this.createJobTitle.bind(this), validator: createJobTitleValidator() },
            { path: '/', method: 'get', handler: this.getJobTitles.bind(this) },
            { path: '/get-job-title', method: 'post', handler: this.getJobTitle.bind(this), validator: getJobTitleValidator() },
            { path: '/update', method: 'post', handler: this.updateJobTitle.bind(this), validator: updateJobTitleValidator() },
            { path: '/delete', method: 'post', handler: this.delete.bind(this), validator: getJobTitleValidator() },
            { path: '/search', method: 'post', handler: this.search.bind(this), validator: searchValidator()},
        ];
    }

    /**
     * @param req
     * @param res
     */
    public async createJobTitle(req: Request, res: Response): Promise<void> {
        try {

            let errors = validationResult(req);

            if (!errors.isEmpty()) {
                res.locals.data = errors
                logger.error(errors);
                return super.send(res, StatusCodes.BAD_REQUEST)
            }

            const jobTitle: JobTitleAttributes = await this.jobTitle.create(req.body);

            res.locals.data = { jobTitle };
            logger.info(jobTitle);
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
    public async getJobTitles(_: Request, res: Response): Promise<void> {
        try {

            const jobTitles = await this.jobTitle.find();
            res.locals.data = { jobTitles };
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
    public async getJobTitle(req: Request, res: Response): Promise<void> {
        try {
            let errors = validationResult(req);

            if (!errors.isEmpty()) {
                res.locals.data = errors
                logger.error(errors);
                return super.send(res, StatusCodes.BAD_REQUEST)
            }

            const jobTitle = await this.jobTitle.findOne(req.body.job_title_id);
            res.locals.data = { jobTitle };
            logger.info(jobTitle);
            return super.send(res, StatusCodes.OK);

        } catch (error) {

            res.locals.data = { error: error }
            logger.error({ error, 'file': 'jobTitle.ts' });
            return super.send(res, StatusCodes.BAD_REQUEST);

        }
    }

    /**
     * @param req
     * @param res
     */
    public async updateJobTitle(req: Request, res: Response): Promise<void> {
        try {
            let errors = validationResult(req);

            if (!errors.isEmpty()) {
                res.locals.data = errors
                logger.error(errors);
                return super.send(res, StatusCodes.BAD_REQUEST)
            }

            const jobTitle = await this.jobTitle.update(req.body.job_title_id, req.body);
            res.locals.data = { jobTitle };
            logger.info(jobTitle);
            return super.send(res, StatusCodes.OK);

        } catch (error) {

            res.locals.data = { error: error }
            logger.error({ error, 'file': 'jobTitle.ts' });
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

            const id = req.body.job_title_id;
            const status: boolean = await this.jobTitle.delete(id);

            res.locals.data = {
                status,
                'msg': `Registro con id: ${id}, eliminado`
            };

            return super.send(res, StatusCodes.OK);

        } catch (error) {
            res.locals.data = { error: error }
            logger.error({ error, 'file': 'jobTitle.ts' });
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

            const jobTitles = await this.jobTitle.search(conditions);
            res.locals.data = { jobTitles };
            logger.info(jobTitles);

            return super.send(res, StatusCodes.OK);

        } catch (error) {
            res.locals.data = { error: error }
            logger.error({ error, 'file': 'jobTitle.ts' });
            return super.send(res, StatusCodes.BAD_REQUEST);
        }
    }
}