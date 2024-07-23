import { Request, Response, NextFunction } from 'express';
import { ValidationChain } from 'express-validator';

export interface RouteDefinition {
	path: string;
	method: 'get' | 'post' | 'put' | 'patch' | 'delete';
	handler: (req: Request, res: Response, next: NextFunction) => void;
	validator?: ValidationChain[];
}