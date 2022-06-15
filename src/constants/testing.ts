import { Order } from "../models/order";
import { Product } from "../models/product";
import { User } from "../models/user";

export const crud: string[] = ["create", "index", "show", "update", "destroy"];
export const userApis = [
  {
    name: "Get all users",
    path: "/api/users",
    auth: true,
    method: "get",
    code: 401,
    msg: "",
  },
  {
    name: "Get user by id",
    path: "/api/users/1",
    auth: true,
    method: "get",
    code: 401,
    msg: "",
  },
  {
    name: "Update user",
    path: "/api/users/1",
    auth: true,
    method: "put",
    code: 401,
    msg: "",
  },
  {
    name: "Delete",
    path: "/api/users/1",
    auth: true,
    method: "delete",
    code: 401,
    msg: "",
  },
  {
    name: "Create new user",
    path: "/api/users",
    auth: false,
    method: "post",
    code: 401,
    msg: "missing required fileds",
  },
  {
    name: "Signup",
    path: "/api/signup",
    auth: false,
    method: "post",
    code: 200,
    msg: "",
  },
  {
    name: "Login",
    path: "/api/login",
    auth: false,
    method: "post",
    code: 401,
    msg: "missing required fields",
  },
];
export const productsApis = [
  {
    name: "Get all products",
    path: "/api/products",
    auth: false,
    method: "get",
    code: 200,
    msg: "",
  },
  {
    name: "Get product by id",
    path: "/api/products/1",
    auth: false,
    method: "get",
    code: 200,
    msg: "",
  },
  {
    name: "Update product",
    path: "/api/products/1",
    auth: true,
    method: "put",
    code: 401,
    msg: "",
  },
  {
    name: "Delete product",
    path: "/api/products/1",
    auth: true,
    method: "delete",
    code: 401,
    msg: "",
  },
  {
    name: "Create product",
    path: "/api/products",
    auth: true,
    method: "post",
    code: 401,
    msg: "",
  },
];

export const orderProductsApis = [
  {
    name: "Get all order Products",
    path: "/api/orders/:id/products",
    auth: true,
    method: "get",
    code: 401,
    msg: "",
  },
  {
    name: "Add Product to order",
    path: "/api/orders/:id/products",
    auth: true,
    method: "post",
    code: 401,
    msg: "",
  },
];
export const categoryProductsApis = [
  {
    name: "Get Category Products",
    path: "/api/categorys/:id/products",
    auth: true,
    method: "get",
    code: 401,
    msg: "",
  },
  {
    name: "Add Product to category",
    path: "/api/categorys/:id/products",
    auth: true,
    method: "post",
    code: 401,
    msg: "",
  },
];

export const ordersApis = [
  {
    name: "Get all orders",
    path: "/api/orders/:user_id",
    auth: true,
    method: "get",
    code: 401,
    msg: "",
  },
  {
    name: "Get order by id",
    path: "/api/orders/1",
    auth: true,
    method: "get",
    code: 401,
    msg: "",
  },
  {
    name: "Update order",
    path: "/api/orders/1",
    auth: true,
    method: "put",
    code: 401,
    msg: "",
  },
  {
    name: "Delete order",
    path: "/api/orders/1",
    auth: true,
    method: "delete",
    code: 401,
    msg: "",
  },
  {
    name: "Create order",
    path: "/api/orders",
    auth: true,
    method: "post",
    code: 401,
    msg: "",
  },
];
export const categorysApis = [
  {
    name: "Get all categorys",
    path: "/api/categorys",
    auth: true,
    method: "get",
    code: 200,
    msg: "",
  },
  {
    name: "Get category by id",
    path: "/api/categorys/1",
    auth: true,
    method: "get",
    code: 401,
    msg: "",
  },
  {
    name: "Update category",
    path: "/api/categorys/1",
    auth: true,
    method: "put",
    code: 401,
    msg: "",
  },
  {
    name: "Delete category",
    path: "/api/categorys/1",
    auth: true,
    method: "delete",
    code: 401,
    msg: "",
  },
  {
    name: "Create category",
    path: "/api/categorys",
    auth: true,
    method: "post",
    code: 401,
    msg: "",
  },
];
// export const apis = [
//   { name: "Users", path: "/api/users" },
//   { name: "products", path: "/api/products" },
//   { name: "Users", path: "/api/users" },
//   { name: "Users", path: "/api/users" },
//   { name: "Users", path: "/api/users" },
//   "users",
//   "products",
//   "orders",
//   "categorys",
// ];

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

export const staticOrder: Order = {
  status: "active",
};
