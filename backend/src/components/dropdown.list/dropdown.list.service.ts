import { StatusCodes } from "http-status-codes";
import ApiError from "../../abstractions/api.error";
import logger from "../../lib/logger";
import { DropDownList, DropDownListAttributes, DropDownListCreationAttributes } from "../../database/models/dropdown.list";

export class DropDownListService {

    async create(payload: DropDownListCreationAttributes): Promise<DropDownListAttributes> {
        try {
            const clientType = await DropDownList.create(payload);
            return clientType;
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

    async find() {
        try {
            const clientTypes = await DropDownList.findAll({ where: { is_active: true } });
            return clientTypes;
        } catch (error) {
            logger.error(error);
            throw error
        }
    }

    async findOne(id: string): Promise<DropDownList> {
        try {
            const clientType = await DropDownList.findByPk(id);
            return clientType!;
        } catch (error) {
            logger.error(error);
            throw new ApiError(`Id: ${id} No encontrado`, StatusCodes.NOT_FOUND);
        }
    }

    async update(id: string, payload: DropDownListCreationAttributes): Promise<DropDownList> {
        try {
            const clientType = await DropDownList.findByPk(id);
            if (!clientType) {
                throw new ApiError('Lista no encontrada', StatusCodes.NOT_FOUND);
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
            const clientType = await DropDownList.findByPk(id);
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

    async search(query: any): Promise<DropDownList[]> {
        try {
            const clientTypes = await DropDownList.findAll({ where: query });
            return clientTypes;
        } catch (error) {
            logger.error(error);
            throw error
        }
    }

}