import { StatusCodes } from "http-status-codes";
import ApiError from "../../abstractions/api.error";
import logger from "../../lib/logger";
import { ClientType, ClientTypeAttributes, ClientTypeCreationAttributes } from "../../database/models/client.type.model";

export class ClientTypeService {

    async create(payload: ClientTypeCreationAttributes): Promise<ClientTypeAttributes> {
        try {
            const clientType = await ClientType.create(payload);
            return clientType;
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

    async find() {
        try {
            const clientTypes = await ClientType.findAll({ where: { is_active: true } });
            return clientTypes;
        } catch (error) {
            logger.error(error);
            throw error
        }
    }

    async findOne(id: string): Promise<ClientType> {
        try {
            const clientType = await ClientType.findByPk(id);
            return clientType!;
        } catch (error) {
            logger.error(error);
            throw new ApiError(`Id: ${id} No encontrado`, StatusCodes.NOT_FOUND);
        }
    }

    async update(id: string, payload: ClientTypeCreationAttributes): Promise<ClientType> {
        try {
            const clientType = await ClientType.findByPk(id);
            if (!clientType) {
                throw new ApiError('Rol no encontrado', StatusCodes.NOT_FOUND);
            }

            const updatedRol = await clientType!.update(payload);
            return updatedRol;

        } catch (error) {
            logger.error({ error, 'updated': 'update clientType' });
            throw error
        }
    }

    async delete(id: string): Promise<boolean> {
        try {
            const clientType = await ClientType.findByPk(id);
            console.log(clientType);
            if (clientType) {
                clientType.is_active = false;
                await clientType.save();
                return true;
            }

            return false;

        } catch (error) {
            logger.error(error);
            throw error
        }
    }

    async search(query: any): Promise<ClientType[]> {
        try {
            const clientTypes = await ClientType.findAll({ where: query });
            return clientTypes;
        } catch (error) {
            logger.error(error);
            throw error
        }
    }

}