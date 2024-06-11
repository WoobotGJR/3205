import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';

const app = express();

// Middleware для парсинга JSON тела запроса
app.use(bodyParser.json());

// Подключение роутов
app.use('/api', userRoutes);

export default app;
