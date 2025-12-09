import { useState , useContext} from "react";
import type { TasksListDataProps } from "../Data/TasksListData";
import { TasksListContext } from "../Contexts/TasksListData"

type TaskProps = {
  taskData?: TasksListDataProps;
};

const Task = ({ taskData}: TaskProps) => {


  const {tasksState, setTasks} = useContext(TasksListContext);



  function handleDeleteTask(taskId: number) {
    const updatedTasks = tasksState?.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }

  function handleCompleteTask( taskId: number, status: boolean) {
    const updatedTasks = tasksState?.map(task => {
      if (task.id === taskId) {
        return {...task, completed: status};
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }

function handleEditTask(taskId: number, newTitle: string, newTime: string) {
  const updatedTasks = tasksState?.map(task =>
    task.id === taskId ? { ...task, title: newTitle, time: newTime } : task
  );
  setTasks(updatedTasks);
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}






  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(taskData?.title || "");
  const [editTime, setEditTime] = useState(taskData?.time || "");
  

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  function saveEdit() {
    if (taskData && handleEditTask)
      handleEditTask(taskData.id, editTitle, editTime);
    setIsEditing(false);
  }

  function handleDeleteConfirm() {
    setShowDeleteConfirm(false);
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
          onClick={() => {setShowDeleteConfirm(true);}}
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
            <p className="font-bold text-lg text-text-light dark:text-text-dark" style={{textDecoration: taskData?.completed? "line-through": "none"}}>
              {taskData?.title} 
            </p>
            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
              {taskData?.time}
            </p>
          </>
        )}
      </div>
    </div>

    <dialog
      
      open={showDeleteConfirm}
      onClose={handleDeleteConfirm}
      // onClick={(e) => {
      //   // Close dialog when clicking on the backdrop (outside the dialog box)
      //   if (e.target === e.currentTarget) {
      //     handleDeleteConfirm();
      //   }
      // }}
    >
      <div className="w-full max-w-[320px] overflow-hidden rounded-2xl bg-white dark:bg-[#1e2532] shadow-2xl ring-1 ring-black/5 dark:ring-white/10 transform scale-100 transition-all">
  {/* Dialog Content Area */}
  <div className="flex flex-col items-center p-6 text-center">
    {/* Icon Circle */}
    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
      <span className="material-symbols-outlined text-red-600 dark:text-red-500 text-[24px]">
        حذف
      </span>
    </div>
    {/* Title */}
    <h3 className="mb-2 text-lg font-bold leading-6 text-gray-900 dark:text-white">
      حذف المهمة
    </h3>
    {/* Description */}
    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
      هل أنت متأكد أنك تريد حذف المهمة
      <span className="font-semibold text-gray-900 dark:text-white">
        {" "}{taskData?.title}{" "}
      </span>
      ؟ لن تتمكن من التراجع عن هذا الإجراء.
    </p>
  </div>
  {/* Action Buttons (iOS Style Split) */}
  <div className="grid grid-cols-2 divide-x divide-gray-200 dark:divide-gray-700 border-t border-gray-200 dark:border-gray-700">
    <button className="flex h-12 w-full items-center justify-center text-[15px] font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-[#252b3b] active:bg-gray-100 dark:active:bg-[#2a3242] transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary rounded-bl-2xl"
      onClick={handleDeleteConfirm}>
      الغاء 
    </button>
    <button className="flex h-12 w-full items-center justify-center text-[15px] font-bold text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 active:bg-red-100 dark:active:bg-red-900/30 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500 rounded-br-2xl"
    
      onClick={() => {
        if (taskData) {
          handleDeleteTask(taskData.id);
        } 
        handleDeleteConfirm();
      }}>
        حذف
    </button>
  </div>
</div>
    </dialog>
</>
  );
};

export default Task;