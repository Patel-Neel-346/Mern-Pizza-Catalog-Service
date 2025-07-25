export interface priceConfiguration {
    [key: string]: {
        priceType: "base" | "aditional";
        availableOptions: string[];
    };
}

export interface Attribute {
    name: string;
    widgetType: "switch" | "radio";
    defaultValue: string;
    availableOptions: string[];
}

export interface Category {
    name: string;
    priceConfiguration: priceConfiguration;
    attributes: Attribute[];
}

//example json data understand:

// const category: Category = {
//     name: "ABC",
//     priceConfiguration: {
//         key: {
//             priceType: "base", // lowercase
//             availableOptions: ["abc", "ced"], // correct spelling
//         },
//     },
//     attributes: [
//         {
//             name: "abc",
//             widgetType: "switch",
//             defaultValue: "abc",
//             availableOptions: ["abc", "bcd"], // correct spelling
//         },
//     ],
// };
