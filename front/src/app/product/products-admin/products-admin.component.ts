import { Component, OnDestroy, OnInit } from "@angular/core";
import { ControlType } from "app/shared/utils/crud-item-options/control-type.model";
import { CrudItemOptions } from "app/shared/utils/crud-item-options/crud-item-options.model";
import { SnackbarService } from "app/shared/utils/snackbar/snackbar.service";
import { UtilsService } from "app/shared/utils/utils.service";
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
export class ProductsAdminComponent implements OnInit, OnDestroy {
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
    private readonly snackbarService: SnackbarService,
    private readonly utilsService: UtilsService<IProductResponse>
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.productService.products$.subscribe({
        next: (products: IProductResponse[]) => {
          this.data = products;
          if (products.length) {
            this.initializeOptions(products[0]);
          }
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
              this.data = this.utilsService.sortArrayOfObjectByPropAndOrder(
                [...this.data, createdProduct],
                "code",
                "asc"
              );
              this.productService.products = this.data;
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
              this.data = this.utilsService.sortArrayOfObjectByPropAndOrder(
                this.data.map((product: IProductResponse) =>
                  product.id === updatedProduct.id ? updatedProduct : product
                ),
                "code",
                "asc"
              );
              this.productService.products = this.data;
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
            this.data = this.utilsService.sortArrayOfObjectByPropAndOrder(
              this.data.filter(
                (product: IProductResponse) => product.id !== ids[0]
              ),
              "code",
              "asc"
            );
            this.productService.products = this.data;
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
            this.data = this.utilsService.sortArrayOfObjectByPropAndOrder(
              this.data.filter(
                (product: IProductResponse) => !ids.includes(product.id)
              ),
              "code",
              "asc"
            );
            this.productService.products = this.data;
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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
