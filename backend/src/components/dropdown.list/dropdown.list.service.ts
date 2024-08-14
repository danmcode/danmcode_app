import { StatusCodes } from "http-status-codes";
import ApiError from "../../abstractions/api.error";
import logger from "../../lib/logger";
import { DropDownList, DropDownListAttributes, DropDownListCreationAttributes } from "../../database/models/dropdown.list";
import { DropDownListItem } from "../../database/models/dropdown.list.item";

export class DropDownListService {

    async create(payload: DropDownListCreationAttributes): Promise<DropDownListAttributes> {
        try {
            const dropdownList = await DropDownList.create(payload);
            return dropdownList;
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

    async find() {
        try {
            const dropdownLists = await DropDownList.findAll({ 
                where: { is_active: true },
                include: [{ model: DropDownListItem, as: 'dropdown_list_items' }]
            });
            return dropdownLists;
        } catch (error) {
            logger.error(error);
            throw error
        }
    }

    async findOne(id: string): Promise<DropDownList> {
        try {
            const dropdownList = await DropDownList.findByPk(id, {
                include: [{ model: DropDownListItem, as: 'dropdown_list_items' }]
            });
            return dropdownList!;
        } catch (error) {
            logger.error(error);
            throw new ApiError(`Id: ${id} No encontrado`, StatusCodes.NOT_FOUND);
        }
    }

    async update(id: string, payload: DropDownListCreationAttributes): Promise<DropDownList> {
        try {
            const dropdownList = await DropDownList.findByPk(id);
            if (!dropdownList) {
                throw new ApiError('Lista no encontrada', StatusCodes.NOT_FOUND);
            }

            const updatedRol = await dropdownList!.update(payload);
            return updatedRol;

        } catch (error) {
            logger.error({ error, 'updated': 'update dropdownList' });
            throw error
        }
    }

    async delete(id: string): Promise<boolean> {
        try {
            const dropdownList = await DropDownList.findByPk(id);
            console.log(dropdownList);
            if (dropdownList) {
                dropdownList.is_active = false;
                await dropdownList.save();
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
            const dropdownLists = await DropDownList.findAll({ 
                where: query,
                include: [{ model: DropDownListItem, as: 'dropdown_list_items' }]
            });
            return dropdownLists;
        } catch (error) {
            logger.error(error);
            throw error
        }
    }

}