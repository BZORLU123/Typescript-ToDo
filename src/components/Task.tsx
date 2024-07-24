import React, { useState } from 'react';
import { Checkbox, IconButton, ListItem, ListItemText, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface TaskProps {
    name: string;
    done: boolean;
    onToggle: (done: boolean) => void;
    onTrash: () => void;
    onRename: (newName: string) => void;
}

const Task: React.FC<TaskProps> = ({ name, done, onToggle, onTrash, onRename }) => {
    const [editMode, setEditMode] = useState(false); // Düzenleme modunu kontrol eden state
    const [editedName, setEditedName] = useState(name); // Düzenlenen görev adını tutan state

    return (
        <ListItem className={done ? 'done' : ''} disablePadding>
            <Checkbox checked={done} onChange={() => onToggle(!done)} />
            {!editMode ? (
                <ListItemText
                    primary={name}
                    onClick={() => setEditMode(true)}
                    style={{ cursor: 'pointer' }}
                />
            ) : (
                <form
                    onSubmit={(ev) => {
                        ev.preventDefault();
                        onRename(editedName);
                        setEditMode(false);
                    }}
                >
                    <TextField
                        type="text"
                        value={editedName}
                        onChange={(ev) => setEditedName(ev.target.value)}
                    />
                </form>
            )}
            <IconButton onClick={onTrash} edge="end" aria-label="delete">
                <DeleteIcon />
            </IconButton>
        </ListItem>
    );
};

export default Task;
