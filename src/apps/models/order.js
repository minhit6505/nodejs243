const mongoose = require("../../common/database")();
const orderSchema = new mongoose.Schema({
    customerId:{
        type: String,
        default: "",
    },
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    status: {
        type: Number,
        default: 1,
    },
    items: [
        {
            prd_id:{
                type: mongoose.Types.ObjectId,
                required: true,
            },
            qty:{
                type: Number,
                required: true,
            },
            price:{
                type: Number,
                required: true,
            },
        }
    ],
}, {timestamps: true});
const OrderModel = mongoose.model("Orders", orderSchema, "orders");
module.exports = OrderModel;