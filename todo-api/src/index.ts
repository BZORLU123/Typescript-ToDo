import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = 3002;

app.use(bodyParser.json());
app.use(cors());

interface Task {
    id: number;
    name: string;
    done: boolean;
}

let tasks: Task[] = [];
let idCounter = 1;

// Tüm görevleri al
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Yeni görev ekle
app.post('/tasks', (req, res) => {
    const newTask: Task = {
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
    } else {
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
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
