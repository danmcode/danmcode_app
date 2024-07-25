import { StatusCodes } from "http-status-codes";
import ApiError from "../../abstractions/api.error";
import logger from "../../lib/logger";
import { ContactType, ContactTypeAttributes, ContactTypeCreationAttributes } from "../../database/models/contact.type";

export class ContactTypeService {

    async create(payload: ContactTypeCreationAttributes): Promise<ContactTypeAttributes> {
        try {
            const contactType = await ContactType.create(payload);
            return contactType;
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

    async find() {
        try {
            const contactTypes = await ContactType.findAll({ where: { is_active: true } });
            return contactTypes;
        } catch (error) {
            logger.error(error);
            throw error
        }
    }

    async findOne(id: string): Promise<ContactType> {
        try {
            const contactType = await ContactType.findByPk(id);
            return contactType!;
        } catch (error) {
            logger.error(error);
            throw new ApiError(`Id: ${id} No encontrado`, StatusCodes.NOT_FOUND);
        }
    }

    async update(id: string, payload: ContactTypeCreationAttributes): Promise<ContactType> {
        try {
            const contactType = await ContactType.findByPk(id);
            if (!contactType) {
                throw new ApiError('Tipo de contacto no encontrado', StatusCodes.NOT_FOUND);
            }

            const updatedRol = await contactType!.update(payload);
            return updatedRol;

        } catch (error) {
            logger.error({ error, 'updated': 'update contactType' });
            throw error
        }
    }

    async delete(id: string): Promise<boolean> {
        try {
            const contactType = await ContactType.findByPk(id);
            console.log(contactType);
            if (contactType) {
                contactType.is_active = false;
                await contactType.save();
                return true;
            }

            return false;

        } catch (error) {
            logger.error(error);
            throw error
        }
    }

    async search(query: any): Promise<ContactType[]> {
        try {
            const contactTypes = await ContactType.findAll({ where: query });
            return contactTypes;
        } catch (error) {
            logger.error(error);
            throw error
        }
    }

}