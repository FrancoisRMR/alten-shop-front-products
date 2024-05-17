import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, of, switchMap } from "rxjs";
import { IProduct, ProductResponse } from "./product.interface";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  apiUrl: string = "http://localhost:3000/api/products";
  constructor(private http: HttpClient) {}

  getAllProductsFromDatabase(): Observable<ProductResponse[]> {
    return this.http.get<ProductResponse[]>(this.apiUrl).pipe(
      switchMap((products: ProductResponse[]) => {
        if (products.length) {
          return of(products);
        } else {
          return this.getAllProductsFromJsonFile().pipe(
            switchMap((jsonProducts: ProductResponse[]) =>
              this.sendAllProductsToDatabase(jsonProducts)
            )
          );
        }
      })
    );
  }

  getAllProductsFromJsonFile(): Observable<ProductResponse[]> {
    const url: string = "../../assets/products.json";
    return this.http
      .get<{ data: ProductResponse[] }>(url)
      .pipe(map((products: { data: ProductResponse[] }) => products.data));
  }

  sendAllProductsToDatabase(
    products: ProductResponse[]
  ): Observable<ProductResponse[]> {
    return this.http.post<ProductResponse[]>(this.apiUrl, products);
  }

  createProduct(product: IProduct): Observable<ProductResponse> {
    return this.http.post<ProductResponse>(this.apiUrl, product);
  }
}
