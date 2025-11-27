// db.js — conexión moderna a MongoDB (Mongoose 7+)
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // carga las variables del archivo .env

export async function connectDB() {
  try {
    // 🔥 conexión moderna — SIN opciones antiguas
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB conectado correctamente");
  } catch (err) {
    console.error("Error conectando a MongoDB:", err);
    process.exit(1);
  }
}

