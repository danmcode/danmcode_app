import { Model, DataTypes, Optional, UUIDV4 } from 'sequelize';
import sequelize from '../index';
import { User } from './user.model';
import { Client } from './client.model';

interface JobTitleAttributes {
    id: string; 
    job_title: string;
    description: string;
    client_id: string;
    is_active: boolean;
    created_by: string;
    updated_by: string;
}


interface JobTitleCreationAttributes extends Optional<JobTitleAttributes, 'id' | 'is_active'> { }

class JobTitle extends Model<JobTitleAttributes, JobTitleCreationAttributes> implements JobTitleAttributes {
    public id!: string;
    public job_title!: string;
    public description!: string;
    public client_id!: string;
    public is_active!: boolean;
    public created_by!: string;
    public updated_by!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}


JobTitle.init({
    id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: UUIDV4
    },
    job_title: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    client_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            key: 'id',
            model: Client
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
    tableName: 'job_titles',
    modelName: 'JobTitle',
    timestamps: true,
    underscored: true
});

export { JobTitle, JobTitleAttributes, JobTitleCreationAttributes };