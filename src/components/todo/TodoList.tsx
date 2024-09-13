import React, { useState } from 'react';
import { useTodo } from '../../context/TodoContext';
import TodoItem from './TodoItem';
import { Button } from '@mui/material';
import AddTodoForm from './AddTodoForm';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';

const TodoList: React.FC = () => {
    const { todos } = useTodo();
    const [showAll, setShowAll] = useState(false);

    // Separate todos into incomplete and completed
    const incompleteTodos = todos.filter(todo => !todo.completed);
    const completedTodos = todos.filter(todo => todo.completed);

    // Toggle between showing all todos or only incomplete ones
    const handleToggle = () => {
        setShowAll(prev => !prev);
    };

    return (
        <div>
            <AddTodoForm />
            {todos.length > 0 && (
                <Button
                    className='h-12 bg-gradient-to-r from-secondaryColor to-tertiaryColor text-white'
                    variant="contained"
                    fullWidth
                    type="submit"
                    onClick={handleToggle}
                >
                    {showAll ? 'Show Incomplete Todos Only' : 'Show All Todos'}
                </ Button >
            )}

            {/* Display Incomplete Todos */}
            <div>
                {incompleteTodos.length > 0 && !showAll && (
                    <h2 className="text-xl font-bold my-2 text-red-600">Incomplete Todos</h2>
                )}
                <div className="space-y-2 mt-2">
                    {incompleteTodos.length === 0 && !showAll && (
                        <div className=' flex flex-col items-center justify-center'>
                            <PlaylistAddCheckIcon fontSize={'large'} className='text-6xl text-gray-300' />
                            <p className='my-2'>No incomplete todos</p>
                        </div>
                    )}
                    {incompleteTodos.map(todo => (
                        <TodoItem key={todo.id} todo={todo} />
                    ))}
                </div>
            </div>

            {/* Display Completed Todos */}
            {showAll && completedTodos.length > 0 && (
                <>
                    <h2 className="text-xl font-bold mt-4 my-2 text-green-600">Completed Todos</h2>
                    <div className="space-y-2">
                        {completedTodos.map(todo => (
                            <TodoItem key={todo.id} todo={todo} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default TodoList;
