import { Router } from "express";

const router = Router();

// Ruta pública principal
router.get("/", (req, res) => {
    res.send("Bienvenido a la API pública!");
});

// Ruta para obtener información adicional (ejemplo)
router.get("/info", (req, res) => {
    res.json({ message: "Esta es una ruta pública que puede ser vista por todos." });
});

// Otras rutas públicas aquí

export { router as publicRoutes };
