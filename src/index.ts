import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import noteRoutes from "./handlers/notes";
import userRoutes from "./handlers/user";
const app = express();

dotenv.config();
const { PORT } = process.env;

const corsOptions = {
  origin: `http://localhost:${PORT}`,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("node server works");
});

userRoutes(app);
// noteRoutes(app);

app.listen(PORT, () =>
  console.log(`node_server running on http://localhost:${PORT}`)
);

export default app;
