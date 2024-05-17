"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const product_service_1 = require("../services/product.service");
const class_transformer_1 = require("class-transformer");
const product_dto_1 = require("../dto/product.dto");
class ProductController {
    getAllProducts(req, res) {
        // const userDTO: CreateProductDto = plainToClass(CreateProductDto, req.body, {
        //   excludeExtraneousValues: true,
        // });
        // const products = this.productService.getAllProducts();
        // res.json(products);
    }
    createProduct(req, res) {
        const userDTO = (0, class_transformer_1.plainToInstance)(product_dto_1.CreateProductDto, req.body, {
            excludeExtraneousValues: true,
        });
        const productService = new product_service_1.ProductService();
        productService
            .createProduct(userDTO)
            .then((products) => {
            res.json(products);
        })
            .catch((error) => {
            console.log("error => ", error);
            throw new Error("Name is required!");
        });
        // res.json(products);
    }
}
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map