import { Model, DataTypes, Optional, UUIDV4 } from 'sequelize';
import sequelize from '../index';
import { User } from './user.model';
import { Contact } from './contact';

interface CorrespondenceAttributes {
    id: string;
    from: string;
    to: string;
    guide: string;
    description: string;
    transporter: string;
    delivered: boolean;
    received: boolean;
    created_by: string;
    updated_by: string;
}

interface CorrespondenceCreationAttributes extends Optional<CorrespondenceAttributes, 'id'> { }

class Correspondence extends Model<CorrespondenceAttributes, CorrespondenceCreationAttributes> implements CorrespondenceAttributes {
    
    public id!: string;
    public from!: string;
    public to!: string;
    public guide!: string;
    public description!: string;
    public transporter!: string;
    public delivered!: boolean;
    public received!: boolean;
    public created_by!: string;
    public updated_by!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}


Correspondence.init({
    id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: UUIDV4
    },
    from: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    to: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    guide: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    transporter: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    delivered: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    received: {
        type: DataTypes.STRING,
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
    tableName: 'correspondences',
    modelName: 'Correspondence',
    timestamps: true,
    underscored: true
});


Correspondence.belongsTo(Contact, {
    foreignKey: 'to',
    as: 'contact',
});

Correspondence.belongsTo(User, {
    foreignKey: 'created_by',
    as: 'message_created_by',
});

Correspondence.belongsTo(User, {
    foreignKey: 'updated_by',
    as: 'message_updated_by',
});

export { Correspondence, CorrespondenceAttributes, CorrespondenceCreationAttributes };