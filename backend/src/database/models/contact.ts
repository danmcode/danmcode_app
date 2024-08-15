import { Model, DataTypes, Optional, UUIDV4 } from 'sequelize';
import sequelize from '../index';
import { User } from './user.model';
import { Client } from './client.model';
import { JobTitle } from './job.titles.model';
import { SubLocation } from './sub.location';
import { DropDownListItem } from './dropdown.list.item';

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
        allowNull: false,
        references: {
            key: 'id',
            model: User
        }
    },
    contact_type_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            key: 'id',
            model: DropDownListItem
        }
    },
    resident_type_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            key: 'id',
            model: DropDownListItem
        }
    },
    job_title_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            key: 'id',
            model: JobTitle
        }
    },
        client_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            key: 'id',
            model: Client
        }
    },
    sub_location_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            key: 'id',
            model: SubLocation
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
    tableName: 'contacts',
    modelName: 'Contact',
    timestamps: true,
    underscored: true
});

export { Contact, ContactAttributes, ContactCreationAttributes };