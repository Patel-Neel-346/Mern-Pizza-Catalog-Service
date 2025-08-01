import mongoose from "mongoose";
import { Attribute, Category, priceConfiguration } from "./category-types";

const priceConfigurationSchema = new mongoose.Schema<priceConfiguration>(
    {
        priceType: {
            type: String,
            enum: ["base", "aditional"],
            required: true,
        },

        availableOptions: {
            type: [String],
            required: true,
        },
    },
    {
        _id: false,
    },
);

const attributeSchema = new mongoose.Schema<Attribute>(
    {
        name: {
            type: String,
            required: true,
        },
        widgetType: {
            type: String,
            erum: ["switch", "radio"],
            required: true,
        },

        defaultValue: {
            type: mongoose.Schema.Types.Mixed,
            required: true,
        },

        availableOptions: {
            type: [String],
            required: true,
        },
    },
    {
        _id: false,
    },
);

const categorySchema = new mongoose.Schema<Category>(
    {
        name: {
            type: String,
            required: true,
        },

        priceConfiguration: {
            type: Map,
            of: priceConfigurationSchema,
            required: true,
        },

        attributes: {
            type: [attributeSchema],
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model("Category", categorySchema);
