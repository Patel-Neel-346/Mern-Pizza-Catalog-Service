import config from "config";

import express, { Request, Response } from "express";
import { globalErrorHandler } from "./common/middlewares/globalErrorHandler";
import CategoryRouter from "./category/category-router";
import cookieParser from "cookie-parser";
import ProductRouter from "./product/product-routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.get("/", (req: Request, res: Response) => {
    res.json({ Port: config.get("server.port"), Message: "Helllo World!" });
});

app.use("/category", CategoryRouter);
app.use("/Product", ProductRouter);

app.use(globalErrorHandler);

export default app;
