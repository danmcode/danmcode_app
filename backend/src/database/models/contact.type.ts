import { Model, DataTypes, Optional, UUIDV4 } from 'sequelize';
import sequelize from '../index';
import { User } from './user.model';

interface ContactTypeAttributes {
    id: string;
    contact_type: string;
    description: string;
    is_active: boolean;
    created_by: string;
    updated_by: string;
}

interface ContactTypeCreationAttributes extends Optional<ContactTypeAttributes, 'id' | 'is_active'> { }

class ContactType extends Model<ContactTypeAttributes, ContactTypeCreationAttributes> implements ContactTypeAttributes {
    public id!: string;
    public contact_type!: string;
    public description!: string;
    public is_active!: boolean;
    public created_by!: string;
    public updated_by!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}


ContactType.init({
    id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: UUIDV4
    },
    contact_type: {
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
    tableName: 'contact_types',
    modelName: 'ContactType',
    timestamps: true,
    underscored: true
});

ContactType.belongsTo(User, {
    foreignKey: 'created_by',
    as: 'location_type_created_by',
});

ContactType.belongsTo(User, {
    foreignKey: 'updated_by',
    as: 'location_type_updated_by',
});

export { ContactType, ContactTypeAttributes, ContactTypeCreationAttributes };