import { SidenavItem } from "app/base/sidenav/sidenav.model";

export const SIDENAV_ITEMS: SidenavItem[] = [
  {
    id: "Products",
    labels: {
      en: "Products",
      fr: "Produits",
    },
    link: "/products",
    routes: ["/products"],
    icon: "shopping-cart",
  },
  {
    id: "Admin",
    labels: {
      en: "Admin",
      fr: "Administration",
    },
    link: "/admin/products",
    routes: ["/admin", "/admin/products"],
    icon: "users",
  },
];
