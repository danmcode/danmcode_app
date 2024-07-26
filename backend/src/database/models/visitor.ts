import { Model, DataTypes, Optional, UUIDV4 } from 'sequelize';
import sequelize from '../index';
import { User } from './user.model';

interface VisitorAttributes {
    id: string;
    identification_type_id: string;
    identification: string;
    name: string;
    last_name: string;
    photo_path: string;
    phone_number: string;
    visitor_card_number: string;
    descripcion: string;
    description: string;
    is_active: boolean;
    created_by: string;
    updated_by: string;
}

interface VisitorCreationAttributes extends Optional<VisitorAttributes, 'id' | 'is_active'> { }

class Visitor extends Model<VisitorAttributes, VisitorCreationAttributes> implements VisitorAttributes {
    public id!: string;
    public identification_type_id!: string;
    public identification!: string;
    public name!: string;
    public last_name!: string;
    public photo_path!: string;
    public phone_number!: string;
    public visitor_card_number!: string;
    public descripcion!: string;
    public description!: string;
    public is_active!: boolean;
    public created_by!: string;
    public updated_by!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}


Visitor.init({
    id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: UUIDV4
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
    tableName: 'visitor_type_ids',
    modelName: 'Visitor',
    timestamps: true,
    underscored: true
});

Visitor.belongsTo(User, {
    foreignKey: 'created_by',
    as: 'visitor_type_id_created_by',
});

Visitor.belongsTo(User, {
    foreignKey: 'updated_by',
    as: 'visitor_type_id_updated_by',
});

export { Visitor, VisitorAttributes, VisitorCreationAttributes };