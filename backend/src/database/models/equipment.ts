import { Model, DataTypes, Optional, UUIDV4 } from 'sequelize';
import sequelize from '../index';
import { User } from './user.model';
import { EquipmentType } from './equipment.type';

interface EquipmentAttributes {
    id: string;
    brand: string;
    serial: string;
    description: string;
    equipment_type_id: string;
    is_active: boolean;
    created_by: string;
    updated_by: string;
}

interface EquipmentCreationAttributes extends Optional<EquipmentAttributes, 'id' | 'is_active'> { }

class Equipment extends Model<EquipmentAttributes, EquipmentCreationAttributes> implements EquipmentAttributes {
    
    public id!: string;
    public brand!: string;
    public serial!: string;
    public description!: string;
    public equipment_type_id!: string;
    public is_active!: boolean;
    public created_by!: string;
    public updated_by!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}


Equipment.init({
    id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: UUIDV4
    },
    brand : {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    serial : {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    description: {
        type: DataTypes.STRING(200),
        allowNull: true
    },
    equipment_type_id: {
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
    tableName: 'vehicles',
    modelName: 'Equipment',
    timestamps: true,
    underscored: true
});


Equipment.belongsTo(EquipmentType, {
    foreignKey: 'equipment_type_id',
    as: 'equipment_type',
});

Equipment.belongsTo(User, {
    foreignKey: 'created_by',
    as: 'equipment_created_by',
});

Equipment.belongsTo(User, {
    foreignKey: 'updated_by',
    as: 'equipment_updated_by',
});

export { Equipment, EquipmentAttributes, EquipmentCreationAttributes };