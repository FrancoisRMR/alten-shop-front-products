import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Product } from "../entity/Product.entity";
import { CreateProductDto } from "../dto/product.dto";

export class ProductService {
  productRepository: Repository<Product> = AppDataSource.getRepository(Product);

  getAllProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }

  createProduct(product: CreateProductDto) {
    const newProduct = { ...new Product(), ...product };
    return this.productRepository.save(newProduct);
  }
}
