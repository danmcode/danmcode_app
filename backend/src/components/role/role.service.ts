import { StatusCodes } from "http-status-codes";
import ApiError from "../../abstractions/api.error";
import { Role, RoleAttributes, RoleCreationAttributes } from "../../database/models/role.model";
import logger from "../../lib/logger";

export class RoleService {

    async create(payload: RoleCreationAttributes): Promise<RoleAttributes> {
        try {
            const role = await Role.create(payload);
            return role;
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

    async find() {
        try {
            const roles = await Role.findAll({ where: { is_active: true } });
            return roles;
        } catch (error) {
            logger.error(error);
            throw error
        }
    }

    async findOne(id: string): Promise<Role> {
        try {
            const role = await Role.findByPk(id);
            return role!;
        } catch (error) {
            logger.error(error);
            throw new ApiError(`Id: ${id} No encontrado`, StatusCodes.NOT_FOUND);
        }
    }

    async update(id: string, payload: RoleCreationAttributes): Promise<Role> {
        try {
            const role = await Role.findByPk(id);
            if (!role) {
                throw new ApiError('Rol no encontrado', StatusCodes.NOT_FOUND);
            }

            const updatedRol = await role!.update(payload);
            return updatedRol;

        } catch (error) {
            logger.error({ error, 'updated': 'update role' });
            throw error
        }
    }

    async delete(id: string): Promise<boolean> {
        try {
            const role = await Role.findByPk(id);
            console.log(role);
            if(role){
                role.is_active = false;
                await role.save();
                return true;
            }

            return false;

        } catch (error) {
            logger.error(error);
            throw error
        }
    }

    async search(query: any): Promise<Role[]>{
        try {
            const roles = await Role.findAll({ where: query });
            return roles;
        } catch (error) {
            logger.error(error);
            throw error
        }
    }

}