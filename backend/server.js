const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config(); // Загружаем переменные окружения

const app = express();
const PORT = process.env.PORT || 3000;

// Разрешаем CORS
app.use(cors());
app.use(express.json()); // Обрабатываем JSON-запросы

// Подключение к MongoDB Atlas
const MONGO_URI = process.env.MONGODB_URI; 

if (!MONGO_URI) {
    console.error("❌ Ошибка: переменная MONGODB_URI не задана!");
    process.exit(1);
}

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB подключена"))
.catch(err => {
    console.error("❌ Ошибка подключения к MongoDB:", err);
    process.exit(1);
});

// Основной маршрут
app.get("/", (req, res) => {
    res.send("Backend работает!");
});

// API-маршрут
app.get("/api/data", (req, res) => {
    res.json({ message: "Это API ответ", status: "success" });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`🚀 Сервер запущен на порту ${PORT}`);
});
