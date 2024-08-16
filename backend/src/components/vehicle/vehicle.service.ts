import { StatusCodes } from "http-status-codes";
import ApiError from "../../abstractions/api.error";
import logger from "../../lib/logger";
import { Vehicle, VehicleAttributes, VehicleCreationAttributes } from "../../database/models/vehicle";

export class VehicleService {

    async create(payload: VehicleCreationAttributes): Promise<VehicleAttributes> {
        try {
            const vehicle = await Vehicle.create(payload);
            return vehicle;
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

    async find() {
        try {
            const vehicles = await Vehicle.findAll({ where: { is_active: true } });
            return vehicles;
        } catch (error) {
            logger.error(error);
            throw error
        }
    }

    async findOne(id: string): Promise<Vehicle> {
        try {
            const vehicle = await Vehicle.findByPk(id);
            return vehicle!;
        } catch (error) {
            logger.error(error);
            throw new ApiError(`Id: ${id} No encontrado`, StatusCodes.NOT_FOUND);
        }
    }

    async update(id: string, payload: VehicleCreationAttributes): Promise<Vehicle> {
        try {
            const vehicle = await Vehicle.findByPk(id);
            if (!vehicle) {
                throw new ApiError('Registro no encontrado', StatusCodes.NOT_FOUND);
            }

            const updatedRol = await vehicle!.update(payload);
            return updatedRol;

        } catch (error) {
            logger.error({ error, 'updated': 'update vehicle' });
            throw error
        }
    }

    async delete(id: string): Promise<boolean> {
        try {
            const vehicle = await Vehicle.findByPk(id);
            console.log(vehicle);
            if (vehicle) {
                vehicle.is_active = false;
                await vehicle.save();
                return true;
            }

            return false;

        } catch (error) {
            logger.error(error);
            throw error
        }
    }

    async search(query: any): Promise<Vehicle[]> {
        try {
            const vehicles = await Vehicle.findAll({ where: query });
            return vehicles;
        } catch (error) {
            logger.error(error);
            throw error
        }
    }

}