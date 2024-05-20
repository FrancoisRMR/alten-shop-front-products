import cors from "cors";
import express, { Request, Response } from "express";
import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { errorHandler } from "./middleware/error.middleware";
import productRouter from "./routes/product.routes";

// Express initialization
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", productRouter);

// Error handling
app.use(errorHandler);
app.get("*", (req: Request, res: Response) => {
  res.status(505).json({ message: "Bad Request" });
});

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(async () => {
    app.listen(PORT, () => {
      console.log("Server is running on http://localhost:" + PORT);
    });
    console.log("Data Source has been initialized!");
  })
  .catch((error) => console.error(error));
