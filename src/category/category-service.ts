import { Category } from "./category-types";
import CategoryModel from "./category-model";
export class CategoryService {
    //create category service
    async create(category: Category) {
        const data = await CategoryModel.create(category);
        return data;
    }

    //get all category service

    async getAll() {
        return await CategoryModel.find();
    }

    async getOne(categoryId: string) {
        return await CategoryModel.findOne({
            _id: categoryId,
        });
    }

    async update(
        categoryId: string,
        updateData: Partial<Category>,
    ): Promise<({ _id: string } & Category) | null> {
        return await CategoryModel.findByIdAndUpdate(
            categoryId,
            {
                $set: updateData,
            },
            {
                new: true,
            },
        );
    }
}
