import { Sequelize } from 'sequelize';
import { envs } from './env.plugin';


class Database {
    public sequelize: Sequelize;

    constructor() {
        this.sequelize = new Sequelize(
            envs.POSTGRES_DB,
            envs.POSTGRES_USER,
            envs.POSTGRES_PASSWORD,
            {
                host: envs.SERVER,
                dialect: 'postgres',
            }
        );

        this.initialize();
    }

    private async initialize() {
        try {
            await this.sequelize.sync();
            // setupModels(this.sequelize);
            console.log('Database synchronized and models set up.');
        } catch (error) {
            console.error('Error initializing the database:', error);
        }
    }
}

export default new Database().sequelize;