import redisClient from '../config/redis';

export function subscribeToTasks(callback: (data: any) => void) {
  const subscriber = redisClient.duplicate();

  subscriber.connect().then(() => {
    subscriber.subscribe('tasks', (message) => {
      const data = JSON.parse(message);
      callback(data);
    });
  });
}
