import { StatusCodes } from "http-status-codes";
import ApiError from "../../abstractions/api.error";
import logger from "../../lib/logger";
import { User, UserAttributes, UserCreationAttributes } from "../../database/models/user.model";

export class UserService {

    async create(payload: UserCreationAttributes): Promise<UserAttributes> {
        try {
            const user = await User.create(payload);
            return user;
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

    async find() {
        try {
            const user = await User.findAll({ where: { is_active: true } });
            return user;
        } catch (error) {
            logger.error(error);
            throw error
        }
    }

    async findOne(id: string): Promise<User> {
        try {
            const user = await User.findByPk(id);
            return user!;
        } catch (error) {
            logger.error(error);
            throw new ApiError(`Id: ${id} No encontrado`, StatusCodes.NOT_FOUND);
        }
    }

    async update(id: string, payload: UserCreationAttributes): Promise<User> {
        try {
            const user = await User.findByPk(id);
            if (!user) {
                throw new ApiError('Usuario no encontrado', StatusCodes.NOT_FOUND);
            }

            const updatedUser = await user!.update(payload);
            return updatedUser;

        } catch (error) {
            logger.error({ error, 'updated': 'update user' });
            throw error
        }
    }

    async delete(id: string): Promise<boolean> {
        try {
            const user = await User.findByPk(id);

            if(user){
                user.is_active = false;
                await user.save();
                return true;
            }

            return false;

        } catch (error) {
            logger.error(error);
            throw error
        }
    }

    async search(query: any): Promise<User[]>{
        try {
            const users = await User.findAll({ where: query });
            return users;
        } catch (error) {
            logger.error(error);
            throw error
        }
    }

}