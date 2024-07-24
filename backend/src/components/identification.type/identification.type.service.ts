import { StatusCodes } from "http-status-codes";
import ApiError from "../../abstractions/api.error";
import logger from "../../lib/logger";
import { IdentificationType, IdentificationTypeAttributes, IdentificationTypeCreationAttributes } from "../../database/models/identification.type";

export class IdentificationTypeService {

    async create(payload: IdentificationTypeCreationAttributes): Promise<IdentificationTypeAttributes> {
        try {
            const identificationType = await IdentificationType.create(payload);
            return identificationType;
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

    async find() {
        try {
            const identificationTypes = await IdentificationType.findAll({ where: { is_active: true } });
            return identificationTypes;
        } catch (error) {
            logger.error(error);
            throw error
        }
    }

    async findOne(id: string): Promise<IdentificationType> {
        try {
            const identificationType = await IdentificationType.findByPk(id);
            return identificationType!;
        } catch (error) {
            logger.error(error);
            throw new ApiError(`Id: ${id} No encontrado`, StatusCodes.NOT_FOUND);
        }
    }

    async update(id: string, payload: IdentificationTypeCreationAttributes): Promise<IdentificationType> {
        try {
            const identificationType = await IdentificationType.findByPk(id);
            if (!identificationType) {
                throw new ApiError('Tipo de identificación no encontrada', StatusCodes.NOT_FOUND);
            }

            const updatedRol = await identificationType!.update(payload);
            return updatedRol;

        } catch (error) {
            logger.error({ error, 'updated': 'update identificationType' });
            throw error
        }
    }

    async delete(id: string): Promise<boolean> {
        try {
            const identificationType = await IdentificationType.findByPk(id);
            console.log(identificationType);
            if (identificationType) {
                identificationType.is_active = false;
                await identificationType.save();
                return true;
            }

            return false;

        } catch (error) {
            logger.error(error);
            throw error
        }
    }

    async search(query: any): Promise<IdentificationType[]> {
        try {
            const identificationTypes = await IdentificationType.findAll({ where: query });
            return identificationTypes;
        } catch (error) {
            logger.error(error);
            throw error
        }
    }

}