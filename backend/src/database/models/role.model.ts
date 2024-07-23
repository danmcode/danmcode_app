import { Model, DataTypes, Optional, UUIDV4 } from 'sequelize';
import sequelize from '../index';
import { User } from './user.model';

interface RoleAttributes {
    id: string;
    role_name: string;
    description: string;
    is_active: boolean;
}

interface RoleCreationAttributes extends Optional<RoleAttributes, 'id' | 'is_active'> { }

class Role extends Model<RoleAttributes, RoleCreationAttributes> implements RoleAttributes {
    public id!: string;
    public role_name!: string;
    public description!: string;
    public is_active!: boolean;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}


Role.init({
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: UUIDV4
    },
    role_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    sequelize,
    tableName: 'roles',
    modelName: 'Role',
    timestamps: true,
    underscored: true
});

export { Role, RoleAttributes, RoleCreationAttributes };