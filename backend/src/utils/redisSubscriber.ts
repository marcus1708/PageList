import { createClient } from 'redis';

export const handleRedisMessages = async () => {
  const subscriber = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379',
  });

  await subscriber.connect();
  console.log('🔄 Redis Subscriber conectado com sucesso');

  await subscriber.subscribe('tasks', (message) => {
    const task = JSON.parse(message);
    console.log('📢 Atualização recebida via Redis:', task);
    // Aqui pode disparar para WebSocket ou outro canal
  });
};
