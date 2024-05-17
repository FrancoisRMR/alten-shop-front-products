"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const data_source_1 = require("../data-source");
const Product_entity_1 = require("../entity/Product.entity");
class ProductService {
    constructor() {
        this.productRepository = data_source_1.AppDataSource.getRepository(Product_entity_1.Product);
    }
    getAllProducts() {
        return this.productRepository.find();
    }
    createProduct(product) {
        const newProduct = Object.assign(Object.assign({}, new Product_entity_1.Product()), product);
        return this.productRepository.save(newProduct);
    }
}
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map