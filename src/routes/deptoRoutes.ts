import { Router } from "express";
import { createDepto, getDeptos, getDeptoById, updateDepto, deleteDepto } from "../controllers/DeptoController";

const router = Router();

router.post("/", createDepto);
router.get("/", getDeptos);
router.get("/:id", getDeptoById);
router.put("/:id", updateDepto);
router.delete("/:id", deleteDepto);

export { router as deptoRoutes };
