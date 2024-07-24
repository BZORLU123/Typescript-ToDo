const API_URL = 'http://localhost:3002/tasks';

export const getTasks = async () => {
    const response = await fetch(API_URL);
    return response.json();
};

export const addTask = async (task: { name: string; done: boolean }) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    });
    return response.json();
};

export const deleteTask = async (id: number) => {
    await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
};

export const updateTask = async (id: number, task: { name: string; done: boolean }) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    });
    return response.json();
};