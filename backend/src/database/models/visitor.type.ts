import { Model, DataTypes, Optional, UUIDV4 } from 'sequelize';
import sequelize from '../index';
import { User } from './user.model';

interface VisitorTypeAttributes {
    id: string;
    visitor_type: string;
    description: string;
    is_active: boolean;
    created_by: string;
    updated_by: string;
}

interface VisitorTypeCreationAttributes extends Optional<VisitorTypeAttributes, 'id' | 'is_active'> { }

class VisitorType extends Model<VisitorTypeAttributes, VisitorTypeCreationAttributes> implements VisitorTypeAttributes {
    public id!: string;
    public visitor_type!: string;
    public description!: string;
    public is_active!: boolean;
    public created_by!: string;
    public updated_by!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}


VisitorType.init({
    id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: UUIDV4
    },
    visitor_type: {
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
    tableName: 'visitor_types',
    modelName: 'VisitorType',
    timestamps: true,
    underscored: true
});

VisitorType.belongsTo(User, {
    foreignKey: 'created_by',
    as: 'visitor_type_created_by',
});

VisitorType.belongsTo(User, {
    foreignKey: 'updated_by',
    as: 'visitor_type_updated_by',
});

export { VisitorType, VisitorTypeAttributes, VisitorTypeCreationAttributes };