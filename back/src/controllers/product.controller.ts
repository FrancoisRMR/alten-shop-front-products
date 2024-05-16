import { Request, Response } from "express";
import { ProductService } from "../services/product.service";
import { plainToInstance } from "class-transformer";
import { CreateProductDto } from "../dto/product.dto";

export class ProductController {
  getAllProducts(req: Request, res: Response): void {
    // const userDTO: CreateProductDto = plainToClass(CreateProductDto, req.body, {
    //   excludeExtraneousValues: true,
    // });
    // const products = this.productService.getAllProducts();
    // res.json(products);
  }

  createProduct(req: Request, res: Response): void {
    console.log("REQUEST => ", req.body);
    const userDTO: CreateProductDto = plainToInstance(
      CreateProductDto,
      req.body,
      {
        excludeExtraneousValues: true,
      }
    );

    const productService: ProductService = new ProductService();

    productService
      .createProduct(userDTO)
      .then((products) => {
        res.json(products);
      })
      .catch((error) => {
        console.error("Error creating product:", error);
        res.status(500).json({ message: "Internal server error" });
      });
    // res.json(products);
  }
}
