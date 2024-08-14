import { Model, DataTypes, Optional, UUIDV4 } from 'sequelize';
import sequelize from '../index';
import { User } from './user.model';
import { Visitor } from './visitor';
import { Contact } from './contact';
import { Vehicle } from './vehicle';
import { Arl } from './arl';
import { Equipment } from './equipment';
import { VisitorType } from './visitor.type';

interface IncomeExitVisitorAttributes {
    id: string;
    date_time_in: Date;
    date_time_out: Date;
    income_observations: string;
    exit_observation: string;
    come_from: string;
    remission: string;
    visitor_type_id: string;
    arl_id: string;
    equipment_id: string;
    vehicle_id: string;
    visitor_id: string;
    visit_to: string;
    created_by: string;
    updated_by: string;    
}

interface IncomeExitVisitorCreationAttributes extends Optional<IncomeExitVisitorAttributes, 'id'> { }

class IncomeExitVisitor extends Model<IncomeExitVisitorAttributes, IncomeExitVisitorCreationAttributes> implements IncomeExitVisitorAttributes {
    public id!: string;
    public date_time_in!: Date;
    public date_time_out!: Date;
    public income_observations!: string;
    public exit_observation!: string;
    public come_from!: string;
    public remission!: string;
    public visitor_type_id!: string;
    public arl_id!: string;
    public equipment_id!: string;
    public vehicle_id!: string;
    public visitor_id!: string;
    public visit_to!: string;
    public created_by!: string;
    public updated_by!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}


IncomeExitVisitor.init({
    id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: UUIDV4
    },
    date_time_in : {
        type: DataTypes.DATE,
        allowNull: false,
    },
    date_time_out : {
        type: DataTypes.DATE,
        allowNull: true,
    },
    income_observations : {
        type: DataTypes.STRING(200),
        allowNull: true,
    },
    exit_observation : {
        type: DataTypes.STRING(200),
        allowNull: true,
    },
    come_from : {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    remission : {
        type: DataTypes.STRING(200),
        allowNull: true,
    },
    visitor_type_id : {
        type: DataTypes.UUID,
        allowNull: false,
    },
    arl_id : {
        type: DataTypes.UUID,
        allowNull: true,
    },
    equipment_id : {
        type: DataTypes.UUID,
        allowNull: true,
    },
    vehicle_id : {
        type: DataTypes.UUID,
        allowNull: true,
    },
    visitor_id : {
        type: DataTypes.UUID,
        allowNull: false,
    },
    visit_to : {
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
    tableName: 'income_exit_visitors',
    modelName: 'IncomeExitVisitor',
    timestamps: true,
    underscored: true
});

IncomeExitVisitor.belongsTo(Visitor, {
    foreignKey: 'visitor_id',
    as: 'visitor'
});

IncomeExitVisitor.belongsTo(Contact, {
    foreignKey: 'visit_to',
    as: 'contact'
});

IncomeExitVisitor.belongsTo(Vehicle, {
    foreignKey: 'vehicle_id',
    as: 'vehicle'
});

IncomeExitVisitor.belongsTo(Arl, {
    foreignKey: 'arl_id',
    as: 'arl'
});

IncomeExitVisitor.belongsTo(Equipment, {
    foreignKey: 'equipment_id',
    as: 'equipment'
});

IncomeExitVisitor.belongsTo(VisitorType, {
    foreignKey: 'visitor_type_id',
    as: 'visitor_type'
});

IncomeExitVisitor.belongsTo(User, {
    foreignKey: 'created_by',
    as: 'income_exit_created_by',
});

IncomeExitVisitor.belongsTo(User, {
    foreignKey: 'updated_by',
    as: 'income_exit_updated_by',
});

export { IncomeExitVisitor, IncomeExitVisitorAttributes, IncomeExitVisitorCreationAttributes };