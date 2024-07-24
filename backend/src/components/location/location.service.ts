import { StatusCodes } from "http-status-codes";
import ApiError from "../../abstractions/api.error";
import logger from "../../lib/logger";
import { Location, LocationAttributes, LocationCreationAttributes } from "../../database/models/location";

export class LocationService {

    async create(payload: LocationCreationAttributes): Promise<LocationAttributes> {
        try {
            const location = await Location.create(payload);
            return location;
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

    async find() {
        try {
            const locations = await Location.findAll({ where: { is_active: true } });
            return locations;
        } catch (error) {
            logger.error(error);
            throw error
        }
    }

    async findOne(id: string): Promise<Location> {
        try {
            const location = await Location.findByPk(id);
            return location!;
        } catch (error) {
            logger.error(error);
            throw new ApiError(`Id: ${id} No encontrado`, StatusCodes.NOT_FOUND);
        }
    }

    async update(id: string, payload: LocationCreationAttributes): Promise<Location> {
        try {
            const location = await Location.findByPk(id);
            if (!location) {
                throw new ApiError('Ubicación no encontrada', StatusCodes.NOT_FOUND);
            }

            const updatedRol = await location!.update(payload);
            return updatedRol;

        } catch (error) {
            logger.error({ error, 'updated': 'update location' });
            throw error
        }
    }

    async delete(id: string): Promise<boolean> {
        try {
            const location = await Location.findByPk(id);
            console.log(location);
            if (location) {
                location.is_active = false;
                await location.save();
                return true;
            }

            return false;

        } catch (error) {
            logger.error(error);
            throw error
        }
    }

    async search(query: any): Promise<Location[]> {
        try {
            const locations = await Location.findAll({ where: query });
            return locations;
        } catch (error) {
            logger.error(error);
            throw error
        }
    }

}