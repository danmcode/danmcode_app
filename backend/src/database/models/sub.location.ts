import { Model, DataTypes, Optional, UUIDV4 } from 'sequelize';
import sequelize from '../index';
import { User } from './user.model';
import { LocationType } from './location.type';
import { Location } from './location';

interface SubLocationAttributes {
    id: string;
    sub_location_name: string;
    description: string;
    location_id: string;
    location_type_id: string;
    is_active: boolean;
    created_by: string;
    updated_by: string;
}

interface SubLocationCreationAttributes extends Optional<SubLocationAttributes, 'id' | 'is_active'> { }

class SubLocation extends Model<SubLocationAttributes, SubLocationCreationAttributes> implements SubLocationAttributes {
    public id!: string;
    public sub_location_name!: string;
    public description!: string;
    public location_id!: string;
    public location_type_id!: string;
    public is_active!: boolean;
    public created_by!: string;
    public updated_by!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}


SubLocation.init({
    id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: UUIDV4
    },
    sub_location_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    location_id: {
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
    tableName: 'sub_locations',
    modelName: 'SubLocation',
    timestamps: true,
    underscored: true
});

SubLocation.belongsTo(User, {
    foreignKey: 'created_by',
    as: 'sub_location_created_by',
});

SubLocation.belongsTo(User, {
    foreignKey: 'updated_by',
    as: 'sub_location_updated_by',
});

SubLocation.belongsTo(LocationType, {
    foreignKey: 'location_type_id',
    as: 'location_type',
});

SubLocation.belongsTo(Location, {
    foreignKey: 'location_id',
    as: 'location',
});

export { SubLocation, SubLocationAttributes, SubLocationCreationAttributes };