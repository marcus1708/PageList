import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import taskRoutes from './routes/taskRoutes';
import { getRedisSubscriber } from './utils/redis';
import cors from 'cors';
import { setupSwagger } from './docs/swagger';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
setupSwagger(app);

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/todo-app')
  .then(() => console.log('✅ MongoDB conectado'))
  .catch((err) => console.error('❌ Erro no MongoDB:', err));

// Redis Subscriber (tempo real)
getRedisSubscriber().then(subscriber => {
  subscriber.subscribe('tasks', (message) => {
    console.log('🔄 Atualização de tarefa:', JSON.parse(message));
    // Aqui você pode fazer broadcast com WebSocket, SSE, etc.
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
