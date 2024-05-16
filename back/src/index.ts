import express, { Request, Response } from "express";
import "reflect-metadata";
import { AppDataSource } from "./data-source";
import productRouter from "./routes/product.routes";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
// app.use(errorHandler);
// app.use("/auth", productRouter);
app.use("/api", productRouter);

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
  .catch((error) => console.log(error));
