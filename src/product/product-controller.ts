import { Logger } from "winston";
import { ProductService } from "./product-service";
import { Request } from "express-jwt";
import { NextFunction, Response } from "express";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import { Product, ProductRequest } from "./product-types";

export class ProductController {
    constructor(
        private productService: ProductService,
        private logger: Logger,
    ) {
        this.create = this.create.bind(this);
    }

    async create(req: ProductRequest, res: Response, next: NextFunction) {
        const result = validationResult(req);

        if (!result.isEmpty()) {
            return next(createHttpError(400, result.array()[0].msg as string));
        }

        console.log(req.body);

        //algo
        //image upload

        const {
            name,
            description,
            priceConfiguration,
            attributes,
            tenantId,
            categoryId,
            isPublish,
            image,
        } = req.body;

        const product = {
            name,
            description,
            priceConfiguration: JSON.parse(
                priceConfiguration as unknown as string,
            ),
            attributes: JSON.parse(attributes as unknown as string),
            // priceConfiguration,
            // attributes,
            tenantId,
            categoryId,
            isPublish,
            image,
        };

        console.log(product);

        const newProduct = await this.productService.create(product as Product);
        console.log(newProduct);

        //save product in db
        //send respones

        // res.json({
        //     message: "This is An Product Create Controller",
        // });

        res.status(201).json({
            _id: newProduct._id,
        });
    }
}
