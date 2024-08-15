import { Model, DataTypes, Optional, UUIDV4 } from 'sequelize';
import sequelize from '../index';
import { User } from './user.model';
import { Location } from './location';
import { DropDownListItem } from './dropdown.list.item';

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
        allowNull: false,
        references: {
            key: 'id',
            model: Location
        }
    },
    location_type_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            key: 'id',
            model: DropDownListItem
        }
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    created_by: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            key: 'id',
            model: User
        }
    },
    updated_by: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            key: 'id',
            model: User
        }
    },
}, {
    sequelize,
    tableName: 'sub_locations',
    modelName: 'SubLocation',
    timestamps: true,
    underscored: true
});

export { SubLocation, SubLocationAttributes, SubLocationCreationAttributes };