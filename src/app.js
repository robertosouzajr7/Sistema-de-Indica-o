import express from "express";
import userRoutes from "./router/routers.js";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "../db.js";
dotenv.config();

const app = express();

connectDb();

// Configurar CORS
const corsOptions = {
  origin: "*", // Permitir todas as origens
  methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
  allowedHeaders: ["Content-Type", "Authorization", "Api-Token"], // Cabeçalhos permitidos
};

app.use(cors(corsOptions));

app.use(express.json());
app.use("/api", userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
