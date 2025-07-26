import express, { NextFunction, Request, Response } from "express";
import { CategoryController } from "./category-controller";
import categoryValidator from "./category-validator";
import { CategoryService } from "./category-service";
import logger from "../config/logger";
import { asyncWrapper } from "../common/utils/wrapper";
import authenticate from "../common/middlewares/authenticate";
import { CanAccess } from "../common/middlewares/canAccess";
import { Roles } from "../common/constants";
import categoryUpdateValidator from "./category-update-validator";

const router = express.Router();

//class instance

const categoryService = new CategoryService();
const categoryController = new CategoryController(categoryService, logger);

//create category
router.post(
    "/",
    authenticate,
    CanAccess([Roles.ADMIN]),
    categoryValidator,
    asyncWrapper(categoryController.create),
    // (req: Request, res: Response, next: NextFunction) =>
    //     categoryController.create(req, res, next),
);

//update category
router.patch(
    "/:id",
    authenticate,
    CanAccess([Roles.ADMIN]),
    categoryUpdateValidator,
);

//get all Category
router.get("/", asyncWrapper(categoryController.index));

//get catergory by id

router.get("/:categoryId");
export default router;
