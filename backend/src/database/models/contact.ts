import { Model, DataTypes, Optional, UUIDV4 } from 'sequelize';
import sequelize from '../index';
import { User } from './user.model';
import { Client } from './client.model';
import { ContactType } from './contact.type';
import { ResidentType } from './resident.type copy';
import { JobTitle } from './job.titles.model';
import { SubLocation } from './sub.location';

interface ContactAttributes {
    id: string;
    main_contact: boolean;
    qr_path: string;
    user_id: string;
    contact_type_id: string;
    resident_type_id: string;
    job_title_id: string;
    client_id: string;
    sub_location_id: string;
    is_active: boolean;
    created_by: string;
    updated_by: string;    
}


interface ContactCreationAttributes extends Optional<ContactAttributes, 'id' | 'is_active'> { }

class Contact extends Model<ContactAttributes, ContactCreationAttributes> implements ContactAttributes {
    public id!: string;
    public main_contact!: boolean;
    public qr_path!: string;
    public user_id!: string;
    public contact_type_id!: string;
    public resident_type_id!: string;
    public job_title_id!: string;
    public client_id!: string;
    public sub_location_id!: string;
    public is_active!: boolean;
    public created_by!: string;
    public updated_by!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}


Contact.init({
    id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: UUIDV4
    },
    main_contact: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    qr_path: {
        type: DataTypes.STRING(200),
        allowNull: true
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    contact_type_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    resident_type_id: {
        type: DataTypes.UUID,
        allowNull: true
    },
    job_title_id: {
        type: DataTypes.UUID,
        allowNull: true
    },
    client_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    sub_location_id: {
        type: DataTypes.UUID,
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
    tableName: 'contacts',
    modelName: 'Contact',
    timestamps: true,
    underscored: true
});

Contact.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user',
});

Contact.belongsTo(ContactType, {
    foreignKey: 'contact_type_id',
    as: 'contact_type',
});

Contact.belongsTo(ResidentType, {
    foreignKey: 'resident_type_id',
    as: 'resident_type',
});

Contact.belongsTo(JobTitle, {
    foreignKey: 'job_title_id',
    as: 'job_title',
});

Contact.belongsTo(Client, {
    foreignKey: 'client_id',
    as: 'client',
});

Contact.belongsTo(SubLocation, {
    foreignKey: 'sub_location_id',
    as: 'sub_location',
});

Contact.belongsTo(User, {
    foreignKey: 'created_by',
    as: 'location_created_by',
});

Contact.belongsTo(User, {
    foreignKey: 'updated_by',
    as: 'location_updated_by',
});

export { Contact, ContactAttributes, ContactCreationAttributes };