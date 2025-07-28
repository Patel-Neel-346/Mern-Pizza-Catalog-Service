import express from "express";
import authenticate from "../common/middlewares/authenticate";
import { CanAccess } from "../common/middlewares/canAccess";
import { Roles } from "../common/constants";
import productValidator from "./product-validator";
const router = express.Router();

router.post(
    "/",
    authenticate,
    CanAccess([Roles.ADMIN, Roles.MANAGER]),
    productValidator,
);

export default router;
