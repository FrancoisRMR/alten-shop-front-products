import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ProductsAdminComponent } from "./products-admin/products-admin.component";
import { ProductsComponent } from "./products/products.component";
import { SharedModule } from "app/shared/shared.module";

@NgModule({
  declarations: [ProductsAdminComponent, ProductsComponent],
  imports: [CommonModule, SharedModule],
})
export class ProductModule {}
