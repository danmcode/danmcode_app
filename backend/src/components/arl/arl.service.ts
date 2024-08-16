import { StatusCodes } from "http-status-codes";
import ApiError from "../../abstractions/api.error";
import logger from "../../lib/logger";
import { Arl, ArlAttributes, ArlCreationAttributes } from "../../database/models/arl";

export class ArlService {

    async create(payload: ArlCreationAttributes): Promise<ArlAttributes> {
        try {
            const arl = await Arl.create(payload);
            return arl;
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

    async find() {
        try {
            const arls = await Arl.findAll({ where: { is_active: true } });
            return arls;
        } catch (error) {
            logger.error(error);
            throw error
        }
    }

    async findOne(id: string): Promise<Arl> {
        try {
            const arl = await Arl.findByPk(id);
            return arl!;
        } catch (error) {
            logger.error(error);
            throw new ApiError(`Id: ${id} No encontrado`, StatusCodes.NOT_FOUND);
        }
    }

    async update(id: string, payload: ArlCreationAttributes): Promise<Arl> {
        try {
            const arl = await Arl.findByPk(id);
            if (!arl) {
                throw new ApiError('Arl no encontrada', StatusCodes.NOT_FOUND);
            }

            const updatedRol = await arl!.update(payload);
            return updatedRol;

        } catch (error) {
            logger.error({ error, 'updated': 'update arl' });
            throw error
        }
    }

    async delete(id: string): Promise<boolean> {
        try {
            const arl = await Arl.findByPk(id);
            console.log(arl);
            if (arl) {
                arl.is_active = false;
                await arl.save();
                return true;
            }

            return false;

        } catch (error) {
            logger.error(error);
            throw error
        }
    }

    async search(query: any): Promise<Arl[]> {
        try {
            const arls = await Arl.findAll({ where: query });
            return arls;
        } catch (error) {
            logger.error(error);
            throw error
        }
    }

}