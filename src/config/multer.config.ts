import multer from 'multer';
import path from 'path';

// Función para configurar el almacenamiento de Multer
export const storageConfig = (destination: string) => multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, destination);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    }
});
