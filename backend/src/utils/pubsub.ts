import { createClient } from 'redis';
import { Task } from '../models/taskModel';

const redisClient = createClient();
redisClient.connect();

export const publishTaskUpdate = async (task: any) => {
  await redisClient.publish('tasks', JSON.stringify(task));
};

export const getRedisSubscriber = async () => {
  const subscriber = createClient();
  await subscriber.connect();

  await subscriber.subscribe('tasks', (message) => {
    console.log('📩 Atualização recebida via Redis:', JSON.parse(message));
  });
};
