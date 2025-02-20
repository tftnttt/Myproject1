const express = require("express");
const app = express();

const PORT = 3000; // Порт сервера

app.get("/", (req, res) => {
    res.send("Backend работает!");
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
app.get("/api/data", (req, res) => {
    res.json({ message: "Это API ответ", status: "success" });
});
const cors = require("cors");
app.use(cors());

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/mydatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB подключена"))
.catch(err => console.log("Ошибка подключения:", err));
