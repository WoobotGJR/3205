import app from './app';

const port = 3000;

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
