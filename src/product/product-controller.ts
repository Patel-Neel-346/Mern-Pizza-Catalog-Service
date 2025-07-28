import { Logger } from "winston";
import { ProductService } from "./product-service";
import { Request } from "express-jwt";
import { NextFunction, Response } from "express";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";

export class ProductController {
    constructor(
        private productService: ProductService,
        private logger: Logger,
    ) {
        this.create = this.create.bind(this);
    }

    async create(req: Request, res: Response, next: NextFunction) {
        const result = validationResult(req);

        if (!result.isEmpty()) {
            return next(createHttpError(400, result.array()[0].msg as string));
        }
        res.json({
            message: "This is An Product Create Controller",
        });
    }
}
