import express from 'express';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('API do supermercado 🛒');
});

export default app;
