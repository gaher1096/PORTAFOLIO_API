import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';

// Definir niveles de log personalizados (opcional)
const customLevels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6
};

// Configurar el logger con Winston
const logger = createLogger({
    levels: customLevels,
    level: 'info', // Nivel predeterminado
    format: format.combine(
        format.timestamp(),
        process.env.NODE_ENV === 'production' ? format.json() : format.simple() // Formato según el entorno
    ),
    transports: [
        new transports.Console(), // Muestra logs en la consola
        new transports.DailyRotateFile({
            filename: 'logs/application-%DATE%.log', // Archivos con rotación diaria
            datePattern: 'YYYY-MM-DD',
            maxFiles: '14d', // Mantener logs por 14 días
            level: 'info', // Nivel de log para rotar (puede ser error, info, etc.)
        }),
        new transports.File({ filename: 'logs/error.log', level: 'error' }) // Logs de errores en un archivo separado
    ],
    exceptionHandlers: [
        new transports.File({ filename: 'logs/exceptions.log' }) // Manejar excepciones no controladas
    ],
    rejectionHandlers: [
        new transports.File({ filename: 'logs/rejections.log' }) // Manejar rechazos de promesas no controladas
    ]
});

// Exportar el logger para usarlo en otros módulos
export default logger;
