import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool } from './db.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Ошибка сервера');
  }
});

app.get('/', (req, res) => {
  res.send('Сервер работает!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Сервер запущен на порту ${PORT}`));
