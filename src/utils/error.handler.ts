import { Request, Response, NextFunction } from 'express';
import logger from './logger';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    // Registro del error en el logger
    logger.error({
        message: err.message || 'Error sin mensaje',
        stack: err.stack || 'No stack trace',
        path: req.path, // Ruta donde ocurrió el error
        method: req.method, // Método de la solicitud
        ip: req.ip // IP del cliente
    });

    // Determinar el estado de respuesta
    const status = err.status || 500; // Si no hay un estado, se asume 500

    // Personalizar el mensaje para errores conocidos
    let message: string;

    if (status === 400) {
        message = 'Petición incorrecta. Verifica los datos enviados.';
    } else if (status === 401) {
        message = 'No autorizado. Inicia sesión para acceder a este recurso.';
    } else if (status === 404) {
        message = 'Recurso no encontrado.';
    } else if (status === 403) {
        message = 'Acceso prohibido.';
    } else {
        message = err.message || 'Algo salió mal';
    }

    // Enviar respuesta de error
    res.status(status).json({
        status: 'error',
        statusCode: status,
        message: message,
    });
};

export default errorHandler;
