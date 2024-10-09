import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/mongo.config";
import {indexRoutes} from "./routes/indexRoutes";
import logger from "./utils/logger";
import errorHandler from "./utils/error.handler";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(indexRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

db().then();

app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});
