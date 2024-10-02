import { Router } from "express";
import { paisRoutes } from "./paisRoutes"; // Importar las rutas de país

const router = Router();

// Rutas de país dentro de las rutas de autenticación
router.use("/pais", paisRoutes);

// Ruta de prueba para autenticación (por ahora sin protección)
router.get("/", (req, res) => {
    res.send("Bienvenido a las rutas privadas! Aún no se ha implementado autenticación.");
});

export { router as authRoutes };