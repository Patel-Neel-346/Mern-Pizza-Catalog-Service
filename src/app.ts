import config from "config";

import express, { Request, Response } from "express";
import { globalErrorHandler } from "./common/middlewares/globalErrorHandler";

const app = express();

app.get("/", (req: Request, res: Response) => {
    res.json({ Port: config.get("server.port"), Message: "Helllo World!" });
});

app.use(globalErrorHandler);

export default app;
