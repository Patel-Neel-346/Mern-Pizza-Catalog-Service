import express, { NextFunction, Request, Response } from "express";
import { CategoryController } from "./category-controller";
import categoryValidator from "./category-validator";
import { CategoryService } from "./category-service";
import logger from "../config/logger";
import { asyncWrapper } from "../common/utils/wrapper";
import authenticate from "../common/middlewares/authenticate";
import { CanAccess } from "../common/middlewares/canAccess";
import { Roles } from "../common/constants";

const router = express.Router();

//class instance

const categoryService = new CategoryService();
const categoryController = new CategoryController(categoryService, logger);

router.post(
    "/",
    authenticate,
    CanAccess([Roles.ADMIN]),
    categoryValidator,
    asyncWrapper(categoryController.create),
    // (req: Request, res: Response, next: NextFunction) =>
    //     categoryController.create(req, res, next),
);
export default router;
