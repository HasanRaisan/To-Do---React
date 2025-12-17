import {v4 as uuidv4} from "uuid";
import type { TasksListDataProps } from "../Data/TasksListData"

export type TasksAction =
  | { type: "add"; payload: { newTask: TasksListDataProps } }
  | { type: "update"; payload: { taskId: string; newTitle: string; newTime: string } }
  | { type: "delete"; payload: { taskId: string } }
  | { type: "upload" }
  | { type: "complete"; payload: { taskId: string; status: boolean } };

export default function TasksReducer(state: TasksListDataProps[] = [], action: TasksAction) {
    switch(action.type)
    {
        case "add": {
          return  handleAddTask();
        }

        case "update":{
            return handleUpdateTask();
        }
          case "delete":{
            return handleDeleteTask();
        }
        case "upload" :{
          return handleUploadTasks();
        }
        case "complete" : {
          return handleCompleteTask();
        }
        default: {
            throw new Error("Invalid action type");
        }
    }


  function handleAddTask() {
    if (action.type === "add") {
      const newTaskToAdd : TasksListDataProps = {
        id: uuidv4(),
        title: action.payload.newTask.title,
        time: action.payload.newTask.time,
        completed: false
      };
      const updatedTasks  = (state ?? []).concat(newTaskToAdd);
      persistTasks(updatedTasks);
      return updatedTasks;
    }
    return state;
  }
  function handleUpdateTask() {
    if (action.type === "update") {
      const updatedTasks = (state ?? []).map((task: TasksListDataProps) => task.id === action.payload.taskId ? { ...task, title: action.payload.newTitle, time: action.payload.newTime } : task);
      persistTasks(updatedTasks);
      return updatedTasks;
    }
    return state;
  }
  function handleDeleteTask() {
    if (action.type === "delete") {
      const updatedTasks = (state ?? []).filter((task: TasksListDataProps) => task.id !== action.payload.taskId)
      persistTasks(updatedTasks);
      return updatedTasks;
    }
    return state;
  }
  function handleUploadTasks()
  {
      return loadTasksFromStorage();
  }
  function handleCompleteTask() {
    if (action.type === "complete") {
      const updatedTasks = (state ?? []).map((task: TasksListDataProps) => {
        if (task.id ===  action.payload.taskId) {
          return { ...task, completed:  action.payload.status };
        }
        return task;
      });
      persistTasks(updatedTasks);
      return updatedTasks;
    }
    return state;
  }

  function persistTasks(tasks: TasksListDataProps[]) {
    localStorage.setItem("tasks", JSON.stringify(tasks ?? []));
  }
}

function loadTasksFromStorage(): TasksListDataProps[] {
  try {
    const stored = localStorage.getItem("tasks");
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    localStorage.removeItem("tasks");
    return [];
  }
}