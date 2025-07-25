import { body } from "express-validator";

export default [
    body("name")
        .exists()
        .withMessage("category name is required!")
        .isString()
        .withMessage("category name should be an string!"),

    body("priceConfiguration")
        .exists()
        .withMessage("Price Configuration is required!"),

    body("priceConfiguration.*.priceType")
        .exists()
        .withMessage("price type is required!")
        .custom((value: "base" | "aditional") => {
            const validKeys = ["base", "aditional"];
            if (!validKeys.includes(value)) {
                throw new Error(
                    `${value} is invalid attribute for priceType Possible values are: [${validKeys.join(
                        ", ", // base, addtional
                    )}]`,
                );
            }

            return true;
        }),

    body("attributes").exists().withMessage("Attribute fields is required!"),
];
