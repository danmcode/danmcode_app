import { Model, DataTypes, Optional, UUIDV4 } from 'sequelize';
import sequelize from '../index';
import { Role } from './role.model';
import { DropDownListItem } from './dropdown.list.item';

interface UserAttributes {
    id: string;
    identification:string;
    username: string;
    name: string;
    last_name: string;
    email: string;
    email_verified: boolean;
    email_verified_at: string;
    password: string;
    is_active: boolean;
    is_contact: boolean;
    is_user_active: boolean;
    token: string;
    identification_type_id: string;
    role_id: string;
    is_blocked: boolean;
    first_login: boolean;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'is_active'> { }

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    id!: string;
    identification!: string;
    identification_type_id!: string;
    username!: string;
    name!: string;
    last_name!: string;
    email!: string;
    email_verified!: boolean;
    email_verified_at!: string;
    password!: string;
    is_active!: boolean;
    is_contact!: boolean;
    is_user_active!: boolean;
    token!: string;
    role_id!: string;
    is_blocked!: boolean;
    first_login!: boolean;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}


User.init(
    {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            unique: true,
        },
        identification_type_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                key: 'id',
                model: DropDownListItem
            }
        },
        identification: {
            type: DataTypes.STRING(12),
            allowNull: false,
            unique: true,
        },
        username: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        email_verified: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        email_verified_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        is_contact: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false,
        },
        is_user_active: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false,
        },
        token: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        role_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        is_blocked: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false,
        },
        first_login: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
    },
    {
        sequelize,
        tableName: 'users',
        modelName: 'User',
        timestamps: true,
        underscored: true
    }
);

User.belongsTo(Role, {
    foreignKey: 'role_id',
    as: 'role',
});

export { User, UserAttributes, UserCreationAttributes };