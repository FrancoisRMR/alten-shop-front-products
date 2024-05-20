import { Component, OnDestroy, OnInit } from "@angular/core";
import { SelectItem } from "primeng/api";
import { Subscription } from "rxjs";
import { InventoryStatus, IProductResponse } from "../product.interface";
import { ProductService } from "../product.service";
import { SearchParams } from "app/shared/ui/list/search.model";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit, OnDestroy {
  data: IProductResponse[] = [];
  subscriptions: Subscription = new Subscription();
  sortKey: string = "name";
  options: SelectItem[] = [
    {
      label: "Code",
      value: "code",
    },
    {
      label: "Name",
      value: "name",
    },
    {
      label: "Description",
      value: "description",
    },
    {
      label: "Status",
      value: "inventoryStatus",
    },
    {
      label: "Category",
      value: "category",
    },
  ];
  constructor(private readonly productService: ProductService) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.productService.products$.subscribe({
        next: (products: IProductResponse[]) => (this.data = products),
      })
    );
  }

  getSeverity(product: IProductResponse) {
    switch (product.inventoryStatus) {
      case InventoryStatus.INSTOCK:
        return "success";
      case InventoryStatus.LOWSTOCK:
        return "warning";
      case InventoryStatus.OUTOFSTOCK:
        return "danger";
      default:
        return null;
    }
  }

  filtered(searchParams: SearchParams) {
    this.sortKey = searchParams.sortOrder;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
