import { StatusCodes } from "http-status-codes";
import ApiError from "../../abstractions/api.error";
import logger from "../../lib/logger";
import { LocationType, LocationTypeAttributes, LocationTypeCreationAttributes } from "../../database/models/location.type";

export class LocationTypeService {

    async create(payload: LocationTypeCreationAttributes): Promise<LocationTypeAttributes> {
        try {
            const locationType = await LocationType.create(payload);
            return locationType;
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

    async find() {
        try {
            const locationTypes = await LocationType.findAll({ where: { is_active: true } });
            return locationTypes;
        } catch (error) {
            logger.error(error);
            throw error
        }
    }

    async findOne(id: string): Promise<LocationType> {
        try {
            const locationType = await LocationType.findByPk(id);
            return locationType!;
        } catch (error) {
            logger.error(error);
            throw new ApiError(`Id: ${id} No encontrado`, StatusCodes.NOT_FOUND);
        }
    }

    async update(id: string, payload: LocationTypeCreationAttributes): Promise<LocationType> {
        try {
            const locationType = await LocationType.findByPk(id);
            if (!locationType) {
                throw new ApiError('Tipo de ubicación no encontrada', StatusCodes.NOT_FOUND);
            }

            const updatedRol = await locationType!.update(payload);
            return updatedRol;

        } catch (error) {
            logger.error({ error, 'updated': 'update locationType' });
            throw error
        }
    }

    async delete(id: string): Promise<boolean> {
        try {
            const locationType = await LocationType.findByPk(id);
            console.log(locationType);
            if (locationType) {
                locationType.is_active = false;
                await locationType.save();
                return true;
            }

            return false;

        } catch (error) {
            logger.error(error);
            throw error
        }
    }

    async search(query: any): Promise<LocationType[]> {
        try {
            const locationTypes = await LocationType.findAll({ where: query });
            return locationTypes;
        } catch (error) {
            logger.error(error);
            throw error
        }
    }

}