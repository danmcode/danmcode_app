import { StatusCodes } from "http-status-codes";
import ApiError from "../../abstractions/api.error";
import logger from "../../lib/logger";
import bcrypt from 'bcrypt';
import { Client, ClientAttributes, ClientCreationAttributes } from "../../database/models/client.model";
import { ClientType } from "../../database/models/client.type.model";

export class ClientService {

    async create(payload: ClientCreationAttributes): Promise<ClientAttributes> {
        try {
            const client = await Client.create(payload);
            return client;
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

    async find() {
        try {
            const client = await Client.findAll({
                where: { is_active: true },
                include: [{ model: ClientType, as: 'client_type' }]
            });
            return client;
        } catch (error) {
            logger.error(error);
            throw error
        }
    }

    async findOne(id: string): Promise<Client> {
        try {
            const client = await Client.findByPk(id);
            return client!;
        } catch (error) {
            logger.error(error);
            throw new ApiError(`Id: ${id} No encontrado`, StatusCodes.NOT_FOUND);
        }
    }

    async update(id: string, payload: ClientCreationAttributes): Promise<Client> {
        try {
            const client = await Client.findByPk(id);
            if (!client) {
                throw new ApiError('Cliente no encontrado', StatusCodes.NOT_FOUND);
            }

            const updatedClient = await client!.update(payload);
            return updatedClient;

        } catch (error) {
            logger.error({ error });
            throw error
        }
    }

    async delete(id: string): Promise<boolean> {
        try {
            const client = await Client.findByPk(id);

            if (client) {
                client.is_active = false;
                await client.save();
                return true;
            }

            return false;

        } catch (error) {
            logger.error(error);
            throw error
        }
    }

    async search(query: any): Promise<Client[]> {
        try {
            const clients = await Client.findAll({ where: query });
            return clients;
        } catch (error) {
            logger.error(error);
            throw error
        }
    }
}