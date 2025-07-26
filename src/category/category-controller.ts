import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import { Category } from "./category-types";
import { CategoryService } from "./category-service";
import { Logger } from "winston";

export class CategoryController {
    constructor(
        private categoryService: CategoryService,
        private logger: Logger,
    ) {
        this.create = this.create.bind(this);
        this.index = this.index.bind(this);
        this.getOne = this.getOne.bind(this);
    }

    //create category controller
    async create(req: Request, res: Response, next: NextFunction) {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return next(createHttpError(400, result.array()[0].msg as string));
        }

        try {
            const { name, priceConfiguration, attributes } =
                req.body as Category;
            this.logger.debug("Creating category", {
                name,
                priceConfiguration,
                attributes,
            });

            const category = await this.categoryService.create({
                name,
                priceConfiguration,
                attributes,
            });

            if (!category) {
                return next(createHttpError(500, "Failed to create category"));
            }

            this.logger.info("Created category", {
                id: category._id,
            });

            res.status(201).json({
                success: true,
                message: "Category Created!",
                category,
            });
        } catch (error) {
            if (error instanceof Error) {
                this.logger.error("Error creating category", {
                    error,
                });
            }
            next(createHttpError(500, "Internal Server Error"));
        }
    }

    //get All Category controlelr

    async index(req: Request, res: Response, next: NextFunction) {
        const categories = await this.categoryService.getAll();
        this.logger.info("gettng categories list");
        res.json(categories);
    }

    async getOne(req: Request, res: Response, next: NextFunction) {
        const { categoryId } = req.params;

        const category = await this.categoryService.getOne(categoryId);

        if (!category) {
            return next(createHttpError(404, "Category not found!"));
        }

        this.logger.info("Getting category", {
            id: category._id,
        });

        res.json(category);
    }
}
