import productModel from "./product-model";
import { Product } from "./product-types";

export class ProductService {
    async create(productData: Product) {
        const data = await productModel.create(productData);
        return data;
    }

    async updateProduct(productId: string, product: Product) {
        return (await productModel.findByIdAndUpdate(
            {
                _id: productId,
            },
            {
                $set: product,
            },
            {
                new: true,
            },
        )) as Product;
    }

    async getProduct(productId: string) {
        return await productModel.findOne({
            _id: productId,
        });
    }
}
