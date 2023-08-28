import { NextFunction, Request, Response } from "express";

export type Option<T> = T | undefined;

export function wrapTryCatch(handler : (req: Request, res: Response, next: NextFunction) => any) 
: (req: Request, res: Response, next: NextFunction) => any {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            return await handler(req, res, next);
        } catch(e) {
            return next(e);
        }
    }
}