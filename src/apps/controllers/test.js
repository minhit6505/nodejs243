 const CategoryModel = require("../models/category");
 const ProductModel = require("../models/product");
 const test1 = (req, res)=>{

   req.session.email = "admin@gmail.com";
   req.session.password = "123456";
   res.send("fdsfdsfdsfs");

 }
 const test2 = (req, res)=>{
   req.session.destroy();
   res.send(req.session.email+req.session.password); 
 } 
 

 module.exports = { 
    test1,
    test2,
 }