import Task from "./Task"
import {  useState, useEffect , useMemo } from "react"
import type { TasksListDataProps } from "../Data/TasksListData"
import { useToast } from "../Contexts/ToastContext";
import {v4 as uuidv4} from "uuid";
import {useTasks} from "../Contexts/TasksContext"

const TaskList = () => {

  const {tasksState, dispatch} = useTasks();
  const toast = useToast();

  useEffect(() => {
    console.log("Loading tasks from localStorage");
    dispatch({type:"upload"});
  }, []);

  const [filter, setFilter] = useState<'all' | 'completed' | 'incomplete'>('all');
  

  
  const [newTask, setNewTask] =  useState<{title: string, time: string}>({title: '', time: ''});
  const [taskToDelete, setTaskToDelete] = useState<TasksListDataProps | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  function handleAddTask()
  {
    const newTaskToAdd: TasksListDataProps = {
      id: uuidv4(),
      title: newTask.title,
      time: newTask.time,
      completed: false
    };
    dispatch({type: "add", payload: {newTask: newTaskToAdd}});
    setNewTask({title: '', time: ''});
    toast?.showToast("تمت إضافة المهمة بنجاح!");
  }


  function handleDeleteTask(taskId: string) {
    dispatch({type:"delete", payload:{taskId}})
    toast?.showToast("تم حذف المهمة بنجاح!");
  }

  function openDeleteDialog(task: TasksListDataProps) {
    setTaskToDelete(task);
    setShowDeleteConfirm(true);
  }

  function closeDeleteDialog() {
    setShowDeleteConfirm(false);
    setTaskToDelete(null);
  }

  function confirmDelete() {
    if (taskToDelete) {
      handleDeleteTask(taskToDelete.id);
    }
    closeDeleteDialog();
  }


  const filteredTasks =  useMemo(() => {
    console.log("Filtering tasks");
    if (filter === 'completed') 
      return (tasksState as TasksListDataProps[] | undefined)?.filter(task => task.completed === true);
    else if (filter === 'incomplete') 
      return (tasksState as TasksListDataProps[] | undefined)?.filter(task => task.completed === false);
     else 
      return tasksState as TasksListDataProps[] | undefined;
  
  }, [tasksState, filter]);







  function tabClasses(isActive: boolean) {
  return `
    px-5 py-2 rounded font-bold transition
    ${isActive 
      ? " text-primary bg-primary/10"
      : " text-secondary-text-light dark:text-secondary-text-dark hover:bg-gray-200 dark:hover:bg-gray-700"
    }
  `;
}






  return (
    <div className="min-h-screen max-w-md mx-auto flex flex-col p-4 bg-card-light dark:bg-card-dark">
  <header className="py-8">
    <h1 className="text-6xl font-black text-center text-text-light dark:text-text-dark">
      مهامي
    </h1>
    <div className="flex justify-center mt-2">
      <span className="w-3 h-3 bg-text-light dark:bg-text-dark rounded-full" />
      <span className="w-3 h-3 bg-text-light dark:bg-text-dark rounded-full mx-1" />
    </div>
  </header>
  <main className="flex-grow">
    <div className="flex justify-center items-center p-1 rounded-md border border-border-light dark:border-border-dark mb-6 text-sm"  style={{direction : 'rtl'}}  
    >
      <button className= {tabClasses(filter === 'all')}
      onClick={() => setFilter('all')}
      >
        الكل
      </button>
      <div className="h-5 w-px bg-border-light dark:bg-border-dark mx-1" 
      />
      <button className= {tabClasses(filter === 'completed')}
        onClick={() => setFilter('completed')}
      >
        منجز
      </button>
      <div className="h-5 w-px bg-border-light dark:bg-border-dark mx-1" />
      <button className= {tabClasses(filter === `incomplete`)}
        onClick={() => setFilter('incomplete')}
      >
        غير منجز
      </button>
    </div>
    <div className="space-y-4">

      
      {  
      filteredTasks?.map((task) => (
          <Task key={task.id} taskData={task} onDeleteClick={openDeleteDialog} />
      ))
    }
    

    </div>
    <dialog
      open={showDeleteConfirm}
    >
      <div className="w-full max-w-[320px] overflow-hidden rounded-2xl bg-white dark:bg-[#1e2532] shadow-2xl ring-1 ring-black/5 dark:ring-white/10 transform scale-100 transition-all">
        <div className="flex flex-col items-center p-6 text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
            <span className="material-symbols-outlined text-red-600 dark:text-red-500 text-[24px]">
              حذف
            </span>
          </div>
          <h3 className="mb-2 text-lg font-bold leading-6 text-gray-900 dark:text-white">
            حذف المهمة
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            هل أنت متأكد أنك تريد حذف المهمة
            <span className="font-semibold text-gray-900 dark:text-white">
              {" "}{taskToDelete?.title}{" "}

            </span>
            ؟ لن تتمكن من التراجع عن هذا الإجراء.
          </p>
        </div>
        <div className="grid grid-cols-2 divide-x divide-gray-200 dark:divide-gray-700 border-t border-gray-200 dark:border-gray-700">
          <button className="flex h-12 w-full items-center justify-center text-[15px] font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-[#252b3b] active:bg-gray-100 dark:active:bg-[#2a3242] transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary rounded-bl-2xl"
            onClick={closeDeleteDialog}>
            الغاء 
          </button>
          <button className="flex h-12 w-full items-center justify-center text-[15px] font-bold text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 active:bg-red-100 dark:active:bg-red-900/30 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500 rounded-br-2xl"
            onClick={confirmDelete}>
              حذف
          </button>
        </div>
      </div>
    </dialog>

    </main>
<footer className="pt-6 mt-auto">
    <div className="flex items-center space-x-3 space-x-reverse">
    <input
      className="flex-grow w-full bg-transparent border border-border-light dark:border-border-dark text-text-light dark:text-text-dark placeholder-secondary-text-light dark:placeholder-secondary-text-dark rounded-md focus:ring-primary focus:border-primary"
      placeholder="عنوان المهمة"
      type="text"
      value={newTask.title}
      onChange={(e) => setNewTask({...newTask, title: e.target.value})} style={{direction : 'rtl'}}
    />



      <input
      className="flex-grow w-full bg-transparent border border-border-light dark:border-border-dark text-text-light dark:text-text-dark placeholder-secondary-text-light dark:placeholder-secondary-text-dark rounded-md focus:ring-primary focus:border-primary"
      placeholder="الوقت"
      type="text"
      value={newTask.time}
      onChange={(e) => setNewTask({...newTask, time: e.target.value})}  style={{direction : 'rtl'}}
    />



    <button className="bg-primary text-white font-bold py-3 px-8 rounded-md hover:bg-opacity-90 transition-colors"
    onClick={handleAddTask}
    disabled= {newTask.title.trim() === '' || newTask.time.trim() === ''}
    >
      إضافة
    </button>
    </div>
</footer>
</div>

)
}

export default TaskList
