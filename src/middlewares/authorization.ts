import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const { TOKEN } = process.env;

const authorization = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    jwt.verify(token!, TOKEN!);
  } catch (error) {
    console.log({ error });
    res.status(402).json({ message: `Access denied, error: ${error}` });
    return;
  }
  next();
};
export default authorization;
