"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("../controllers/product.controller");
const router = (0, express_1.Router)();
const productController = new product_controller_1.ProductController();
router.get("/products", productController.getAllProducts);
router.post("/products", productController.createProduct);
exports.default = router;
//# sourceMappingURL=product.routes.js.map