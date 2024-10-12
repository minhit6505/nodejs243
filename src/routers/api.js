const express = require("express");
const router = express.Router();

// Import Controller
const CategoryController = require("../apps/controllers/apis/category");
const ProductController = require("../apps/controllers/apis/product");
const OrderController = require("../apps/controllers/apis/order");
const SliderController = require("../apps/controllers/apis/slider");
const BannerController = require("../apps/controllers/apis/banner");
const AuthController = require("../apps/controllers/apis/auth");
const AuthMiddleware = require("../apps/middlewares/authCustomer");

router.get("/categories", AuthMiddleware, CategoryController.index);
router.get("/categories/:id", CategoryController.show);
router.get("/categories/:id/products", CategoryController.categoryProducts);
router.get("/products", ProductController.index);
router.get("/products/:id", ProductController.show);
router.get("/products/:id/comments", ProductController.commentsProduct);
router.post("/products/:id/comment", ProductController.storeCommentProduct);
router.post("/order", OrderController.order);
router.get("/sliders", SliderController.index);
router.get("/banners", BannerController.index);
router.post("/customers/register", AuthController.registerCustomer);
router.get("/customers/:id/orders", OrderController.index);
router.get("/customer/orders/:id", OrderController.show);
router.get("/customer/orders/:id/canceled", OrderController.orderCanceled);
router.post("/customers/login", AuthController.loggedInCustomer);
router.get("/customers/:id/logout", AuthController.loggedOutCustomer);
router.get("/customers/refreshtoken", AuthController.requestRefreshToken);

module.exports = router;