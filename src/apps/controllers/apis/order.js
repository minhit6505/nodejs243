const OrderModel = require("../../models/order");
const ProductModel = require("../../models/product");
const _ = require("lodash");
const transporter = require("../../../libs/transporter");
const ejs = require("ejs");
const path = require("path");
module.exports = {
  index: async (req, res) => {
    try {
      const {id} = req.params;
      const orders = await OrderModel.find({
        customerId: id,
      })
        .sort({_id: -1});
      return res.status(200).json({
        status: "success",
        data:{
          docs: orders,
        }
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  show: async (req, res)=>{
    try {
      const {id} = req.params;
      const order = await OrderModel.findById(id);
      return res.status(200).json({
        status: "success",
        data: order,
      });
    } catch (error) {
      return res.status(500).json(error);
    }

  },
  orderCanceled: async (req, res)=>{
    try {
      const {id} = req.params;
      await OrderModel.updateOne(
        {_id: id},
        {status: 0}
      );
      return res.status(200).json("Canceled order successfully");
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  order: async (req, res) => {
    try {
      const order = req.body;
      const {items} = order;
      let newItems = [];
      const prdIds = items.map((item)=>item.prd_id);
      const products = await ProductModel.find({_id: {$in: prdIds}});
      for(let product of products){
        const item = _.find(
          items,
          {prd_id: product._id.toString()}
        );
        if(item){
          item.name = product.name;
          newItems.push(item);
        }
      }
      order.items = newItems;
      const html = await ejs.renderFile(
        path.join(req.app.get("views"), "site", "mail.ejs"),
        order
      );

      await transporter.sendMail({
        from: '"Vietpro Store" <quantri.vietpro@gmail.com>', // sender address
        to: order.email, // list of receivers
        subject: "Xác nhận đơn hàng từ Vietpro Store", // Subject line
        html, // html body
      });

      await new OrderModel(order).save();
      return res.status(201).json("create order successfully");
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};
