import { Model, DataTypes, Optional, UUIDV4 } from 'sequelize';
import sequelize from '../index';
import { User } from './user.model';

interface EquipmentTypeAttributes {
    id: string;
    equipment_type: string;
    is_active: boolean;
    created_by: string;
    updated_by: string;
}

interface EquipmentTypeCreationAttributes extends Optional<EquipmentTypeAttributes, 'id' | 'is_active'> { }

class EquipmentType extends Model<EquipmentTypeAttributes, EquipmentTypeCreationAttributes> implements EquipmentTypeAttributes {
    public id!: string;
    public equipment_type!: string;
    public description!: string;
    public is_active!: boolean;
    public created_by!: string;
    public updated_by!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

EquipmentType.init({
    id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: UUIDV4
    },
    equipment_type: {
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
    tableName: 'equipment_types',
    modelName: 'EquipmentType',
    timestamps: true,
    underscored: true
});

EquipmentType.belongsTo(User, {
    foreignKey: 'created_by',
    as: 'resident_type_created_by',
});

EquipmentType.belongsTo(User, {
    foreignKey: 'updated_by',
    as: 'resident_type_updated_by',
});

export { EquipmentType, EquipmentTypeAttributes, EquipmentTypeCreationAttributes };