import { Router } from "express";
import { createDepartamento, getDepartamentos, getDepartamentoById, updateDepartamento, deleteDepartamento } from "../controllers/DeptoController";

const router = Router();

router.post("/", createDepartamento);
router.get("/", getDepartamentos);
router.get("/:id", getDepartamentoById);
router.put("/:id", updateDepartamento);
router.delete("/:id", deleteDepartamento);

export { router as deptoRoutes };
