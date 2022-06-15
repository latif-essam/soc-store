import { User, Users } from "../models/user";
import { Request, Response, Application } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { authorization } from "./../middlewares/authorization";

dotenv.config();
const { TOKEN } = process.env;

const store = new Users();

const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await store.index();

    res.status(200).json(users);
  } catch (error) {
    console.log({ error });
    res.status(400).json({ error });
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    console.log("req.params", req.params);
    const user = await store.show(req.params.id as unknown as number);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error });
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    const user: User = req.body;
    console.log({ user });
    const newUser = await store.create(user);
    const token = jwt.sign(
      { first_name: newUser?.first_name, last_name: newUser?.last_name },
      TOKEN as string
    );
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const updateUser = async (req: Request, res: Response) => {
  const user: User = req.body;
  const id: number = parseInt(req.params.id);
  try {
    // const token: string | undefined = req.headers.authorization?.split(" ")[1];
    // const decoded = jwt.verify(token as string, TOKEN as string);
    const updatedUser = await store.update({ ...user, id });
    // if ((decoded as JwtPayload).user.id !== updatedUser.id) {
    //   throw new Error("user id not found or doesn't match any id");
    // }
    res.status(202).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error });
  }
  // try {
  //   const user = await store.update(updatedUser);
  //   if (user) {
  //     const token = jwt.sign({ user }, TOKEN as string);
  //     res.status(200).json(token);
  //   } else {
  //     res.status(400).send("User not found");
  //   }
  // } catch (error) {
  //   res.status(400).json({ error });
  // }
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
    res.status(400).json({ error });
  }
};
const authenticate = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await store.authenticate(username, password);
    const token = jwt.sign(
      { first_name: user?.first_name, last_name: user?.last_name },
      TOKEN as string
    );

    res.status(200).json({ token });
  } catch (error) {
    console.log({ error });
    res.json({ error: "error" + error });
  }
};

const userRoutes = (app: Application) => {
  app.get("/api/users", [authorization], getAllUsers);
  app.get("/api/users/:id", [authorization], getUser);
  app.put("/api/users/:id", [authorization], updateUser);
  app.delete("/api/users/:id", [authorization], destroy);

  app.post("/api/auth", authenticate);
  app.post("/api/users", createUser);
};

export default userRoutes;
