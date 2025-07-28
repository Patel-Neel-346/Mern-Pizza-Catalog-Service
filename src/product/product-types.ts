import { Request } from "express-jwt";
import mongoose, { Document, Types } from "mongoose";
// import { priceConfiguration } from "../category/category-types";

// export interface priceConfiguration

export interface AttributeValue {
    name: string;
    value: any;
}

export type PriceType = "base" | "aditional";

export interface priceConfiguration {
    priceType: PriceType;
    availableOptions: Map<string, number>;
}

export interface Product extends Document {
    // _id?: mongoose.Types.ObjectId;
    name: string;
    description: string;
    image?: string;
    priceConfiguration: Map<string, priceConfiguration>;
    attributes: AttributeValue[];
    tenantId?: string;
    categoryId?: Types.ObjectId;
    isPublish?: boolean;
}

export interface ProductRequest extends Request {
    body: Product;
}
