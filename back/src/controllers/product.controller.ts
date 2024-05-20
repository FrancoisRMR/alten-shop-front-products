import { plainToInstance } from "class-transformer";
import { NextFunction, Request, Response } from "express";
import {
  CreateProductDto,
  ProductResponseDto,
  UpdateProductDto,
} from "../dto/product.dto";
import { Product } from "../entity/Product.entity";
import { ProductService } from "../services/product.service";

export class ProductController {
  getAllProducts(req: Request, res: Response, next: NextFunction): void {
    const productService: ProductService = new ProductService();
    productService
      .getAllProducts()
      .then((products: Product[]) => {
        const productsResponseDTO: ProductResponseDto[] = plainToInstance(
          ProductResponseDto,
          products,
          {
            excludeExtraneousValues: true,
          }
        );
        res.status(200).json(productsResponseDTO);
      })
      .catch(next);
  }

  createProduct(req: Request, res: Response, next: NextFunction): void {
    const productService: ProductService = new ProductService();

    if (Array.isArray(req.body)) {
      const createProducts: CreateProductDto[] = req.body.map(
        (product: CreateProductDto) =>
          plainToInstance(CreateProductDto, product, {
            excludeExtraneousValues: true,
          })
      );
      productService
        .createProducts(createProducts)
        .then((products: Product[]) => {
          res.status(200).json(products);
        })
        .catch(next);
    } else {
      const createProduct: CreateProductDto = plainToInstance(
        CreateProductDto,
        req.body,
        {
          excludeExtraneousValues: true,
        }
      );
      productService
        .createProduct(createProduct)
        .then((product: Product) => {
          res.status(200).json(product);
        })
        .catch(next);
    }
  }

  patchProduct(req: Request, res: Response, next: NextFunction): void {
    const productService: ProductService = new ProductService();
    const { id } = req.params;
    const updateProduct: UpdateProductDto = plainToInstance(
      CreateProductDto,
      req.body,
      {
        excludeExtraneousValues: true,
      }
    );
    productService
      .updateProduct(+id, updateProduct)
      .then((product: Product) => {
        res.status(200).json(product);
      })
      .catch(next);
  }

  deleteProduct(req: Request, res: Response, next: NextFunction): void {
    const productService: ProductService = new ProductService();
    const { id } = req.params;
    productService
      .deleteProduct(+id)
      .then(() => {
        res.status(204).send();
      })
      .catch(next);
  }

  deleteProducts(req: Request, res: Response, next: NextFunction): void {
    const ids: number[] = req.body;
    const productService: ProductService = new ProductService();

    productService
      .deleteProducts(ids)
      .then(() => {
        res.status(204).send();
      })
      .catch(next);
  }
}
