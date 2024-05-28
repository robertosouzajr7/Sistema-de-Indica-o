import express from "express";
import mongoose from "mongoose";
import userRoutes from "./router/routers.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api", userRoutes);

// Configuração para suprimir o aviso de depreciação
mongoose.set("strictQuery", false); // ou false, conforme sua preferência

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

export default app;
