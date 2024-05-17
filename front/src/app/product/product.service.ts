import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, of, switchMap } from "rxjs";
import { ProductResponse } from "./products/products.interface";

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

  send() {
    console.log("JAI CLICK");
    const product = {
      code: "P001",
      name: "Smartphone",
      description:
        "Un smartphone haut de gamme avec des fonctionnalités avancées.",
      price: 599.99,
      quantity: 50,
      inventoryStatus: "in_stock",
      category: "Électronique",
      rating: 4.5,
    };
    this.http
      .post<any>("http://localhost:3000/api/products", product)
      .subscribe({
        next: (res) => {
          console.log("RESULT => ", res);
        },
      });
  }
}
