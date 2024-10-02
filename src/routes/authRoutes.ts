import { Router } from "express";
import { paisRoutes } from "./paisRoutes";
import { deptoRoutes } from "./deptoRoutes";

const router = Router();

router.use("/pais", paisRoutes);
router.use("/depto", deptoRoutes);

// Ruta de prueba para autenticación (por ahora sin protección)
router.get("/", (req, res) => {
    res.send("Bienvenido a las rutas privadas! Aún no se ha implementado autenticación.");
});

export { router as authRoutes };