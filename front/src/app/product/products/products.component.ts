import { Component, OnInit } from "@angular/core";
import { ControlType } from "app/shared/utils/crud-item-options/control-type.model";
import { CrudItemOptions } from "app/shared/utils/crud-item-options/crud-item-options.model";
import {
  Categorie,
  InventoryStatus,
  Product,
  ProductOptions,
  ProductResponse,
  TableOptions,
} from "../product.interface";
import { ProductService } from "../product.service";
import { Validators } from "@angular/forms";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit {
  data: ProductResponse[];
  entity = Product;
  options: CrudItemOptions[];

  constructor(private productService: ProductService) {
    this.productService.getAllProductsFromDatabase().subscribe({
      next: (products: ProductResponse[]) => {
        this.data = products;
        const excludedKeys: string[] = ["id"];
        const productsOptions: ProductOptions = {
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
              InventoryStatus.INSTOCK,
              InventoryStatus.LOWSTOCK,
              InventoryStatus.OUTOFSTOCK,
            ].map((status: InventoryStatus) => ({
              label: status,
              value: status,
            })),
          },
          category: {
            controlType: ControlType.SELECT,
            options: [
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
            options: [...Array(6)]
              .map((_, index: number) => index)
              .map((rating: number) => ({
                label: rating.toString(),
                value: rating,
              })),
          },
        };

        this.options = Object.keys(products[0])
          .filter((key: string) => !excludedKeys.includes(key))
          .map((key: string) => {
            console.log("key => ", key);
            const optionByProductKey: TableOptions = productsOptions[key];
            return {
              key: key,
              controlType: optionByProductKey.controlType,
              type: optionByProductKey?.type,
              options: optionByProductKey?.options,
              label: key,
              value: optionByProductKey?.value,
              columnOptions: {
                default: !!optionByProductKey.isColumnOptionsByDefault,
              },
              controlOptions: {
                validators: [Validators.required],
              },
            };
          });
      },
    });
  }

  ngOnInit(): void {
    // this.productService.createProduct()
  }

  check(test) {
    console.log("test => ", test);
  }
}
