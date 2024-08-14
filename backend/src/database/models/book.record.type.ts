import { Model, DataTypes, Optional, UUIDV4 } from 'sequelize';
import sequelize from '../index';
import { User } from './user.model';

interface BookRecordTypeAttributes {
    id: string;
    book_record_type: string;
    description: string;
    is_active: boolean;
    created_by: string;
    updated_by: string;
}

interface BookRecordTypeCreationAttributes extends Optional<BookRecordTypeAttributes, 'id' | 'is_active'> { }

class BookRecordType extends Model<BookRecordTypeAttributes, BookRecordTypeCreationAttributes> implements BookRecordTypeAttributes {
    public id!: string;
    public book_record_type!: string;
    public description!: string;
    public is_active!: boolean;
    public created_by!: string;
    public updated_by!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}


BookRecordType.init({
    id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: UUIDV4
    },
    book_record_type: {
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
    tableName: 'book_record_types',
    modelName: 'BookRecordType',
    timestamps: true,
    underscored: true
});

BookRecordType.belongsTo(User, {
    foreignKey: 'created_by',
    as: 'book_record_type_created_by',
});

BookRecordType.belongsTo(User, {
    foreignKey: 'updated_by',
    as: 'book_record_type_updated_by',
});

export { BookRecordType, BookRecordTypeAttributes, BookRecordTypeCreationAttributes };