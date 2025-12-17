import { useState } from "react";
import type { TasksListDataProps } from "../Data/TasksListData";
import { useToast } from "../Contexts/ToastContext";
import { useTasks } from "../Contexts/TasksContext";

type TaskProps = {
  taskData?: TasksListDataProps;
  onDeleteClick?: (task: TasksListDataProps) => void;
};

const Task = ({ taskData, onDeleteClick }: TaskProps) => {

  const toast = useToast();
  const {dispatch} = useTasks();


  function handleCompleteTask(taskId: string, status: boolean) {
    dispatch({type: "complete", payload: {taskId, status}})
    toast?.showToast(status ? "تم اكمال المهمة!" : "تم وضع المهمة كغير مكتملة!");
  }

  function handleEditTask(taskId: string, newTitle: string, newTime: string) {
    dispatch({type: "update", payload:{taskId, newTitle, newTime}});
  }

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(taskData?.title || "");
  const [editTime, setEditTime] = useState(taskData?.time || "");

  function saveEdit() {
    if (taskData && handleEditTask)
      handleEditTask(taskData.id, editTitle, editTime);
    setIsEditing(false);
    toast?.showToast("تم تعديل المهمة بنجاح!");
  }

  return (
    <>
      <div className="bg-card-light dark:bg-card-dark rounded-lg p-4 shadow-md flex items-center justify-between">

        <div className="flex items-center space-x-2">
          {/* COMPLETE BUTTON */}
          <button
            className="border-2 border-primary text-primary rounded-full w-10 h-10 flex items-center justify-center transition-transform hover:scale-105 hover:bg-primary/10"
            onClick={() =>
              taskData &&
              handleCompleteTask(taskData.id, !taskData.completed)
            }
          >
            <span className="material-icons">
              {taskData?.completed ? "radio_button_checked" : "radio_button_unchecked"}
            </span>
          </button>

          {/* EDIT BUTTON */}
          <button
            className="bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-text-light dark:text-text-dark rounded-full w-10 h-10 flex items-center justify-center transition-transform hover:scale-105"
            onClick={() => setIsEditing(true)}
          >
            <span className="material-icons text-sm">edit</span>
          </button>

          {/* DELETE BUTTON */}
          <button
            className="bg-danger/10 border border-danger/30 text-danger rounded-full w-10 h-10 flex items-center justify-center transition-transform hover:scale-105"
            onClick={() => {
              if (taskData && onDeleteClick) {
                onDeleteClick(taskData);
              }
            }}
          >
            <span className="material-icons">delete_outline</span>
          </button>
        </div>

        {/* RIGHT SIDE (TITLE + TIME) */}
        <div className="text-right">

          {/* only edit mode */}
          {isEditing ? (
            <div className="flex flex-col gap-2">

              <input
                className="bg-transparent border border-primary/50 p-1 rounded text-text-light dark:text-text-dark"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onBlur={saveEdit}
                onKeyDown={(e) => e.key === "Enter" && saveEdit()}
              />

              <input
                className="bg-transparent border border-primary/50 p-1 rounded text-text-light dark:text-text-dark"
                value={editTime}
                onChange={(e) => setEditTime(e.target.value)}
                onBlur={saveEdit}
                onKeyDown={(e) => e.key === "Enter" && saveEdit()}
              />

            </div>
          ) : (
            <>
              <p className="font-bold text-lg text-text-light dark:text-text-dark" style={{ textDecoration: taskData?.completed ? "line-through" : "none" }}>
                {taskData?.title}
              </p>
              <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                {taskData?.time}
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Task;