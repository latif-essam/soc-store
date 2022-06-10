import { OrderProduct, OrderProducts } from "../models/orderProducts";
import { Request, Response, Application } from "express";

import authorization from "./../middlewares/authorization";

const store = new OrderProducts();
const addProductToOrder = async (req: Request, res: Response) => {
  try {
    const orderProduct: OrderProduct = req.body;
    const productAddedToOrder = store.addProductsToOrder(orderProduct);
    res.status(201).json(productAddedToOrder);
  } catch (error) {
    res.status(401).json(error);
  }
};
const orderProductsRoutes = (app: Application) => {
  app.post("/api/orders/:id/products", authorization, addProductToOrder);
};

export default orderProductsRoutes;
