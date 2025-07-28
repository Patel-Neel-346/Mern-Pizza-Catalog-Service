import express from "express";
import authenticate from "../common/middlewares/authenticate";
import { CanAccess } from "../common/middlewares/canAccess";
import { Roles } from "../common/constants";
import productValidator from "./product-validator";
import { ProductService } from "./product-service";
import { ProductController } from "./product-controller";
import logger from "../config/logger";
import { asyncWrapper } from "../common/utils/wrapper";

//class instances

const router = express.Router();

const productService = new ProductService();

const productController = new ProductController(productService, logger);

router.post(
    "/",
    authenticate,
    CanAccess([Roles.ADMIN, Roles.MANAGER]),
    productValidator,
    asyncWrapper(productController.create),
);

export default router;
