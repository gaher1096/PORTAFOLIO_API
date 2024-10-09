// middlewares/errorHandler.middleware.ts
import { Request, Response, NextFunction } from "express";
import multer from "multer";
import logger from "../utils/logger";

// Middleware para capturar errores de Multer
export const multerErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof multer.MulterError) {
        logger.error(`Multer Error: ${err.message}`);
        return res.status(400).json({ error: `Multer Error: ${err.message}` });
    } else if (err) {
        logger.error(`Error de carga: ${err.message}`);
        return res.status(400).json({ error: err.message });
    }
    next();
};
