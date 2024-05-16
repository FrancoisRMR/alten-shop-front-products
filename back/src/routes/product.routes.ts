import { Router } from "express";
import { ProductController } from "../controllers/product.controller";

const router = Router();
const productController = new ProductController();

router.get("/products", productController.getAllProducts);
router.post("/products", productController.createProduct);

export default router;