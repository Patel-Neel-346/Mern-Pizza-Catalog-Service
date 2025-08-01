import mongoose from "mongoose";

const attributeValueSchema = new mongoose.Schema({
    name: {
        type: String,
    },

    value: {
        type: mongoose.Schema.Types.Mixed,
    },
});

const priceConfiguration = new mongoose.Schema({
    priceType: {
        type: String,
        enum: ["base", "aditional"],
    },

    availableOptions: {
        type: Map,
        of: Number,
    },
});

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        image: {
            type: String,
            required: false,
        },

        priceConfiguration: {
            type: Map,
            of: priceConfiguration,
        },

        attributes: [attributeValueSchema],

        tenantId: {
            type: String,
            required: true,
        },

        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
        },

        isPublish: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model("Product", productSchema);
