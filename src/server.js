import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

// Importar Rutas
import authRoutes from './routes/auth.routes.js';
//import taskRoutes from './routes/auth.routes.js';

dotenv.config();

// Crear la aplicacion de express
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Rutas
app.get('/', (req, res) => res.json({ ok: true, name: 'todo-pwa-api' }));
// app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);

const { PORT = 4000, MONGO_URI } = process.env;

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, { dbName: 'BackPWA' })
  .then(() => {
    console.log('Conectado a la base de datos', mongoose.connection.name);
    app.listen(PORT, () => {
      console.log(`Servidor ejecutandose por: ${PORT}`);
    });
  })
  .catch((error) => console.error('Error de conexión:', error));