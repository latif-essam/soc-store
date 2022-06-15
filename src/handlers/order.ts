import { Order, Orders } from "../models/order";
import { Request, Response, Application } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { authorization } from "./../middlewares/authorization";

dotenv.config();
const { TOKEN } = process.env;

const store = new Orders();

const index = async (_req: Request, res: Response) => {
  try {
    const orders = await store.index();

    res.status(200).json(orders);
  } catch (error) {
    console.log({ error });
    res.status(400).json(error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const order = await store.show(req.params.id as unknown as number);
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const updataedOrder: Order = { ...req.body, status: "active" };

    const order = await store.create(updataedOrder);
    const token = jwt.sign({ order }, TOKEN as string);
    res.status(200).json(token);
  } catch (error) {
    res.status(400).json(error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const updatedOrder: Order = req.body;

    const order = await store.update(updatedOrder);

    if (order) {
      res.status(200).json(order);
    } else {
      res.status(400).send("order not found");
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const order = await store.destroy(req.params.id as unknown as number);

    if (order) {
      res.status(202).json(order);
    } else {
      res.status(404).send("order not found");
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const orderRoutes = (app: Application) => {
  app.get("/api/orders", index);
  app.get("/api/orders/:id", authorization, show);
  app.post("/api/orders", authorization, create);
  app.put("/api/orders/:id", authorization, update);
  app.delete("/api/orders/:id", authorization, destroy);
};

export default orderRoutes;
