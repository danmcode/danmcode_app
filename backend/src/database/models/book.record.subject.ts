import { Model, DataTypes, Optional, UUIDV4 } from 'sequelize';
import sequelize from '../index';
import { User } from './user.model';

interface BookRecordSubjectAttributes {
    id: string;
    book_record_subject: string;
    description: string;
    is_active: boolean;
    created_by: string;
    updated_by: string;
}

interface BookRecordSubjectCreationAttributes extends Optional<BookRecordSubjectAttributes, 'id' | 'is_active'> { }

class BookRecordSubject extends Model<BookRecordSubjectAttributes, BookRecordSubjectCreationAttributes> implements BookRecordSubjectAttributes {
    public id!: string;
    public book_record_subject!: string;
    public description!: string;
    public is_active!: boolean;
    public created_by!: string;
    public updated_by!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}


BookRecordSubject.init({
    id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: UUIDV4
    },
    book_record_subject: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(200),
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
    tableName: 'book_record_subjects',
    modelName: 'BookRecordSubject',
    timestamps: true,
    underscored: true
});

BookRecordSubject.belongsTo(User, {
    foreignKey: 'created_by',
    as: 'book_record_subject_created_by',
});

BookRecordSubject.belongsTo(User, {
    foreignKey: 'updated_by',
    as: 'book_record_subject_updated_by',
});

export { BookRecordSubject, BookRecordSubjectAttributes, BookRecordSubjectCreationAttributes };