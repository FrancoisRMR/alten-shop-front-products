import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "product" })
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
  inventorystatus: string;

  @Column()
  category: string;

  @Column({ nullable: true })
  image?: string;

  @Column({ nullable: true })
  rating?: number;
}
