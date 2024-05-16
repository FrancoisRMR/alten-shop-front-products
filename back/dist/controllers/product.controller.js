"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    getAllProducts(req, res) {
        const products = this.productService.getAllProducts();
        res.json(products);
    }
}
exports.ProductController = ProductController;
