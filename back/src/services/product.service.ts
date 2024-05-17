import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Product } from "../entity/Product.entity";
import { CreateProductDto } from "../dto/product.dto";

export class ProductService {
  productRepository: Repository<Product> = AppDataSource.getRepository(Product);

  getAllProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }

  createProduct(product: CreateProductDto): Promise<Product> {
    const newProduct: CreateProductDto = { ...new Product(), ...product };
    return this.productRepository.save(newProduct);
  }

  createProducts(products: CreateProductDto[]): Promise<Product[]> {
    const newProducts: CreateProductDto[] = products.map(
      (product: CreateProductDto) => {
        return { ...new Product(), ...product };
      }
    );

    return this.productRepository.save(newProducts);
  }
}
