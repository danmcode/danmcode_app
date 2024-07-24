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
            defaultValue: UUIDV4,
            unique: true,
        },
        identification: {
            type: DataTypes.STRING(12),
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
        username: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email_verified_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        email_verified: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
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