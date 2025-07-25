import mongoose from "mongoose";
import config from "config";
import logger from "./logger";

export const initDb = async () => {
    await mongoose.connect(config.get("database.url"));
    logger.info("Database is Connected");
};
