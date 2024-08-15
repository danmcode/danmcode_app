import { StatusCodes } from "http-status-codes";
import ApiError from "../../abstractions/api.error";
import logger from "../../lib/logger";
import { JobTitle, JobTitleAttributes, JobTitleCreationAttributes } from "../../database/models/job.titles.model";

export class JobTitleService {

    async create(payload: JobTitleCreationAttributes): Promise<JobTitleAttributes> {
        try {
            const jobTitle = await JobTitle.create(payload);
            return jobTitle;
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

    async find() {
        try {
            const jobTitles = await JobTitle.findAll({ where: { is_active: true } });
            return jobTitles;
        } catch (error) {
            logger.error(error);
            throw error
        }
    }

    async findOne(id: string): Promise<JobTitle> {
        try {
            const jobTitle = await JobTitle.findByPk(id);
            return jobTitle!;
        } catch (error) {
            logger.error(error);
            throw new ApiError(`Id: ${id} No encontrado`, StatusCodes.NOT_FOUND);
        }
    }

    async update(id: string, payload: JobTitleCreationAttributes): Promise<JobTitle> {
        try {
            const jobTitle = await JobTitle.findByPk(id);
            if (!jobTitle) {
                throw new ApiError('Rol no encontrado', StatusCodes.NOT_FOUND);
            }

            const updatedRol = await jobTitle!.update(payload);
            return updatedRol;

        } catch (error) {
            logger.error({ error, 'updated': 'update jobTitle' });
            throw error
        }
    }

    async delete(id: string): Promise<boolean> {
        try {
            const jobTitle = await JobTitle.findByPk(id);
            console.log(jobTitle);
            if (jobTitle) {
                jobTitle.is_active = false;
                await jobTitle.save();
                return true;
            }

            return false;

        } catch (error) {
            logger.error(error);
            throw error
        }
    }

    async search(query: any): Promise<JobTitle[]> {
        try {
            const jobTitles = await JobTitle.findAll({ where: query });
            return jobTitles;
        } catch (error) {
            logger.error(error);
            throw error
        }
    }

}