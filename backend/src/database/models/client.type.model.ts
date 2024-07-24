import { Model, DataTypes, Optional, UUIDV4 } from 'sequelize';
import sequelize from '../index';

interface ClientTypeAttributes {
    id: string;
    client_type: string;
    description: string;
    is_active: boolean;
}

interface ClientTypeCreationAttributes extends Optional<ClientTypeAttributes, 'id' | 'is_active'> { }

class ClientType extends Model<ClientTypeAttributes, ClientTypeCreationAttributes> implements ClientTypeAttributes {
    public id!: string;
    public client_type!: string;
    public description!: string;
    public is_active!: boolean;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}


ClientType.init({
    id: {
        allowNull: false,
        primaryKey: true,
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
    }
}, {
    sequelize,
    tableName: 'client_types',
    modelName: 'ClientType',
    timestamps: true,
    underscored: true
});

export { ClientType, ClientTypeAttributes, ClientTypeCreationAttributes };