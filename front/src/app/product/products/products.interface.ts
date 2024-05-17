export interface CreateProduct {
  id: number;
  code: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  inventoryStatus: string;
  category: string;
  image?: string;
  rating?: number;
}

export interface ProductResponse extends CreateProduct {
  id: number;
}

export class Test {
  code: string;
  name: string;
}
