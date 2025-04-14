import { createServer } from 'http';
import { Server } from 'socket.io';
import app from './src/index'; // Express App
import { subscribeToTasks } from './src/utils/subscribe';

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: '*', // ajuste isso no futuro para o domínio do seu frontend
  },
});

io.on('connection', (socket) => {
  console.log(`🔌 Cliente conectado: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`❌ Cliente desconectado: ${socket.id}`);
  });
});

// Envia via WebSocket qualquer alteração recebida do Redis
subscribeToTasks((data) => {
  console.log('📡 Emitindo via WebSocket:', data);
  io.emit('task-update', data);
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`🚀 Servidor backend + WebSocket rodando em http://localhost:${PORT}`);
});
