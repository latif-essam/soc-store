import { Product, Products } from "../models/product";
import { Request, Response, Application } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import authorization from "./../middlewares/authorization";

dotenv.config();
const { TOKEN } = process.env;

const store = new Products();

const index = async (_req: Request, res: Response) => {
  try {
    const products = await store.index();

    res.status(200).json(products);
  } catch (error) {
    console.log({ error });
    res.status(400).json(error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const product = await store.show(req.params.id as unknown as number);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const product: Product = req.body;
    const newProduct = await store.create(product);
    res.status(200).json(newProduct);
  } catch (error) {
    res.status(400).json(error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const updatedproduct: Product = req.body;

    const product = await store.update(updatedproduct);

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(400).send("product not found");
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const deletedproduct = await store.destroy(
      req.params.id as unknown as number
    );

    if (deletedproduct) {
      res.status(202).json(deletedproduct);
    } else {
      res.status(404).send("product not found");
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const productRoutes = (app: Application) => {
  app.get("/api/products", index);
  app.get("/api/product/:id", show);
  app.post("/api/products", authorization, create);
  app.put("/api/products/:id", authorization, update);
  app.delete("/api/products/:id", authorization, destroy);
};

export default productRoutes;
