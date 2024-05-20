import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, of, switchMap } from "rxjs";
import {
  Categorie,
  InventoryStatus,
  IProduct,
  IProductResponse,
} from "./product.interface";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  apiUrl: string = "http://localhost:3000/api/products";
  constructor(private http: HttpClient) {}

  getAllProductsFromDatabase(): Observable<IProductResponse[]> {
    return this.http.get<IProductResponse[]>(this.apiUrl).pipe(
      switchMap((products: IProductResponse[]) => {
        if (products.length) {
          return of(products);
        } else {
          return this.getAllProductsFromJsonFile().pipe(
            switchMap((jsonProducts: IProductResponse[]) =>
              this.sendAllProductsToDatabase(jsonProducts)
            )
          );
        }
      })
    );
  }

  getAllProductsFromJsonFile(): Observable<IProductResponse[]> {
    const url: string = "../../assets/products.json";
    return this.http
      .get<{ data: IProductResponse[] }>(url)
      .pipe(map((products: { data: IProductResponse[] }) => products.data));
  }

  sendAllProductsToDatabase(
    products: IProductResponse[]
  ): Observable<IProductResponse[]> {
    return this.http.post<IProductResponse[]>(this.apiUrl, products);
  }

  createProduct(product: IProduct): Observable<IProductResponse> {
    const managedProduct: IProduct = this.manageProductValue(product);
    console.log("managedProduct => ", managedProduct);
    return this.http.post<IProductResponse>(this.apiUrl, managedProduct);
  }

  updateProduct(product: IProduct, id: number): Observable<IProductResponse> {
    const managedProduct: IProduct = this.manageProductValue(product);
    return this.http.patch<IProductResponse>(
      `${this.apiUrl}/${id}`,
      managedProduct
    );
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  deleteMultipleProduct(ids: number[]): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/delete`, ids);
  }

  manageProductValue(product: IProduct): IProduct {
    return {
      code: product.code ? product.code : null,
      category: product.category ? product.category : Categorie.NONE,
      description: product.description ? product.description : null,
      inventoryStatus: product.inventoryStatus
        ? product.inventoryStatus
        : InventoryStatus.NONE,
      name: product.name ? product.name : null,
      price: product.price ? product.price : 0,
      quantity: product.quantity ? product.quantity : 0,
      image: product.image ? product.image : null,
      rating: product.rating ? product.rating : 0,
    };
  }
}
