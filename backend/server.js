const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// Используем порт от Railway или 3000 локально
const PORT = process.env.PORT || 3000;

// Разрешаем CORS
app.use(cors());

// Подключение к MongoDB (используй переменную окружения!)
const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/mydatabase";

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB подключена"))
.catch(err => console.log("❌ Ошибка подключения к MongoDB:", err));

// Маршруты
app.get("/", (req, res) => {
    res.send("Backend работает!");
});

app.get("/api/data", (req, res) => {
    res.json({ message: "Это API ответ", status: "success" });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`🚀 Сервер запущен на порту ${PORT}`);
});
