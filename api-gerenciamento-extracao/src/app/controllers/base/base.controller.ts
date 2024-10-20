import { Request, Response, NextFunction } from "express";
import { QueryFailedError } from "typeorm";
import { DuplicateEntryError } from "../../errors/database.error";

export abstract class BaseController<TService> {
    protected service: TService;

    constructor(service: TService) {
        this.service = service;
    }

    protected async handleRequest(req: Request, res: Response, next: NextFunction, action: (data: any) => Promise<any>, successMessage: string) {
        try {
            const data = req.body;
            const result = await action(data);
            res.status(201).json({
                status: 'success',
                data: result,
                message: successMessage
            });
        } catch (error: any) {
            if (error instanceof QueryFailedError && error.driverError.code === 'ER_DUP_ENTRY') {
                throw new DuplicateEntryError('Esse dado já existe no banco de dados.');
            }
            next(error);
        }
    }
}
