import productModel from "./product-model";
import { Product } from "./product-types";

export class ProductService {
    async create(productData: Product) {
        const data = await productModel.create(productData);
        return data;
    }
}
