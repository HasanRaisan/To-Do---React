import  { createContext } from "react";
import type { TasksListDataProps } from "../Data/TasksListData";

type TasksListContextType = {
  tasksState: TasksListDataProps[];
  setTasks: (tasks: TasksListDataProps[]) => void;
};

export const TasksListContext = createContext<TasksListContextType>({
  tasksState: [],
  setTasks: () => {},
});