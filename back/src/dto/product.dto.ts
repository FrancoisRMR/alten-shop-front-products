import { Expose } from "class-transformer";

export class CreateProductDto {
  @Expose()
  code: string;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  price: number;

  @Expose()
  quantity: number;

  @Expose()
  inventoryStatus: string;

  @Expose()
  category: string;

  @Expose()
  image?: string;

  @Expose()
  rating?: number;
}

export class ProductResponseDto extends CreateProductDto {
  @Expose()
  id: number;
}
