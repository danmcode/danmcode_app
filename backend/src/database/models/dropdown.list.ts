import { Model, DataTypes, Optional, UUIDV4 } from 'sequelize';
import sequelize from '../index';
import { User } from './user.model';

interface DropDownListAttributes {
    id: string;
    list_name: string;
    is_active: boolean;
}

interface DropDownListCreationAttributes extends Optional<DropDownListAttributes, 'id' | 'is_active'> { }

class DropDownList extends Model<DropDownListAttributes, DropDownListCreationAttributes> implements DropDownListAttributes {
    public id!: string;
    public list_name!: string;
    public description!: string;
    public is_active!: boolean;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}


DropDownList.init({
    id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: UUIDV4
    },
    list_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    sequelize,
    tableName: 'dropdown_list',
    modelName: 'DropDownList',
    timestamps: true,
    underscored: true
});

// DropDownList.belongsTo(User, {
//     foreignKey: 'created_by',
//     as: 'dropdown_list_created_by',
// });

// DropDownList.belongsTo(User, {
//     foreignKey: 'updated_by',
//     as: 'dropdown_list_updated_by',
// });

export { DropDownList, DropDownListAttributes, DropDownListCreationAttributes };