import { Router } from "express";
import { ProductController } from "../controllers/product.controller";

const router = Router();
const productController = new ProductController();

router.get("/products", productController.getAllProducts);
router.post("/products", productController.createProduct);
router.patch("/products/:id", productController.patchProduct);
router.delete("/products/:id", productController.deleteProduct);
router.post("/products/delete", productController.deleteProducts);

export default router;
