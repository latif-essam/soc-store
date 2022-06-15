import { Product } from "../models/product";
import { User } from "../models/user";

export const crud: string[] = ["create", "index", "show", "update", "destroy"];
export const apis: string[] = ["users", "products", "orders", "categorys"];
export const staticUser: User = {
  first_name: "latif",
  last_name: "essam",
  username: "lolpop",
  password: "lolpop123",
};
export const staticProduct: Product = {
  name: "Master Sunglass",
  price: 150,
  quantity: 20,
  category: "Sun",
};
