import { Model, DataTypes, Optional, UUIDV4 } from 'sequelize';
import sequelize from '../index';
import { User } from './user.model';
import { Contact } from './contact';

interface IncomeExitContactAttributes {
    id: string;
    date_time_in: Date;
    date_time_out: Date,
    income_observation: string,
    exit_observation: string,
    contact_id: string,
    created_by: string;
    updated_by: string;
}

interface IncomeExitContactCreationAttributes extends Optional<IncomeExitContactAttributes, 'id'> { }

class IncomeExitContact extends Model<IncomeExitContactAttributes, IncomeExitContactCreationAttributes> implements IncomeExitContactAttributes {
    public id!: string;
    public date_time_in!: Date;
    public date_time_out!: Date;
    public income_observation!: string;
    public exit_observation!: string;
    public contact_id!: string;
    public created_by!: string;
    public updated_by!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}


IncomeExitContact.init({
    id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: UUIDV4
    },
    date_time_in: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    date_time_out: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    income_observation: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    exit_observation: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    contact_id: {
        type: DataTypes.UUID,
        allowNull: false,
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
    tableName: 'income_exit_contacts',
    modelName: 'IncomeExitContact',
    timestamps: true,
    underscored: true
});


IncomeExitContact.belongsTo(Contact, {
    foreignKey: 'contact_id',
    as: 'contact'
});


IncomeExitContact.belongsTo(User, {
    foreignKey: 'created_by',
    as: 'income_exit_created_by',
});

IncomeExitContact.belongsTo(User, {
    foreignKey: 'updated_by',
    as: 'income_exit_updated_by',
});

export { IncomeExitContact, IncomeExitContactAttributes, IncomeExitContactCreationAttributes };