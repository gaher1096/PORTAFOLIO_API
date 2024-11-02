import { body } from 'express-validator';

export const createUsuarioValidator = [
    body('nickusuario').isString().notEmpty().withMessage('El nick de usuario es obligatorio'),
    body('claveusuario').isLength({ min: 6 }).withMessage('La clave debe tener al menos 6 caracteres'),
    body('claveusuarioconfirmacion').custom((value, { req }) => {
        if (value !== req.body.claveusuario) {
            throw new Error('Las contraseñas no coinciden');
        }
        return true;
    }),
    body('correousuario').isEmail().withMessage('El correo electrónico debe ser válido'),
    body('nombresusuario').isString().notEmpty().withMessage('El nombre es obligatorio'),
    body('apellidosusuario').optional().isString(),
    body('telefonosusuario').optional().isString(),
    body('direccionusuario').optional().isString(),
    body('estadousuario').optional().isIn(['Activo', 'Inactivo']).withMessage('El estado debe ser Activo o Inactivo'),
];

export const updateUsuarioValidator = [
    body('nickusuario').isString().notEmpty().withMessage('El nick de usuario es obligatorio'),
    body('claveusuario').optional().isLength({ min: 6 }).withMessage('La clave debe tener al menos 6 caracteres'),
    body('claveusuarioconfirmacion').optional().custom((value, { req }) => {
        if (value && value !== req.body.claveusuario) {
            throw new Error('Las contraseñas no coinciden');
        }
        return true;
    }),
    body('correousuario').isEmail().withMessage('El correo electrónico debe ser válido'),
    body('nombresusuario').isString().notEmpty().withMessage('El nombre es obligatorio'),
    body('apellidosusuario').optional().isString(),
    body('telefonosusuario').optional().isString(),
    body('direccionusuario').optional().isString(),
    body('estadousuario').optional().isIn(['Activo', 'Inactivo']).withMessage('El estado debe ser Activo o Inactivo'),
];
