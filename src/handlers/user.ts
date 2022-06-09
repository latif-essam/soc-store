import { User, Users } from "../models/user";
import { Request, Response, Application } from "express";

const store = new Users();

const getAllUsers = async (_req: Request, res: Response) => {
  const users = await store.index();
  res.status(200).json(users);
};
const getUser = async (req: Request, res: Response) => {
  try {
    const users = await store.show(req.params.id);
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json(error);
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    const user: User = req.body;
    console.log({ user });
    const newUser = await store.create(user);
    res.status(200).json(newUser);
  } catch (error) {
    res.status(400).json(error);
  }
};

const authenticate = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const newUser = await store.authenticate(username, password);
    res.status(200).json(newUser);
  } catch (error) {
    res.status(400).json(error);
  }
};

const userRoutes = (app: Application) => {
  app.get("/api/users", getAllUsers);
  app.get("/api/user/:id", getUser);
  app.post("/api/users", createUser);
  app.get("/api/user", authenticate);
};
export default userRoutes;
