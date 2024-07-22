import { Model, DataTypes, Sequelize } from 'sequelize';

const ROLE_TABLE = 'roles';

interface RoleAttributes {
    id?: number;
    rol_name: string;
    description: string;
    is_active: number;
    created_at: number;
    updated_at: string;
}

// Extender la clase Model
class Role extends Model<RoleAttributes> implements RoleAttributes {
    public id!: number;
    public rol_name!: string;
    public description!: string;
    public is_active!: number;
    public created_at!: number;
    public updated_at!: string;

    static config(sequelize: Sequelize) {
        return {
            sequelize,
            tableName: ROLE_TABLE,
            modelName: 'Role',
            timestamps: true,
        };
    }
}

const RoleSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'name',
    },
    reference: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'reference',
    },
    price: {
        allowNull: false,
        type: DataTypes.DOUBLE,
        field: 'price',
    },
    weight: {
        allowNull: false,
        type: DataTypes.DOUBLE,
        field: 'weight',
    },
    category: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'category',
    },
    stock: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'stock',
    },
};

export { Role, RoleSchema };