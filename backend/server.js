const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// Используем порт от Railway или 3000 локально
const PORT = process.env.PORT || 3000;

// Разрешаем CORS
app.use(cors());

// Включаем обработку JSON в запросах
app.use(express.json());

// Подключение к MongoDB
const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/mydatabase";

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB подключена"))
.catch(err => {
    console.error("❌ Ошибка подключения к MongoDB:", err);
    process.exit(1); // Завершаем процесс, если база не подключилась
});

// Основной маршрут
app.get("/", (req, res) => {
    res.send("Backend работает!");
});

// Пример API-маршрута
app.get("/api/data", (req, res) => {
    res.json({ message: "Это API ответ", status: "success" });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`🚀 Сервер запущен на порту ${PORT}`);
});
