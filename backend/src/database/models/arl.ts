import { Model, DataTypes, Optional, UUIDV4 } from 'sequelize';
import sequelize from '../index';
import { User } from './user.model';

interface ArlAttributes {
    id: string;
    arl: string;
    is_active: boolean;
    created_by: string;
    updated_by: string;
}


interface ArlCreationAttributes extends Optional<ArlAttributes, 'id' | 'is_active'> { }

class Arl extends Model<ArlAttributes, ArlCreationAttributes> implements ArlAttributes {
    public id!: string;
    public arl!: string;
    public is_active!: boolean;
    public created_by!: string;
    public updated_by!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Arl.init({
    id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        unique: true,
    },
    arl: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
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
    tableName: 'arls',
    modelName: 'Arl',
    timestamps: true,
    underscored: true
});

export { Arl, ArlAttributes, ArlCreationAttributes };