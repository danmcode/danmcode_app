import { Model, DataTypes, Optional, UUIDV4 } from 'sequelize';
import sequelize from '../index';
import { User } from './user.model';
import { Client } from './client.model';
import { LocationType } from './location.type';

interface LocationAttributes {
    id: string;
    location_name: string;
    description: string;
    client_id: string;
    location_type_id: string;
    is_active: boolean;
    created_by: string;
    updated_by: string;
}


interface LocationCreationAttributes extends Optional<LocationAttributes, 'id' | 'is_active'> { }

class Location extends Model<LocationAttributes, LocationCreationAttributes> implements LocationAttributes {
    public id!: string;
    public location_name!: string;
    public description!: string;
    public client_id!: string;
    public location_type_id!: string;
    public is_active!: boolean;
    public created_by!: string;
    public updated_by!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}


Location.init({
    id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: UUIDV4
    },
    location_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    client_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    location_type_id: {
        type: DataTypes.UUID,
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
        allowNull: true,
    },
}, {
    sequelize,
    tableName: 'locations',
    modelName: 'Location',
    timestamps: true,
    underscored: true
});

Location.belongsTo(User, {
    foreignKey: 'created_by',
    as: 'location_created_by',
});

Location.belongsTo(User, {
    foreignKey: 'updated_by',
    as: 'location_updated_by',
});

Location.belongsTo(Client, {
    foreignKey: 'client_id',
    as: 'client',
});

Location.belongsTo(LocationType, {
    foreignKey: 'location_type_id',
    as: 'location_type',
});

export { Location, LocationAttributes, LocationCreationAttributes };