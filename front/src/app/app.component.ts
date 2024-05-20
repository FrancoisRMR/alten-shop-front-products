import { Component, HostBinding, OnDestroy, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs/operators";
import { SidenavService } from "app/base/sidenav/sidenav.service";
import { HttpClient } from "@angular/common/http";
import { ProductService } from "./product/product.service";
import { Subscribable, Subscription } from "rxjs";
import { SnackbarService } from "./shared/utils/snackbar/snackbar.service";
import { IProductResponse } from "./product/product.interface";
import { UtilsService } from "./shared/utils/utils.service";

const TRANSPARENT_NAV_PAGES = ["login"];

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, OnDestroy {
  @HostBinding("class.transparent") transparent = false;
  subscriptions: Subscription = new Subscription();

  constructor(
    private readonly router: Router,
    private readonly sidenavService: SidenavService,
    private readonly productService: ProductService,
    private readonly snackbarService: SnackbarService,
    private readonly utilsService: UtilsService<IProductResponse>
  ) {
    this.initializeProducts();
  }
  ngOnDestroy(): void {
    throw new Error("Method not implemented.");
  }

  get getExpanded(): boolean {
    return this.sidenavService.getExpanded();
  }
  get getPinned(): boolean {
    return this.sidenavService.getPinned();
  }

  ngOnInit() {}

  initializeProducts() {
    this.subscriptions.add(
      this.productService.getAllProductsFromDatabase().subscribe({
        next: (products: IProductResponse[]) => {
          const productsToStore: IProductResponse[] =
            this.utilsService.sortArrayOfObjectByPropAndOrder(
              products,
              "code",
              "asc"
            );
          this.productService.products = productsToStore;
        },
        error: () => {
          this.snackbarService.displayError();
        },
      })
    );
  }
}
