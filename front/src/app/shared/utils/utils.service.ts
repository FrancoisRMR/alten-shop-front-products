import { Injectable } from "@angular/core";
import * as _ from "lodash";

@Injectable({
  providedIn: "root",
})
export class UtilsService<T> {
  constructor() {}

  sortArrayOfObjectByPropAndOrder(
    array: T[],
    prop: string,
    order: "asc" | "desc"
  ): T[] {
    return _.orderBy(array, [prop], [order]);
  }
}
