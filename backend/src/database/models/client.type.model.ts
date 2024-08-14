import { Model, DataTypes, Optional, UUIDV4 } from 'sequelize';
import sequelize from '../index';
import { User } from './user.model';

interface ClientTypeAttributes {
    id: string; 
    client_type: string;
    description: string;
    is_active: boolean;
    created_by: string;
    updated_by: string;
}


interface ClientTypeCreationAttributes extends Optional<ClientTypeAttributes, 'id' | 'is_active'> { }

class ClientType extends Model<ClientTypeAttributes, ClientTypeCreationAttributes> implements ClientTypeAttributes {
    public id!: string;
    public client_type!: string;
    public description!: string;
    public is_active!: boolean;
    public created_by!: string;
    public updated_by!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}


ClientType.init({
    id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: UUIDV4
    },
    client_type: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    created_by: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    updated_by: {
        type: DataTypes.UUID,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'client_types',
    modelName: 'ClientType',
    timestamps: true,
    underscored: true
});

ClientType.belongsTo(User, {
    foreignKey: 'created_by',
    as: 'location_type_created_by',
});

ClientType.belongsTo(User, {
    foreignKey: 'updated_by',
    as: 'location_type_updated_by',
});

export { ClientType, ClientTypeAttributes, ClientTypeCreationAttributes };