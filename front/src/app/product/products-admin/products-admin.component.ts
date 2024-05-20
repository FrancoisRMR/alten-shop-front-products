import { Component, OnDestroy } from "@angular/core";
import { ControlType } from "app/shared/utils/crud-item-options/control-type.model";
import { CrudItemOptions } from "app/shared/utils/crud-item-options/crud-item-options.model";
import { SnackbarService } from "app/shared/utils/snackbar/snackbar.service";
import * as _ from "lodash";
import { Subscription } from "rxjs";
import {
  Categorie,
  InventoryStatus,
  IProductOptions,
  IProductResponse,
  ITableOptions,
  Product,
} from "../product.interface";
import { ProductService } from "../product.service";

@Component({
  selector: "app-products-admin",
  templateUrl: "./products-admin.component.html",
  styleUrls: ["./products-admin.component.scss"],
})
export class ProductsAdminComponent implements OnDestroy {
  data: IProductResponse[] = [];
  entity = Product;
  options: CrudItemOptions[];
  subscriptions: Subscription = new Subscription();

  private readonly productsOptions: IProductOptions = {
    code: {
      controlType: ControlType.INPUT,
      type: "text",
      isColumnOptionsByDefault: true,
    },
    name: {
      controlType: ControlType.INPUT,
      type: "text",
      isColumnOptionsByDefault: true,
    },
    description: {
      controlType: ControlType.INPUT,
      type: "text",
    },
    price: {
      controlType: ControlType.INPUT,
      type: "number",
    },
    quantity: {
      controlType: ControlType.INPUT,
      type: "number",
    },
    inventoryStatus: {
      controlType: ControlType.SELECT,
      options: [
        InventoryStatus.NONE,
        InventoryStatus.INSTOCK,
        InventoryStatus.LOWSTOCK,
        InventoryStatus.OUTOFSTOCK,
      ].map((status: InventoryStatus) => ({
        label: status,
        value: status,
      })),
      value: InventoryStatus.INSTOCK,
    },
    category: {
      controlType: ControlType.SELECT,
      options: [
        Categorie.NONE,
        Categorie.ACCESSORIES,
        Categorie.FITNESS,
        Categorie.CLOTHING,
        Categorie.ELECTRONICS,
      ].map((categorie: Categorie) => ({
        label: categorie,
        value: categorie,
      })),
    },
    image: {
      controlType: ControlType.INPUT,
      type: "text",
    },
    rating: {
      controlType: ControlType.SELECT,
      options: [...Array(6)].map((_, index: number) => ({
        label: index.toString(),
        value: index,
      })),
    },
  };

  constructor(
    private readonly productService: ProductService,
    private readonly snackbarService: SnackbarService
  ) {
    this.initializeProducts();
  }

  initializeProducts() {
    this.subscriptions.add(
      this.productService.getAllProductsFromDatabase().subscribe({
        next: (products: IProductResponse[]) => {
          this.data = products;
          this.sortDataByCodeAsc();
          this.initializeOptions(products[0]);
        },
        error: () => {
          this.snackbarService.displayError();
        },
      })
    );
  }

  initializeOptions(productSample: IProductResponse) {
    const excludedKeys: string[] = ["id"];
    this.options = Object.keys(productSample).map((key: string) => {
      const optionByProductKey: ITableOptions = this.productsOptions[key];
      return {
        key: key,
        controlType: optionByProductKey?.controlType,
        type: optionByProductKey?.type,
        options: optionByProductKey?.options,
        label: key,
        value: optionByProductKey?.value,
        columnOptions: {
          default: !!optionByProductKey?.isColumnOptionsByDefault,
          hidden: excludedKeys.includes(key),
        },
      };
    });
  }

  saveProduct(product: IProductResponse) {
    if (product) {
      const id: number = product.id;
      delete product.id;
      if (!id) {
        this.subscriptions.add(
          this.productService.createProduct(product).subscribe({
            next: (createdProduct: IProductResponse) => {
              this.data = [...this.data, createdProduct];
              this.sortDataByCodeAsc();
              this.snackbarService.displaySuccess();
            },
            error: (error) => {
              this.snackbarService.displayError(
                `${error.status} : ${error.error?.message}`
              );
            },
          })
        );
      } else {
        this.subscriptions.add(
          this.productService.updateProduct(product, id).subscribe({
            next: (updatedProduct: IProductResponse) => {
              this.data = this.data.map((product: IProductResponse) =>
                product.id === updatedProduct.id ? updatedProduct : product
              );
              this.sortDataByCodeAsc();
              this.snackbarService.displaySuccess();
            },
            error: (error) => {
              this.snackbarService.displayError(
                `${error.status} : ${error.error?.message}`
              );
            },
          })
        );
      }
    }
  }

  removeProduct(ids: number[]) {
    if (ids.length === 1) {
      this.subscriptions.add(
        this.productService.deleteProduct(ids[0]).subscribe({
          next: () => {
            this.data = this.data.filter(
              (product: IProductResponse) => product.id !== ids[0]
            );
            this.sortDataByCodeAsc();
            this.snackbarService.displaySuccess();
          },
          error: (error) => {
            this.snackbarService.displayError(
              `${error.status} : ${error.error?.message}`
            );
          },
        })
      );
    } else if (ids.length > 1) {
      this.subscriptions.add(
        this.productService.deleteMultipleProduct(ids).subscribe({
          next: () => {
            this.data = this.data.filter(
              (product: IProductResponse) => !ids.includes(product.id)
            );
            this.sortDataByCodeAsc();
            this.snackbarService.displaySuccess();
          },
          error: (error) => {
            this.snackbarService.displayError(
              `${error.status} : ${error.error?.message}`
            );
          },
        })
      );
    }
  }

  sortDataByCodeAsc() {
    this.data = _.orderBy(this.data, ["code"], ["asc"]);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
