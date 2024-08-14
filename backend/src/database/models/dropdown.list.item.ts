import { Model, DataTypes, Optional, UUIDV4 } from 'sequelize';
import sequelize from '../index';
import { DropDownList } from './dropdown.list';

interface DropDownListItemAttributes {
    id: string;
    list_id: string;
    list_item_name: string;
    description: string;
    is_active: boolean;
}

interface DropDownListItemCreationAttributes extends Optional<DropDownListItemAttributes, 'id' | 'is_active'> { }

class DropDownListItem extends Model<DropDownListItemAttributes, DropDownListItemCreationAttributes> implements DropDownListItemAttributes {
    public id!: string;
    public list_id!: string;
    public list_item_name!: string;
    public description!: string;
    public is_active!: boolean;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}


DropDownListItem.init({
    id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: UUIDV4
    },
    list_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: DropDownList,
            key: 'id',
        }
    },
    list_item_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    sequelize,
    tableName: 'dropdown_list_item',
    modelName: 'DropDownListItem',
    timestamps: true,
    underscored: true
});

export { DropDownListItem, DropDownListItemAttributes, DropDownListItemCreationAttributes };