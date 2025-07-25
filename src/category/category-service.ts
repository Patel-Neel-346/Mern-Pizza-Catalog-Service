import { Category } from "./category-types";
import CategoryModel from "./category-model";
export class CategoryService {
    async create(category: Category) {
        const data = await CategoryModel.create(category);
        return data;
    }
}
