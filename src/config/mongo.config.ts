import { connect, connection } from "mongoose";
import logger from "../utils/logger";

async function dbConnect(): Promise<void> {
    const DB_URI = process.env.DB_URI;

    if (!DB_URI) {
        throw new Error("La URI de la base de datos no está definida en las variables de entorno.");
    }

    try {
        await connect(DB_URI);
        logger.info("Conexión a la base de datos establecida correctamente.");
    } catch (error) {
        logger.error("Error al conectar a la base de datos:", error);
        throw new Error("No se pudo conectar a la base de datos.");
    }

    connection.on("error", (err) => {
        logger.error("Error en la conexión a la base de datos:", err);
    });

    connection.once("open", () => {
        logger.info("Conexión a la base de datos abierta.");
    });
}

export default dbConnect;