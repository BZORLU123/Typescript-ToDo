"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
let todos = [
    { id: 1, name: 'Görev 1', done: false },
    { id: 2, name: 'Görev 2', done: true },
];
// Tüm görevleri al
router.get('/', (req, res) => {
    res.json(todos);
});
// Yeni görev ekle
router.post('/', (req, res) => {
    const newTodo = {
        id: todos.length + 1,
        name: req.body.name,
        done: false,
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});
// Görev sil
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    todos = todos.filter(todo => todo.id !== id);
    res.status(204).send();
});
// Görev güncelle
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        todo.name = req.body.name || todo.name;
        todo.done = req.body.done !== undefined ? req.body.done : todo.done;
        res.json(todo);
    }
    else {
        res.status(404).json({ message: 'Todo not found' });
    }
});
exports.default = router;
