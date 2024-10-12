const mongoose = require("../../common/database")();
const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            text: true,
            required: true,
        },
        slug: {
            type: String,
            required: true,
        },
        cat_id: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "Categories",
        },
        thumbnail: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            default: 0,
        },
        status: {
            type: String,
            required: true,
        },
        featured: {
            type: Boolean,
            default: false,
        },
        promotion: {
            type: String,
            required: true,
        },
        warranty: {
            type: String,
            required: true,
        },
        accessories: {
            type: String,
            required: true,
        },
        is_stock: {
            type: Boolean,
            default: true,
        },
    },
    {timestamps: true}
);
const ProductModel = mongoose.model("Products", productSchema, "products");
module.exports = ProductModel;