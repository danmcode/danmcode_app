import { Model, DataTypes, Optional, UUIDV4 } from 'sequelize';
import sequelize from '../index';
import { User } from './user.model';

interface LocationTypeAttributes {
    id: string;
    location_type: string;
    description: string;
    is_active: boolean;
    created_by: string;
    updated_by: string;
}

interface LocationTypeCreationAttributes extends Optional<LocationTypeAttributes, 'id' | 'is_active'> { }

class LocationType extends Model<LocationTypeAttributes, LocationTypeCreationAttributes> implements LocationTypeAttributes {
    public id!: string;
    public location_type!: string;
    public description!: string;
    public is_active!: boolean;
    public created_by!: string;
    public updated_by!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}


LocationType.init({
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: UUIDV4
    },
    location_type: {
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
    tableName: 'location_types',
    modelName: 'LocationType',
    timestamps: true,
    underscored: true
});

LocationType.belongsTo(User, {
    foreignKey: 'created_by',
    as: 'location_type_created_by',
});

LocationType.belongsTo(User, {
    foreignKey: 'updated_by',
    as: 'location_type_updated_by',
});

export { LocationType, LocationTypeAttributes, LocationTypeCreationAttributes };