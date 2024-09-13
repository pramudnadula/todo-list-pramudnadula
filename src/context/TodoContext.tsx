// src/context/TodoContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Todo } from '../types';

interface TodoContextType {
    todos: Todo[];
    addTodo: (todo: Todo) => void;
    deleteTodo: (id: number) => void;
    toggleTodoCompletion: (id: number) => void;
    editTodo: (id: number) => void; // Placeholder for the edit function
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
    const [todos, setTodos] = useState<Todo[]>([]);

    const addTodo = (todo: Todo) => {
        setTodos([...todos, todo]);
    };

    const deleteTodo = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const toggleTodoCompletion = (id: number) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const editTodo = (id: number) => {
        // Implement edit logic if needed
    };

    return (
        <TodoContext.Provider
            value={{ todos, addTodo, deleteTodo, toggleTodoCompletion, editTodo }}
        >
            {children}
        </TodoContext.Provider>
    );
};

export const useTodo = () => {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error('useTodo must be used within a TodoProvider');
    }
    return context;
};
