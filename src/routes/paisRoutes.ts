import { Router } from "express";
import { createPais, getPaises, getPaisById, updatePais, deletePais } from "../controllers/PaisController";

const router = Router();

router.post("/", createPais);
router.get("/", getPaises);
router.get("/:id", getPaisById);
router.put("/:id", updatePais);
router.delete("/:id", deletePais);

export { router as paisRoutes };
