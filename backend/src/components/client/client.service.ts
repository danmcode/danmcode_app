import { StatusCodes } from "http-status-codes";
import ApiError from "../../abstractions/api.error";
import logger from "../../lib/logger";
import { Client, ClientAttributes, ClientCreationAttributes } from "../../database/models/client.model";
import { DropDownListItem } from "../../database/models";
import { User } from "../../database/models/user.model";
import { Location } from "../../database/models/location";

export class ClientService {

    async create(payload: ClientCreationAttributes): Promise<ClientAttributes> {
        try {
            const client = await Client.create(payload);

            const clientWithRelations = await Client.findByPk(client.id, {
                include: [
                    { model: DropDownListItem, as: 'client_type' },
                    { model: User, as: 'client_created_by' },
                    { model: User, as: 'client_updated_by' },
                ]
            });

            return clientWithRelations as ClientAttributes;

        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

    async find() {
        try {
            const client = await Client.findAll({
                where: { is_active: true },
                include: [
                    { model: DropDownListItem, as: 'client_type' },
                    { model: User, as: 'client_created_by' },
                    { model: User, as: 'client_updated_by' },
                    { model: Location, as: 'locations' },
                ]
            });
            return client;
        } catch (error) {
            logger.error(error);
            throw error
        }
    }

    async findOne(id: string): Promise<Client> {
        try {
            const client = await Client.findByPk(id, {
                include: [
                    { model: DropDownListItem, as: 'client_type' },
                    { model: User, as: 'client_created_by' },
                    { model: User, as: 'client_updated_by' }
                ]
            });
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

            const clientWithRelations = await Client.findByPk(updatedClient.id, {
                include: [
                    { model: DropDownListItem, as: 'client_type' },
                    { model: User, as: 'client_created_by' },
                    { model: User, as: 'client_updated_by' }
                ]
            });

            return clientWithRelations as Client;

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
            const clients = await Client.findAll(
                { 
                    where: query,
                    include: [
                        { model: DropDownListItem, as: 'client_type' },
                        { model: User, as: 'client_created_by' },
                        { model: User, as: 'client_updated_by' }
                    ]
                }
            );
            return clients;
        } catch (error) {
            logger.error(error);
            throw error
        }
    }
}