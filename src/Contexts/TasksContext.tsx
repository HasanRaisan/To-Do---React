import { createContext, useContext, useReducer } from "react";
import type { TasksListDataProps } from "../Data/TasksListData";
import TasksReducer from "../Reducers/TasksReducer";
import type { TasksAction } from "../Reducers/TasksReducer";
type TasksContextType = { tasksState: TasksListDataProps[]; dispatch: React.Dispatch<TasksAction> }

const TasksContext = createContext<TasksContextType | null>(null);

export const TasksProvider = ({children}: {children: React.ReactNode}) => {
    const [tasks, dispatch] = useReducer(TasksReducer, []);
    return (
        <TasksContext.Provider value={{tasksState: tasks, dispatch}}>
            {children}
        </TasksContext.Provider>
    )
}
export default TasksProvider;

export const useTasks = () => {
    const context = useContext(TasksContext);
    if (!context) {
        throw new Error("useTasks must be used within a TasksProvider");
    }
    return context;
}





















