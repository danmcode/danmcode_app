import { Model, DataTypes, Optional, UUIDV4 } from 'sequelize';
import sequelize from '../index';
import { User } from './user.model';
import { DropDownListItem } from './dropdown.list.item';

interface ClientAttributes {
    id: string;
    client_name: string;
    nit: string;
    address: string;
    phone: string;
    photo_path: string;
    contact_email: string;
    observations: string;
    client_type_id: string;
    is_active: boolean;
    created_by: string;
    updated_by: string;
}

interface ClientCreationAttributes extends Optional<ClientAttributes, 'id' | 'is_active'> { }

class Client extends Model<ClientAttributes, ClientCreationAttributes> implements ClientAttributes {
    id!: string;
    client_name!: string;
    nit!: string;
    address!: string;
    phone!: string;
    photo_path!: string;
    contact_email!: string;
    observations!: string;
    client_type_id!: string;
    is_active!: boolean;
    created_by!: string;
    updated_by!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}


Client.init(
    {
        id: {
            primaryKey: true,
            allowNull: false,
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            unique: true,
        },
        client_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        nit: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
        },
        address: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING(11),
            allowNull: false,
        },
        photo_path: {
            type: DataTypes.STRING(200),
            allowNull: true,
        },
        contact_email: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        observations: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        client_type_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                key: 'id',
                model: DropDownListItem
            }
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        created_by: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                key: 'id',
                model: User
            }
        },
        updated_by: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                key: 'id',
                model: User
            }
        },
    },
    {
        sequelize,
        tableName: 'clients',
        modelName: 'Client',
        timestamps: true,
        underscored: true
    }
);

export { Client, ClientAttributes, ClientCreationAttributes };