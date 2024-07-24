"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3002;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
let tasks = [];
let idCounter = 1;
// Tüm görevleri al
app.get('/tasks', (req, res) => {
    res.json(tasks);
});
// Yeni görev ekle
app.post('/tasks', (req, res) => {
    const newTask = {
        id: idCounter++,
        name: req.body.name,
        done: false,
    };
    tasks.push(newTask);
    res.json(newTask);
});
// Görev sil
app.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    tasks = tasks.filter(task => task.id !== id);
    res.json({ message: 'Task deleted' });
});
// Görev durumu güncelle
app.put('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.done = req.body.done;
        res.json(task);
    }
    else {
        res.status(404).json({ message: 'Task not found' });
    }
});
// Görev adı güncelle
app.put('/tasks/:id/name', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.name = req.body.name;
        res.json(task);
    }
    else {
        res.status(404).json({ message: 'Task not found' });
    }
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
