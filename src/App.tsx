import React, { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import Task from './components/Task';
import { Container, Typography, List, ListItem } from '@mui/material';
import { getTasks, addTask, updateTask, deleteTask } from './services/apiService';

interface TaskType {
  id: number;
  name: string;
  done: boolean;
}

function App() {
  const [tasks, setTasks] = useState<TaskType[]>([]); // Tasklerin tutulduğu state
  
  useEffect(() => {
    const fetchTasks = async () => {
      const tasksFromApi = await getTasks(); // API'den görevleri al
      setTasks(tasksFromApi);
    };
    fetchTasks();
  }, []);
  
  const handleAddTask = async (name: string) => {
    const newTask = await addTask({ name, done: false }); // API'ye task ekle
    setTasks([...tasks, newTask]);
  };
  
  const handleRemoveTask = async (id: number) => {
    await deleteTask(id); // API'den task sil
    setTasks(tasks.filter(task => task.id !== id));
  };
  
  const handleUpdateTaskDone = async (id: number, done: boolean) => {
    const updatedTask = await updateTask(id, { name: tasks.find(task => task.id === id)!.name, done }); // API'de task durumunu güncelle
    setTasks(tasks.map(task => (task.id === id ? updatedTask : task)));
  };
  
  const handleRenameTask = async (id: number, newName: string) => {
    const updatedTask = await updateTask(id, { name: newName, done: tasks.find(task => task.id === id)!.done }); // API'de task adını güncelle
    setTasks(tasks.map(task => (task.id === id ? updatedTask : task)));
  };

  return (
      <Container maxWidth="sm" sx={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px' }}>
        <Typography variant="h3" align="center">
          Todo Uygulaması
        </Typography>
        <TaskForm onAdd={handleAddTask} /> {/* Task ekleme formu */}
        <List>
          {tasks.map((task) => (
              <ListItem key={task.id} disablePadding>
                <Task
                    name={task.name}
                    done={task.done}
                    onRename={(newName) => handleRenameTask(task.id, newName)} // Task adını güncelle
                    onTrash={() => handleRemoveTask(task.id)} // Task sil
                    onToggle={(done) => handleUpdateTaskDone(task.id, done)} // Task durumunu güncelle
                />
              </ListItem>
          ))}
        </List>
      </Container>
  );
}

export default App;
