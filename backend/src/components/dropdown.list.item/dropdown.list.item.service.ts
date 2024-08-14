import { StatusCodes } from "http-status-codes";
import ApiError from "../../abstractions/api.error";
import logger from "../../lib/logger";
import { DropDownListItem, DropDownListItemAttributes, DropDownListItemCreationAttributes } from "../../database/models/dropdown.list.item";
import { DropDownList } from "../../database/models/dropdown.list";

export class DropDownListItemService {

    async create(payload: DropDownListItemCreationAttributes): Promise<DropDownListItemAttributes> {
        try {
            const dropDownListItem = await DropDownListItem.create(payload);
            return dropDownListItem;
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

    async find() {
        try {
            const dropDownListItems = await DropDownListItem.findAll({ 
                where: { is_active: true },
            });
            return dropDownListItems;
        } catch (error) {
            logger.error(error);
            throw error
        }
    }

    async findOne(id: string): Promise<DropDownListItem> {
        try {
            const dropDownListItem = await DropDownListItem.findByPk(id);
            return dropDownListItem!;
        } catch (error) {
            logger.error(error);
            throw new ApiError(`Id: ${id} No encontrado`, StatusCodes.NOT_FOUND);
        }
    }

    async update(id: string, payload: DropDownListItemCreationAttributes): Promise<DropDownListItem> {
        try {
            const dropDownListItem = await DropDownListItem.findByPk(id);
            if (!dropDownListItem) {
                throw new ApiError('Item de la lista no encontrado', StatusCodes.NOT_FOUND);
            }

            const updatedDropDownListItem = await dropDownListItem!.update(payload);
            return updatedDropDownListItem;

        } catch (error) {
            logger.error({ error, 'updated': 'update dropDownListItem' });
            throw error
        }
    }

    async delete(id: string): Promise<boolean> {
        try {
            const dropDownListItem = await DropDownListItem.findByPk(id);

            if (dropDownListItem) {
                dropDownListItem.is_active = false;
                await dropDownListItem.save();
                return true;
            }

            return false;

        } catch (error) {
            logger.error(error);
            throw error
        }
    }

    async search(query: any): Promise<DropDownListItem[]> {
        try {
            const dropDownListItems = await DropDownListItem.findAll({ where: query });
            return dropDownListItems;
        } catch (error) {
            logger.error(error);
            throw error
        }
    }

}