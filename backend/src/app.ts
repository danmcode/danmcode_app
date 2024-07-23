import cors from 'cors';
import express, { Application, Request, Response, NextFunction } from 'express';
import http from 'http';
import 'dotenv/config';
import database from './database';
import registerRoutes from './routes';
import logger from './lib/logger';

export default class App {
    
	public express!: Application;
	public httpServer!: http.Server;

	public async init(): Promise<void> {
		this.express = express();
		this.httpServer = http.createServer(this.express);

		await this.assertDatabaseConnection();

		this.middleware();
		this.routes();
	}

	/**
	 * here register your all routes
	 */
	private routes(): void {
		this.express.get('/', this.basePathRoute);
		this.express.use('/api', registerRoutes());
	}

	/**
	 * here you can apply your middlewares
	 */
	private middleware(): void {

		this.express.use(express.json({ limit: '100mb' }));
		this.express.use(
			express.urlencoded({ limit: '100mb', extended: true }),
		);

		// add multiple cors options as per your use
		const corsOptions = {
			origin: [
				'http://localhost:8080/',
				'http://example.com/',
				'http://127.0.0.1:8080',
			],
		};
		this.express.use(cors(corsOptions));
	}

	private parseRequestHeader(
		_req: Request,
		_res: Response,
		next: NextFunction,
	): void {
		// parse request header
		// console.log(req.headers.access_token);
		next();
	}

	private basePathRoute(_request: Request, response: Response): void {
		response.json({ message: 'base path' });
	}

	private async assertDatabaseConnection(): Promise<void> {
		try {
			await database.authenticate();
			await database.sync();
			logger.info('Connection has been established successfully.');
		} catch (error) {
			logger.error('Unable to connect to the database:', error);
		}
	}

}