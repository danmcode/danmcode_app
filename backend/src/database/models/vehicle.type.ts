import { Model, DataTypes, Optional, UUIDV4 } from 'sequelize';
import sequelize from '../index';
import { User } from './user.model';

interface VehicleTypeAttributes {
    id: string;
    vehicle_type: string;
    is_active: boolean;
    created_by: string;
    updated_by: string;
}

interface VehicleTypeCreationAttributes extends Optional<VehicleTypeAttributes, 'id' | 'is_active'> { }

class VehicleType extends Model<VehicleTypeAttributes, VehicleTypeCreationAttributes> implements VehicleTypeAttributes {
    public id!: string;
    public vehicle_type!: string;
    public description!: string;
    public is_active!: boolean;
    public created_by!: string;
    public updated_by!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}


VehicleType.init({
    id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: UUIDV4
    },
    vehicle_type: {
        type: DataTypes.STRING(50),
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
    tableName: 'vehicle_types',
    modelName: 'VehicleType',
    timestamps: true,
    underscored: true
});

VehicleType.belongsTo(User, {
    foreignKey: 'created_by',
    as: 'vehicle_type_created_by',
});

VehicleType.belongsTo(User, {
    foreignKey: 'updated_by',
    as: 'vehicle_type_updated_by',
});

export { VehicleType, VehicleTypeAttributes, VehicleTypeCreationAttributes };