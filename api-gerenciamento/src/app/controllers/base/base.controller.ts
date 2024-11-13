import { Request, Response, NextFunction } from "express";

export abstract class BaseController<TService> {
    protected service: TService;

    constructor(service: TService) {
        this.service = service;
    }

    protected async handleRequest(req: Request, res: Response, next: NextFunction, action: (data: any) => Promise<any>, successMessage: string, statusCode: number = 201) {
        try {
            const data = req.body;
            const result = await action(data);
            res.status(statusCode).json({
                status: 'success',
                data: result,
                message: successMessage
            });
        } catch (error) {
            next(error);
        }
    }
}
