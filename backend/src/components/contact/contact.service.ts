import { StatusCodes } from "http-status-codes";
import ApiError from "../../abstractions/api.error";
import logger from "../../lib/logger";
import { Contact, ContactAttributes, ContactCreationAttributes } from "../../database/models/contact";
import { User, UserAttributesExclude } from "../../database/models/user.model";
import { DropDownListItem } from "../../database/models";
import { JobTitle } from "../../database/models/job.titles.model";
import { Client } from "../../database/models/client.model";
import { SubLocation } from "../../database/models/sub.location";
import { Location } from "../../database/models/location";
import { Includeable } from "sequelize";

const includes: Includeable[] = [
    { model: User, as: 'user', attributes: { exclude: UserAttributesExclude } },
    { model: Client, as: 'client' },
    {
        model: SubLocation, as: 'sub_location', include: [
            { model: Location, as: 'location' }
        ]
    },
    { model: DropDownListItem, as: 'contact_type' },
    { model: DropDownListItem, as: 'resident_type' },
    { model: JobTitle, as: 'job_title' },
]

export class ContactService {

    async create(payload: ContactCreationAttributes): Promise<ContactAttributes> {
        try {
            const contact = await Contact.create(payload);
            return contact;
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

    async find() {
        try {
            const contacts = await Contact.findAll({
                where: { is_active: true },
                include: includes
            });
            return contacts;
        } catch (error) {
            logger.error(error);
            throw error
        }
    }

    async findOne(id: string): Promise<Contact> {
        try {
            const contact = await Contact.findByPk(id, {
                include: includes
            });
            return contact!;
        } catch (error) {
            logger.error(error);
            throw new ApiError(`Id: ${id} No encontrado`, StatusCodes.NOT_FOUND);
        }
    }

    async update(id: string, payload: ContactCreationAttributes): Promise<Contact> {
        try {
            const contact = await Contact.findByPk(id);
            if (!contact) {
                throw new ApiError('Contacto no encontrado', StatusCodes.NOT_FOUND);
            }

            const updatedContact = await contact!.update(payload);

            const contacWithRelations = await Contact.findByPk(updatedContact.id, {
                include: includes
            });

            return contacWithRelations as Contact;


        } catch (error) {
            logger.error({ error, 'updated': 'update contact' });
            throw error
        }
    }

    async delete(id: string): Promise<boolean> {
        try {
            const contact = await Contact.findByPk(id);

            if (contact) {
                contact.is_active = false;
                await contact.save();
                return true;
            }

            return false;

        } catch (error) {
            logger.error(error);
            throw error
        }
    }

    async search(query: any): Promise<Contact[]> {
        try {
            const contacts = await Contact.findAll({ where: query, include: includes });
            return contacts;
        } catch (error) {
            logger.error(error);
            throw error
        }
    }

}