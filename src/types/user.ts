import { Todo } from "./todo";

export interface User {
    name: string;
    email: string;
    passwordHash: string;
    todos?: Todo[];
}