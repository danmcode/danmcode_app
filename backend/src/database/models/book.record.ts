import { Model, DataTypes, Optional, UUIDV4 } from 'sequelize';
import sequelize from '../index';
import { User } from './user.model';
import { BookRecordType } from './book.record.type';
import { BookRecordSubject } from './book.record.subject';
import { Client } from './client.model';

interface BookRecordAttributes {
    id: string;
    description: string;
    client_id: string;
    book_record_subject_id: string;
    book_record_type_id: string;
    is_active: boolean;
    created_by: string;
    updated_by: string;
}

interface BookRecordCreationAttributes extends Optional<BookRecordAttributes, 'id' | 'is_active'> { }

class BookRecord extends Model<BookRecordAttributes, BookRecordCreationAttributes> implements BookRecordAttributes {
    public id!: string;
    public description!: string;
    public client_id!: string;
    public book_record_subject_id!: string;
    public book_record_type_id!: string;
    public is_active!: boolean;
    public created_by!: string;
    public updated_by!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}


BookRecord.init({
    id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: UUIDV4
    },
    description: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    client_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    book_record_subject_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    book_record_type_id: {
        type: DataTypes.UUID,
        allowNull: false,
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
    tableName: 'book_record',
    modelName: 'BookRecord',
    timestamps: true,
    underscored: true
});

BookRecord.belongsTo(BookRecordType, {
    foreignKey: 'book_record_type_id',
    as: 'book_record_type',
});

BookRecord.belongsTo(BookRecordSubject, {
    foreignKey: 'book_record_subject_id',
    as: 'book_record_subject',
});

BookRecord.belongsTo(Client, {
    foreignKey: 'client_id',
    as: 'client',
});

BookRecord.belongsTo(User, {
    foreignKey: 'created_by',
    as: 'book_record_created_by',
});

BookRecord.belongsTo(User, {
    foreignKey: 'updated_by',
    as: 'book_record_updated_by',
});

export { BookRecord, BookRecordAttributes, BookRecordCreationAttributes };