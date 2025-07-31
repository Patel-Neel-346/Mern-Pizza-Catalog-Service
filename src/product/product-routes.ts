import express from "express";
import authenticate from "../common/middlewares/authenticate";
import { CanAccess } from "../common/middlewares/canAccess";
import { Roles } from "../common/constants";
import productValidator from "./product-validator";
import { ProductService } from "./product-service";
import { ProductController } from "./product-controller";
import logger from "../config/logger";
import { asyncWrapper } from "../common/utils/wrapper";
import fileUpload from "express-fileupload";
import { S3Stroage } from "../common/service/S3Storage";
import createHttpError from "http-errors";

//class instances

const router = express.Router();

const productService = new ProductService();
const s3Stroage = new S3Stroage();
const productController = new ProductController(
    productService,
    logger,
    s3Stroage,
);

router.post(
    "/",
    authenticate,
    CanAccess([Roles.ADMIN, Roles.MANAGER]),
    fileUpload({
        limits: {
            fileSize: 500 * 1024,
        }, //500kb
        abortOnLimit: true,
        limitHandler: (req, res, next) => {
            const error = createHttpError(400, "File size exceeds the limit");
            next(error);
        },
    }),
    productValidator,
    asyncWrapper(productController.create),
);

export default router;
