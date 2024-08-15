import { StatusCodes } from "http-status-codes";
import ApiError from "../../abstractions/api.error";
import logger from "../../lib/logger";
import { Location, LocationAttributes, LocationCreationAttributes } from "../../database/models/location";
import { DropDownListItem } from "../../database/models";
import { User } from "../../database/models/user.model";
import { Client } from "../../database/models/client.model";
import { SubLocation } from "../../database/models/sub.location";
import { Includeable } from "sequelize";

const includes : Includeable[] = [
    { model: DropDownListItem, as: 'location_type' },
    { model: User, as: 'location_created_by' },
    { model: User, as: 'location_updated_by' },
    { model: SubLocation, as: 'location' }
];

export class LocationService {

    async create(payload: LocationCreationAttributes): Promise<LocationAttributes> {
        try {

            const location = await Location.create(payload);

            const locationWithRelations = await Location.findByPk(location.id, {
                include: includes,
            });

            return locationWithRelations as LocationAttributes;

        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

    async find() {
        try {
            const locations = await Location.findAll({
                where: { is_active: true },
                include: includes
            });
            return locations;
        } catch (error) {
            logger.error(error);
            throw error
        }
    }

    async findOne(id: string): Promise<Location> {
        try {
            const location = await Location.findByPk(id, {
                include: includes
            });
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

            const updatedLocation = await location!.update(payload);

            const locationWithRelations = await Location.findByPk(updatedLocation.id, {
                include: includes
            });

            return locationWithRelations as Location;

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
            const locations = await Location.findAll(
                { where: query, include: includes },
            );
            return locations;
        } catch (error) {
            logger.error(error);
            throw error
        }
    }

}