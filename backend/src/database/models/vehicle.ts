import { Model, DataTypes, Optional, UUIDV4 } from 'sequelize';
import sequelize from '../index';
import { User } from './user.model';
import { Contact } from './contact';
import { VehicleType } from './vehicle.type';

interface VehicleAttributes {
    id: string;
    brand: string;
    vehicle_type_id: string;
    contact_id: string;
    liscense_plate: string;
    color: string;
    observations: string;
    is_active: boolean;
    created_by: string;
    updated_by: string;
}

interface VehicleCreationAttributes extends Optional<VehicleAttributes, 'id' | 'is_active'> { }

class Vehicle extends Model<VehicleAttributes, VehicleCreationAttributes> implements VehicleAttributes {
    
    public id!: string;
    public brand!: string;
    public vehicle_type_id!: string;
    public contact_id!: string;
    public liscense_plate!: string;
    public color!: string;
    public observations!: string;
    public is_active!: boolean;
    public created_by!: string;
    public updated_by!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}


Vehicle.init({
    id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: UUIDV4
    },
    brand : {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    vehicle_type_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    contact_id: {
        type: DataTypes.UUID,
        allowNull: true
    },
    liscense_plate: {
        type: DataTypes.STRING(6),
        allowNull: true
    },
    color: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    observations: {
        type: DataTypes.STRING(200),
        allowNull: true
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
    tableName: 'vehicles',
    modelName: 'Vehicle',
    timestamps: true,
    underscored: true
});

Vehicle.belongsTo(Contact, {
    foreignKey: 'contact_id',
    as: 'contact',
});

Vehicle.belongsTo(VehicleType, {
    foreignKey: 'vechicle_type_id',
    as: 'vehicle_type',
});

Vehicle.belongsTo(User, {
    foreignKey: 'created_by',
    as: 'vehicle_created_by',
});

Vehicle.belongsTo(User, {
    foreignKey: 'updated_by',
    as: 'vehicle_updated_by',
});

export { Vehicle, VehicleAttributes, VehicleCreationAttributes };