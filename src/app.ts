import config from "config";

import express, { Request, Response } from "express";
import { globalErrorHandler } from "./common/middlewares/globalErrorHandler";
import CategoryRouter from "./category/category-router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
    res.json({ Port: config.get("server.port"), Message: "Helllo World!" });
});

app.use("/category", CategoryRouter);

app.use(globalErrorHandler);

export default app;
