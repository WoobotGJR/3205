import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/userRoutes';

const app = express();

// Middleware для CORS
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
  })
);
// Middleware для парсинга JSON тела запроса
app.use(bodyParser.json());

// Подключение роутов
app.use('/api', userRoutes);

export default app;
