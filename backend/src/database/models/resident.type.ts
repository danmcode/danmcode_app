import { Model, DataTypes, Optional, UUIDV4 } from 'sequelize';
import sequelize from '../index';
import { User } from './user.model';

interface ResidentTypeAttributes {
    id: string;
    resident_type: string;
    description: string;
    is_active: boolean;
    created_by: string;
    updated_by: string;
}

interface ResidentTypeCreationAttributes extends Optional<ResidentTypeAttributes, 'id' | 'is_active'> { }

class ResidentType extends Model<ResidentTypeAttributes, ResidentTypeCreationAttributes> implements ResidentTypeAttributes {
    public id!: string;
    public resident_type!: string;
    public description!: string;
    public is_active!: boolean;
    public created_by!: string;
    public updated_by!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}


ResidentType.init({
    id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: UUIDV4
    },
    resident_type: {
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
        allowNull: true,
    },
}, {
    sequelize,
    tableName: 'resident_types',
    modelName: 'ResidentType',
    timestamps: true,
    underscored: true
});

ResidentType.belongsTo(User, {
    foreignKey: 'created_by',
    as: 'resident_type_created_by',
});

ResidentType.belongsTo(User, {
    foreignKey: 'updated_by',
    as: 'resident_type_updated_by',
});

export { ResidentType, ResidentTypeAttributes, ResidentTypeCreationAttributes };