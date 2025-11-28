// db.js — conexión moderna a MongoDB (Mongoose 7+)
import mongoose from "mongoose";
import dotenv from "dotenv";

// ⚠ Solo cargamos dotenv en desarrollo, no en Render
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

export async function connectDB() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI no está definido.");
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB conectado correctamente");
  } catch (err) {
    console.error("Error conectando a MongoDB:", err);
    process.exit(1);
  }
}