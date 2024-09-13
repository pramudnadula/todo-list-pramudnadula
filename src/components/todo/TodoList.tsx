import React from 'react';
import { useTodo } from '../../context/TodoContext';
import AddTodoForm from './AddTodoForm';
import TodoItem from './TodoItem';

const TodoList: React.FC = () => {
    const { todos } = useTodo();

    return (
        <div className="space-y-4">
            <AddTodoForm />
            {todos.length > 0 ? (
                todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
            ) : (
                <p className="text-center text-gray-500">No todos available.</p>
            )}
        </div>
    );
};

export default TodoList;
