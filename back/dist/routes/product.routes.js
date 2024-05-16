"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = __importDefault(require("express"));
// import { authentification } from "../middleware/authentification";
const product_controller_1 = require("../controllers/product.controller");
const product_service_1 = require("../services/product.service");
// import { authorization } from "../middleware/authorization";
const Router = express_1.default.Router();
exports.productRouter = Router;
// Router.post("/movies", authentification, MovieController.createMovie);
const productService = new product_service_1.ProductService();
const productController = new product_controller_1.ProductController(productService);
Router.get("/products", productController.getAllProducts);
