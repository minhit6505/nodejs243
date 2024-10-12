const ProductModel = require("../models/product");
const UserModel = require("../models/user");
const AdminController = {
    index: async (req, res)=>{
        const products = await ProductModel.find().countDocuments();
        const users = await UserModel.find().countDocuments();
        res.render("admin/dashboard", {products, users});
    },
}
module.exports = AdminController