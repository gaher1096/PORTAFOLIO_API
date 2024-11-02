import { Request, Response, NextFunction } from 'express';
import { ValidationChain, validationResult } from 'express-validator';
import logger from '../utils/logger';

const validate = (validations: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        logger.info(`Cuerpo de la solicitud en ${req.path}: ${JSON.stringify(req.body)}`);;

        await Promise.all(validations.map(validation => validation.run(req)));

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        logger.warn(`Errores de validación en la ruta ${req.path}: ${JSON.stringify(errors.array())}`);

        res.status(400).json({ errors: errors.array() });
    };
};

export default validate;
