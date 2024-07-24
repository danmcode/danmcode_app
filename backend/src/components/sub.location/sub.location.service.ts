import { StatusCodes } from "http-status-codes";
import ApiError from "../../abstractions/api.error";
import logger from "../../lib/logger";
import { SubLocation, SubLocationAttributes, SubLocationCreationAttributes } from "../../database/models/sub.location";

export class SubLocationService {

    async create(payload: SubLocationCreationAttributes): Promise<SubLocationAttributes> {
        try {
            const subLocation = await SubLocation.create(payload);
            return subLocation;
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

    async find() {
        try {
            const subLocations = await SubLocation.findAll({ where: { is_active: true } });
            return subLocations;
        } catch (error) {
            logger.error(error);
            throw error
        }
    }

    async findOne(id: string): Promise<SubLocation> {
        try {
            const subLocation = await SubLocation.findByPk(id);
            return subLocation!;
        } catch (error) {
            logger.error(error);
            throw new ApiError(`Id: ${id} No encontrado`, StatusCodes.NOT_FOUND);
        }
    }

    async update(id: string, payload: SubLocationCreationAttributes): Promise<SubLocation> {
        try {
            const subLocation = await SubLocation.findByPk(id);
            if (!subLocation) {
                throw new ApiError('Sub Ubicación no encontrada', StatusCodes.NOT_FOUND);
            }

            const updatedRol = await subLocation!.update(payload);
            return updatedRol;

        } catch (error) {
            logger.error({ error, 'updated': 'update subLocation' });
            throw error
        }
    }

    async delete(id: string): Promise<boolean> {
        try {
            const subLocation = await SubLocation.findByPk(id);
            console.log(subLocation);
            if (subLocation) {
                subLocation.is_active = false;
                await subLocation.save();
                return true;
            }

            return false;

        } catch (error) {
            logger.error(error);
            throw error
        }
    }

    async search(query: any): Promise<SubLocation[]> {
        try {
            const subLocations = await SubLocation.findAll({ where: query });
            return subLocations;
        } catch (error) {
            logger.error(error);
            throw error
        }
    }

}