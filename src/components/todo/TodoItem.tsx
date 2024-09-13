import React, { useState } from 'react';
import { Button, Checkbox, IconButton, TextField } from '@mui/material';
import { Todo } from '../../types';
import { useTodo } from '../../context/TodoContext';

interface TodoItemProps {
    todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
    const { toggleTodoCompletion, deleteTodo, editTodo } = useTodo();
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(todo.title);
    const [description, setDescription] = useState(todo.description);

    const handleEdit = () => {
        if (isEditing) {
            editTodo(todo.id, { title, description });
        }
        setIsEditing(!isEditing);
    };

    return (
        <div className="flex items-center justify-between p-4 bg-white rounded shadow">
            <div className="flex items-center space-x-2">
                <Checkbox
                    checked={todo.completed}
                    onChange={() => toggleTodoCompletion(todo.id)}
                    color="primary"
                />
                <div className={`${todo.completed ? 'line-through text-gray-500' : ''}`}>
                    {isEditing ? (
                        <div className="space-y-2">
                            <TextField
                                fullWidth
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                label="Title"
                            />
                            <TextField
                                fullWidth
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                label="Description"
                            />
                        </div>
                    ) : (
                        <div>
                            <h2 className="text-lg font-semibold">{todo.title}</h2>
                            <p>{todo.description}</p>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex space-x-2">
                <IconButton color="primary" onClick={handleEdit}>
                    {isEditing ? 'Save' : 'Edit'}
                </IconButton>
                <IconButton color="secondary" onClick={() => deleteTodo(todo.id)}>
                    {/* Replace with DeleteIcon if needed */}
                    🗑️
                </IconButton>
            </div>
        </div>
    );
};

export default TodoItem;
