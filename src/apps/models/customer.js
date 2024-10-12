const mongoose = require("../../common/database")();
const customerSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: true,
    },
}, {timestamps: true});
const CustomerModel = mongoose.model("Customer", customerSchema, "customers");
module.exports = CustomerModel;