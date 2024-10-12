const ProductModel = require("../../models/product");
const CommentModel = require("../../models/comment");
const pagination = require("../../../libs/pagination");
module.exports = {
    index: async (req, res)=>{
        try {
            const query = {};
            if(req.query.featured) query.featured = req.query.featured;
            if(req.query.name) query.$text = {$search: req.query.name};
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 6;
            const skip = page*limit-limit;
            const products = await ProductModel.find(query)
                .sort({_id: -1})
                .skip(skip)
                .limit(limit);
            return res.status(200).json({
                status: "success",
                filters:{
                    featured: req.query.featured || null,
                    limit,
                },
                data: {
                    docs: products,
                    pages: await pagination(page, limit, ProductModel, query),
                }
            });
        } catch (error) {
            return res.status(500).json(error);
        }

    },
    show: async (req, res)=>{
        try {
            const {id} = req.params;
            const product = await ProductModel.findById(id);
            return res.status(200).json({
                status: "success",
                data: product,
            });
        } catch (error) {
            return  res.status(500).json(error);
        }
    },
    commentsProduct: async (req, res)=>{
        try {
            const {id} = req.params;
            const query = {};
            query.prd_id = id;
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;
            const skip = page*limit - limit;
            const comments = await CommentModel.find(query)
                .skip(skip)
                .limit(limit)
                .sort({_id: -1});
            return res.status(200).json({
                status: "success",
                filters:{
                    prd_id: id,
                    limit,
                },
                data:{
                    docs:  comments,
                    pages: await pagination(page, limit, CommentModel, query),
                }
            });
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    storeCommentProduct: async (req, res)=>{
        try {
            const {id} = req.params;
            const  {body} = req;
            const comment = {
                prd_id: id,
                full_name: body.full_name,
                email: body.email,
                body: body.body,
            }
            await new CommentModel(comment).save();
            return res.status(201).json("create comment successfully");
        } catch (error) {
            return  res.status(500).json(error);
        }
    }
}