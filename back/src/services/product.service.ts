import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { CreateProductDto, UpdateProductDto } from "../dto/product.dto";
import { Product } from "../entity/Product.entity";

export class ProductService {
  productRepository: Repository<Product> = AppDataSource.getRepository(Product);

  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async createProduct(product: CreateProductDto): Promise<Product> {
    const newProduct = this.productRepository.create(product);
    return this.productRepository.save(newProduct);
  }

  async createProducts(products: CreateProductDto[]): Promise<Product[]> {
    const newProducts = products.map((productDto: CreateProductDto) =>
      this.productRepository.create(productDto)
    );
    return this.productRepository.save(newProducts);
  }

  async updateProduct(
    id: number,
    updateProductDto: UpdateProductDto
  ): Promise<Product> {
    await this.productRepository.update(id, updateProductDto);
    return this.productRepository.findOneOrFail({ where: { id } });
  }

  async deleteProduct(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }

  async deleteProducts(ids: number[]): Promise<void> {
    await this.productRepository.delete(ids);
  }
}
