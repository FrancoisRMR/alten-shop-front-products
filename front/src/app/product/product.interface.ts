import { ControlType } from "app/shared/utils/crud-item-options/control-type.model";
import { SelectItem } from "primeng/api";

export interface IProduct {
  code: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  inventoryStatus: InventoryStatus;
  category: Categorie;
  image?: string;
  rating?: number;
}

export class Product {
  code: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  inventoryStatus: InventoryStatus;
  category: Categorie;
  image?: string;
  rating?: number;
}

export interface ProductResponse extends IProduct {
  id: number;
}

export enum InventoryStatus {
  INSTOCK = "INSTOCK",
  LOWSTOCK = "LOWSTOCK",
  OUTOFSTOCK = "OUTOFSTOCK",
}

export enum Categorie {
  ACCESSORIES = "Accessories",
  FITNESS = "Fitness",
  CLOTHING = "Clothing",
  ELECTRONICS = "Electronics",
}

export interface ProductOptions {
  code: TableOptions;
  name: TableOptions;
  description: TableOptions;
  price: TableOptions;
  quantity: TableOptions;
  inventoryStatus: TableOptions;
  category: TableOptions;
  image?: TableOptions;
  rating?: TableOptions;
}

export interface TableOptions {
  controlType: ControlType;
  type?: string;
  isColumnOptionsByDefault?: boolean;
  options?: SelectItem[];
  value?: any;
}

export class Test {
  code: string;
  name: string;
}
