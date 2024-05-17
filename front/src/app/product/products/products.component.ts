import { Component, OnInit } from "@angular/core";
import { ProductService } from "../product.service";
import { CrudItemOptions } from "app/shared/utils/crud-item-options/crud-item-options.model";
import { ControlType } from "app/shared/utils/crud-item-options/control-type.model";
import { Test } from "./products.interface";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit {
  data = [];
  entity = Test;
  options: CrudItemOptions[] = [
    {
      key: "code",
      controlType: ControlType.INPUT,
      label: "code",
      type: "text",
      columnOptions: {
        default: false,
      },
    },
    {
      key: "name",
      controlType: ControlType.INPUT,
      label: "name",
      type: "text",
      columnOptions: {
        default: true,
      },
    },
  ];
  constructor(private productService: ProductService) {
    this.productService.getAllProductsFromDatabase().subscribe({
      next: (res) => {
        this.data = res;
        console.log("DATABASE => ", res);
      },
    });
  }

  ngOnInit(): void {}
}
