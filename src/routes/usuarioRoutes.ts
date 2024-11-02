import { Router } from "express";
import { createUsuario, getUsuarios, getUsuariosById, updateUsuario, deleteUsuario } from "../controllers/UsuarioController";
import createMulterMiddleware from "../middlewares/upload.middleware";
import { createUsuarioValidator, updateUsuarioValidator } from "../validators/usuario.validator";
import validate from '../middlewares/validate.middleware';

const router = Router();

// Configurar el middleware de carga de archivos
const upload = createMulterMiddleware({
    destination: 'storage/uploads/usuarios/',
    fileTypes: /\.(jpg|jpeg|png|gif)$/i,
    maxSize: 5 * 1024 * 1024
});

router.post("/", validate(createUsuarioValidator), upload.single("imagenusuario"), createUsuario);
router.get("/", getUsuarios);
router.get("/:id", getUsuariosById);
router.put("/:id", validate(updateUsuarioValidator), upload.single("imagenusuario"), updateUsuario);
router.delete("/:id", deleteUsuario);

export { router as usuarioRoutes };