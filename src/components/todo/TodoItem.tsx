import React, { useState } from 'react';
import { Checkbox, IconButton, TextField } from '@mui/material';
import { Todo } from '../../types';
import { useTodo } from '../../context/TodoContext';
import EditNoteIcon from '@mui/icons-material/EditNote';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
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
            <div className="flex items-start space-x-2">
                <Checkbox
                    checked={todo.completed}
                    onChange={() => toggleTodoCompletion(todo.id)}
                    color="primary"
                />
                <div
                // className={`${todo.completed ? 'line-through text-gray-500' : ''}`}
                >
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
                        <div className='capitalize'>
                            <div
                                className={`${todo.completed ? 'line-through text-gray-500' : ''}`}
                            >
                                <h2 className="text-lg font-semibold">{todo.title}</h2>
                                <p>{todo.description}</p>
                            </div>
                            <span className={`text-sm font-semibold ${todo.status === 'completed' ? 'text-green-500' : 'text-red-500'}`}>
                                {todo.status}
                            </span>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex space-y-2 sm:space-y-0 sm:space-x-2 flex-col sm:flex-row">
                {todo.completed ?
                    null :
                    <IconButton color="primary" onClick={handleEdit}>
                        {isEditing ? <SaveIcon /> : <EditNoteIcon />}
                    </IconButton>
                }
                <IconButton color="secondary" onClick={() => deleteTodo(todo.id)}>
                    <DeleteIcon />
                </IconButton>
            </div>
        </div>
    );
};

export default TodoItem;
