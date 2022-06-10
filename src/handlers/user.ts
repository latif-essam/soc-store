import { User, Users } from "../models/user";
import { Request, Response, Application } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const { TOKEN } = process.env;

const store = new Users();

const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await store.index();

    res.status(200).json(users);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const user = await store.show(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    const user: User = req.body;

    console.log({ user });

    const newUser = await store.create(user);
    const token = jwt.sign({ newUser }, TOKEN as string);
    res.status(200).json(token);
  } catch (error) {
    res.status(400).json(error);
  }
};

const authenticate = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await store.authenticate(username, password);
    const token = jwt.sign({ user }, TOKEN as string);

    res.status(200).json(token);
  } catch (error) {
    res.status(400).json(error);
  }
};

const updateUser = async (req: Request, res: Response) => {
  const updatedUser: User = req.body;
  try {
    const token = req.headers.authorization!.split(" ")[1];
    const decoded = jwt.verify(token, TOKEN!);
    if ((decoded as JwtPayload).user.id !== updatedUser.id) {
      throw new Error("user id not found or doesn't match any id");
    }
  } catch (error) {
    res.status(402).json(error);
  }
  try {
    const user = await store.update(updatedUser);
    if (user) {
      const token = jwt.sign({ user }, TOKEN!);
      res.status(200).json(token);
    } else {
      res.status(400).send("User not found");
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const deleteduser = await store.destroy(req.params.id as unknown as number);

    if (deleteduser) {
      res.json(deleteduser);
    } else {
      res.status(404).send("user not found");
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const userRoutes = (app: Application) => {
  app.get("/api/users", getAllUsers);
  app.get("/api/user/:id", getUser);
  app.post("/api/users", createUser);
  app.get("/api/auth", authenticate);
  app.put("/api/users/:id", updateUser);
  app.delete("/api/users/:id", destroy);
};

export default userRoutes;
