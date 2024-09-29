import { Router } from "express";

const router = Router();

// Ejemplo de una ruta pública
router.get("/", (req, res) => {
    res.send("Bienvenido a la API privada!");
});

// Otras rutas públicas aquí

export { router as authRoutes };