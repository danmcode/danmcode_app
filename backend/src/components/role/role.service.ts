import { Role, RoleAttributes, RoleCreationAttributes } from "../../database/models/role.model";

export class RoleService {

    async create(
        payload: RoleCreationAttributes,
    ): Promise<RoleAttributes> {
        try {
            const role = await Role.create(payload);
            return role;
        } catch (error) {
            throw error;
        }
    }

}