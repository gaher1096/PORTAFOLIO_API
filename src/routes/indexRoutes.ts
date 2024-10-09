import { Router } from "express";
import { publicRoutes } from "./publicRoutes";
import { authRoutes } from "./authRoutes";

const router = Router();

// Usar las rutas públicas
router.use("/api/", publicRoutes);

// Usar las rutas de autenticación
router.use("/api/auth", authRoutes);

export { router as indexRoutes };
