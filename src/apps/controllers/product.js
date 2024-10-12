const ProductModel = require("../models/product");
const CategoryModel = require("../models/category");
const paginate = require("../../common/paginate");
const fs = require("fs");
const path = require("path");
const slug = require("slug");

const ProductController = {
    index: async (req, res)=>{
        const page = Number(req.query.page) || 1;
        const limit = 10;
        const skip = page*limit - limit;
        const total = await ProductModel.find().countDocuments();
        const total_pages = Math.ceil(total/limit);
        const products = await ProductModel.find().populate("cat_id")
            .sort({_id: -1})
            .skip(skip)
            .limit(limit);
        res.render("admin/products/product", {
            products, 
            num:1, 
            paginate: paginate(total_pages, page),
            prev: page-1,
            next: page+1,
            currentPage: page, 
            total_pages,
        });
    },
    create: async (req, res)=>{
        const categories = await CategoryModel.find();
        res.render("admin/products/add_product", {categories});
    },
    store: async (req, res)=>{
        const {body, file} = req;
        const product = {
            description : body.description,
            price : body.price,
            cat_id : body.cat_id,
            status : body.status,
            featured : body.featured=="on" || false,
            promotion : body.promotion,
            warranty : body.warranty,
            accessories : body.accessories,
            is_stock : body.is_stock,
            name : body.name,
            slug : slug(body.name),
        }
        if(file){
            const thumbnail = `products/${file.originalname}`;
            fs.renameSync(file.path, path.resolve("src/public/uploads/images", thumbnail));
            product.thumbnail = thumbnail;
            await new ProductModel(product).save();
            res.redirect("/admin/products");
        }
    },
    edit: async (req, res)=>{
        const {id} = req.params;
        const categories = await CategoryModel.find();
        const product = await ProductModel.findById(id);
        res.render("admin/products/edit_product", {categories, product});
    },
    update: async (req, res)=>{
        const {id} = req.params;
        const {body, file} = req;
        const product = {
            description : body.description,
            price : body.price,
            cat_id : body.cat_id,
            status : body.status,
            featured : body.featured=="on" || false,
            promotion : body.promotion,
            warranty : body.warranty,
            accessories : body.accessories,
            is_stock : body.is_stock,
            name : body.name,
            slug : slug(body.name),
        }
        if(file){
            const thumbnail = "products/"+file.originalname;
            fs.renameSync(file.path, path.resolve("src/public/uploads/images", thumbnail));
            product.thumbnail = thumbnail;
        }
        await ProductModel.updateOne(
            {_id: id},
            product
        );
        res.redirect("/admin/products");
    },
    delete: async (req, res)=>{
        const {id} = req.params;
        await ProductModel.deleteOne({_id: id});
        res.redirect("/admin/products");
    },
}
module.exports = ProductController;