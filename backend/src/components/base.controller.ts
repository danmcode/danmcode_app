import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { RouteDefinition } from '../types/route.definition';

export default abstract class BaseController {
	public abstract routes(): RouteDefinition[];

	/**
	 * Global method to send API response
	 * @param res
	 * @param statusCode
	 */
	public send(res: Response, statusCode: number = StatusCodes.OK): void {
		let obj = {};
		obj = res.locals.data;
		res.status(statusCode).send(obj);
	}
}
