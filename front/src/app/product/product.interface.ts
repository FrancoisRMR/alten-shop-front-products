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

export interface IProductResponse extends IProduct {
  id: number;
}

export enum InventoryStatus {
  NONE = "N/A",
  INSTOCK = "INSTOCK",
  LOWSTOCK = "LOWSTOCK",
  OUTOFSTOCK = "OUTOFSTOCK",
}

export enum Categorie {
  NONE = "N/A",
  ACCESSORIES = "Accessories",
  FITNESS = "Fitness",
  CLOTHING = "Clothing",
  ELECTRONICS = "Electronics",
}

export interface IProductOptions {
  id?: ITableOptions;
  code: ITableOptions;
  name: ITableOptions;
  description: ITableOptions;
  price: ITableOptions;
  quantity: ITableOptions;
  inventoryStatus: ITableOptions;
  category: ITableOptions;
  image?: ITableOptions;
  rating?: ITableOptions;
}

export interface ITableOptions {
  controlType: ControlType;
  type?: string;
  isColumnOptionsByDefault?: boolean;
  options?: SelectItem[];
  value?: any;
}
