import { Todo } from "./types";

export interface User {
    name: string;
    email: string;
    passwordHash: string;
    todos?: Todo[];
}