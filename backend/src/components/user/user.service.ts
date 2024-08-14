import { StatusCodes } from "http-status-codes";
import ApiError from "../../abstractions/api.error";
import logger from "../../lib/logger";
import { User, UserAttributes, UserCreationAttributes } from "../../database/models/user.model";
import { Role } from "../../database/models/role.model";
import bcrypt from 'bcrypt';
import { DropDownListItem } from "../../database/models";

export class UserService {

    async create(payload: UserCreationAttributes): Promise<UserAttributes> {
        try {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(payload.password, saltRounds);

            payload.password = hashedPassword;

            const user = await User.create(payload);

            const userWithRelations = await User.findByPk(user.id, {
                include: [
                    { model: Role, as: 'role' },
                    { model: DropDownListItem, as: 'identification_type' }
                ]
            });

            return userWithRelations as UserAttributes;
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

    async find() {
        try {
            const user = await User.findAll({
                where: { is_active: true },
                include: [
                    { model: Role, as: 'role' },
                    { model: DropDownListItem, as: 'identification_type' }
                ]
            });
            return user;
        } catch (error) {
            logger.error(error);
            throw error
        }
    }

    async findOne(id: string): Promise<User> {
        try {
            const user = await User.findByPk(id, {
                include: [
                    { model: Role, as: 'role' },
                    { model: DropDownListItem, as: 'identification_type' }
                ]
            });
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
            const userWithRelations = await User.findByPk(updatedUser.id, {
                include: [
                    { model: Role, as: 'role' },
                    { model: DropDownListItem, as: 'identification_type' }
                ]
            });

            return userWithRelations as User;

        } catch (error) {
            logger.error({ error });
            throw error
        }
    }

    async delete(id: string): Promise<boolean> {
        try {
            const user = await User.findByPk(id);

            if (user) {
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

    async search(query: any): Promise<User[]> {
        try {
            const users = await User.findAll({
                where: query, include: [
                    { model: Role, as: 'role' },
                    { model: DropDownListItem, as: 'identification_type' }
                ]
            },);
            return users;
        } catch (error) {
            logger.error(error);
            throw error
        }
    }

    static async verifyPassword(user: User, plainPassword: string): Promise<boolean> {
        return bcrypt.compare(plainPassword, user.password);
    }

}