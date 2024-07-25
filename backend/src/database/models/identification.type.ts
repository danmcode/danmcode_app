import { Model, DataTypes, Optional, UUIDV4 } from 'sequelize';
import sequelize from '../index';
import { User } from './user.model';

interface IdentificationTypeAttributes {
    id: string;
    identification_type: string;
    description: string;
    is_active: boolean;
    created_by: string;
    updated_by: string;
}


interface IdentificationTypeCreationAttributes extends Optional<IdentificationTypeAttributes, 'id' | 'is_active'> { }

class IdentificationType extends Model<IdentificationTypeAttributes, IdentificationTypeCreationAttributes> implements IdentificationTypeAttributes {
    public id!: string;
    public identification_type!: string;
    public description!: string;
    public is_active!: boolean;
    public created_by!: string;
    public updated_by!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}


IdentificationType.init({
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        unique: true,
    },
    identification_type: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
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
    tableName: 'identification_types',
    modelName: 'IdentificationType',
    timestamps: true,
    underscored: true
});

IdentificationType.belongsTo(User, {
    foreignKey: 'created_by',
    as: 'identification_type_created_by',
});

IdentificationType.belongsTo(User, {
    foreignKey: 'updated_by',
    as: 'identification_type_updated_by',
});

export { IdentificationType, IdentificationTypeAttributes, IdentificationTypeCreationAttributes };