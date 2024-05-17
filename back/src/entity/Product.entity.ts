import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "products" })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @Column()
  inventoryStatus: string;

  @Column()
  category: string;

  @Column({ nullable: true })
  image?: string;

  @Column({ nullable: true })
  rating?: number;
}
