// src/types.ts
export interface Todo {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    status: 'completed' | 'incomplete';
  }
  