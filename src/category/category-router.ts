import express, { NextFunction, Request, Response } from "express";
import { CategoryController } from "./category-controller";
import categoryValidator from "./category-validator";
import { CategoryService } from "./category-service";
import logger from "../config/logger";
import { asyncWrapper } from "../common/utils/wrapper";
import authenticate from "../common/middlewares/authenticate";

const router = express.Router();

//class instance

const categoryService = new CategoryService();
const categoryController = new CategoryController(categoryService, logger);

router.post(
    "/",
    authenticate,
    categoryValidator,
    asyncWrapper(categoryController.create),
    // (req: Request, res: Response, next: NextFunction) =>
    //     categoryController.create(req, res, next),
);
export default router;
