import  { createContext } from "react";


export const TasksListContext = createContext<{ tasksState: unknown[]; setTasks: (tasks: unknown[]) => void }>({ tasksState: [], setTasks: () => {} }); 