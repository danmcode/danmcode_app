import { Model, DataTypes, Optional, UUIDV4 } from 'sequelize';
import sequelize from '../index';
import { User } from './user.model';
import { Contact } from './contact';

interface MessageAttributes {
    id: string;
    from: string;
    to: string;
    message: string;
    delivered: boolean;
    received: boolean;
    created_by: string;
    updated_by: string;
}

interface MessageCreationAttributes extends Optional<MessageAttributes, 'id'> { }

class Message extends Model<MessageAttributes, MessageCreationAttributes> implements MessageAttributes {
    
    public id!: string;
    public from!: string;
    public to!: string;
    public message!: string;
    public delivered!: boolean;
    public received!: boolean;
    public created_by!: string;
    public updated_by!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}


Message.init({
    id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: UUIDV4
    },
    from : {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    to : {
        type: DataTypes.UUID,
        allowNull: false,
    },
    message : {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    delivered : {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    received : {
        type: DataTypes.BOOLEAN,
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
    tableName: 'messages',
    modelName: 'Message',
    timestamps: true,
    underscored: true
});


Message.belongsTo(Contact, {
    foreignKey: 'to',
    as: 'contact',
});

Message.belongsTo(User, {
    foreignKey: 'created_by',
    as: 'message_created_by',
});

Message.belongsTo(User, {
    foreignKey: 'updated_by',
    as: 'message_updated_by',
});

export { Message, MessageAttributes, MessageCreationAttributes };