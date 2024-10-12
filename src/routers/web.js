const express = require("express");
const router = express.Router();

// Import controller
const TestController = require("../apps/controllers/test");
const AuthController = require("../apps/controllers/auth");
const AdminController = require("../apps/controllers/admin");
const ProductController = require("../apps/controllers/product");

// Import Middleware
const UploadMiddleware = require("../apps/middlewares/upload");
const AuthMiddleware = require("../apps/middlewares/auth");

// router.get("/", (req, res)=>{
//     res.send("<h1>Trang Chủ</h1>");
// });
router.get("/test1", TestController.test1);
router.get("/test2", TestController.test2);

// Router admin
router.get("/admin/login", AuthMiddleware.checkLogin, AuthController.login);
router.post("/admin/login", AuthMiddleware.checkLogin, AuthController.postLogin);

router.get("/admin/logout", AuthMiddleware.checkAdmin, AuthController.logout);
router.get("/admin/dashboard", AuthMiddleware.checkAdmin, AdminController.index);
router.get("/admin/products", AuthMiddleware.checkAdmin, ProductController.index);
router.get("/admin/products/create", AuthMiddleware.checkAdmin, ProductController.create);
router.post("/admin/products/update/:id", AuthMiddleware.checkAdmin, UploadMiddleware.single("thumbnail"), ProductController.update);
router.post("/admin/products/store", AuthMiddleware.checkAdmin, UploadMiddleware.single("thumbnail"), ProductController.store);
router.get("/admin/products/edit/:id", AuthMiddleware.checkAdmin, ProductController.edit);
router.get("/admin/products/delete/:id", AuthMiddleware.checkAdmin, ProductController.delete);

module.exports = router;