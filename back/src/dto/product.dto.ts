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
  inventorystatus: string;

  @Expose()
  category: string;

  @Expose()
  image?: string;

  @Expose()
  rating?: number;
}
