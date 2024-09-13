import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Todo } from '../types';
import { User } from '../types';
import { useAuth } from './AuthContext'; // Import useAuth to get the current user
import { toast } from 'react-toastify';

interface TodoContextType {
    todos: Todo[];
    addTodo: (todo: Todo) => void;
    deleteTodo: (id: number) => void;
    toggleTodoCompletion: (id: number) => void;
    editTodo: (id: number, updatedTodo: Partial<Todo>) => void; // Updated to handle partial updates
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
    const { user } = useAuth(); // Get the current authenticated user
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        if (user) {
            const currentUserTodos = getCurrentUserTodos(user.email); // Load todos when user changes
            setTodos(currentUserTodos);
        } else {
            setTodos([]); // Clear todos when user logs out
        }
    }, [user]); // Re-run effect when the user changes

    const getCurrentUserTodos = (email: string): Todo[] => {
        const users = JSON.parse(localStorage.getItem('users') || '[]') as User[];
        const user = users.find((user) => user.email === email);
        return user?.todos || [];
    };

    const updateUserTodos = (updatedTodos: Todo[]) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]') as User[];
        const currentUserEmail = user?.email;
        if (currentUserEmail) {
            const updatedUsers = users.map((user) =>
                user.email === currentUserEmail ? { ...user, todos: updatedTodos } : user
            );
            localStorage.setItem('users', JSON.stringify(updatedUsers));
        }
    };

    const addTodo = (todo: Todo) => {
        const updatedTodos = [...todos, todo];
        setTodos(updatedTodos);
        updateUserTodos(updatedTodos);
        toast.success('Todo added successfully');
    };

    const deleteTodo = (id: number) => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
        updateUserTodos(updatedTodos);
        toast.error('Todo deleted successfully');
    };

    const toggleTodoCompletion = (id: number) => {
        const updatedTodos = todos.map((todo) =>
            todo.id === id
                ? {
                    ...todo,
                    completed: !todo.completed,
                    status: todo.completed ? 'incomplete' as const : 'completed' as const,
                }
                : todo
        );
        setTodos(updatedTodos);
        updateUserTodos(updatedTodos);
        toast.info(`Todo ${updatedTodos.find((todo) => todo.id === id)?.status}`);
    };

    const editTodo = (id: number, updatedTodo: Partial<Todo>) => {
        const updatedTodos = todos.map((todo) =>
            todo.id === id ? { ...todo, ...updatedTodo } : todo
        );
        setTodos(updatedTodos);
        updateUserTodos(updatedTodos);
        toast.success('Todo updated successfully');
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
