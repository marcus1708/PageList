import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { createClient } from 'redis';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import taskRoutes from './routes/taskRoutes';
import { handleRedisMessages } from './utils/redisSubscriber';
import { setupSwagger } from './docs/swagger';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
setupSwagger(app);

// Rotas
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

// Conexão MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/todo-jwt', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as any).then(() => console.log('✅ MongoDB conectado'))
  .catch((err) => console.error('❌ Erro ao conectar MongoDB:', err));

// Redis Subscriber
handleRedisMessages();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
