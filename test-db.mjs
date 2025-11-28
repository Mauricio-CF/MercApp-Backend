// test-db.mjs
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGODB_URI || 'TU_URI_AQUI_SUSTITUIR';

async function test() {
  try {
    await mongoose.connect(uri);
    console.log('Conectado a MongoDB ✅');
    const db = mongoose.connection.db;
    const cols = await db.listCollections().toArray();
    console.log('Colecciones existentes:', cols.map(c => c.name));
    await mongoose.disconnect();
  } catch (err) {
    console.error('Error conectando a MongoDB:', err);
    process.exit(1);
  }
}

test();
