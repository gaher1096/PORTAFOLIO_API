import multer, { FileFilterCallback } from "multer";
import { Request } from "express";
import path from "path";
import logger from "../utils/logger";
import { storageConfig } from "../config/multer.config";

// Interfaz para los parámetros de configuración
interface MulterOptions {
    destination: string;
    fileTypes: RegExp;
    maxSize: number;
}

// Función para crear el middleware de Multer de forma dinámica
const createMulterMiddleware = ({ destination, fileTypes, maxSize }: MulterOptions) => {
    // Configuración del almacenamiento
    const storage = storageConfig(destination);

    // Filtro para validar el tipo de archivo permitido
    const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
        const extname = path.extname(file.originalname).toLowerCase();
        const mimetype = file.mimetype;

        // Agregar log para depuración
        logger.info(`Tipo de archivo recibido: ${file.originalname} - MIME: ${mimetype}`);

        // Validar la extensión y el tipo MIME
        if (/\.(jpg|jpeg|png|gif)$/i.test(extname) && /^image\/(jpeg|png|gif)$/.test(mimetype)) {
            cb(null, true);
        } else {
            logger.error(`Error: archivo inválido: ${file.originalname}. Tipos permitidos: .jpg, .jpeg, .png, .gif`);
            cb(new Error(`Error: Solo se permiten archivos con tipos: .jpg, .jpeg, .png, .gif`));
        }
    };

    // Configuración de Multer con almacenamiento, filtro y límites
    return multer({
        storage,
        fileFilter,
        limits: { fileSize: maxSize }
    });
};

export default createMulterMiddleware;
