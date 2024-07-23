import { Model, DataTypes, Optional, UUIDV4 } from 'sequelize';
import sequelize from '../index';

interface UserAttributes {
    id: string;
    identification:string;
    name: string;
    last_name: string;
    username: string;
    email: string;
    email_verified: boolean;
    email_verified_at: string;
    password: string;
    is_active: boolean;
    is_contact: boolean;
    token: string;
    contact_id: string;
    rol_id: string;
    is_blocked: string;
    first_login: boolean;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'is_active'> { }

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    id!: string;
    identification!: string;
    username!: string;
    name!: string;
    last_name!: string;
    email!: string;
    email_verified!: boolean;
    email_verified_at!: string;
    password!: string;
    is_active!: boolean;
    is_contact!: boolean;
    token!: string;
    contact_id!: string;
    rol_id!: string;
    is_blocked!: string;
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
            defaultValue: UUIDV4
        },
        identification: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email_verified: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email_verified_at: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING,
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
        },
        first_login: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        token: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        contact_id: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        rol_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        is_blocked: {
            type: DataTypes.STRING,
            allowNull: true,
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

export { User, UserAttributes, UserCreationAttributes };