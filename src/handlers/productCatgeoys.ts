import { ProductCategory, ProductCategorys } from "../models/productCategorys";
import { Request, Response, Application } from "express";
import { authorization } from "./../middlewares/authorization";

const store = new ProductCategorys();
const addProductToCategory = async (req: Request, res: Response) => {
  try {
    const productCategory: ProductCategory = req.body;
    const productDefinedCategory = store.addProductToCategorys(productCategory);
    res.status(201).json(productDefinedCategory);
  } catch (error) {
    res.status(401).json(error);
  }
};
const productCategoryRoutes = (app: Application) => {
  app.post(
    "/api/categorys/:id/products",
    [authorization],
    addProductToCategory
  );
};

export default productCategoryRoutes;
