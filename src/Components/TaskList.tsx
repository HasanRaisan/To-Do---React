import Task from "./Task"
import {  useState, useEffect , useContext} from "react"
import { TasksListContext } from "../Contexts/TasksListData"
import type { TasksListDataProps } from "../Data/TasksListData"

const TaskList = () => {
  const {tasksState, setTasks} = useContext(TasksListContext);


useEffect(() => {
console.log("calling use effect");
const storageTodos =  JSON.parse(localStorage.getItem("tasks") || "[]");
setTasks (storageTodos);
}, []);



  const [filter, setFilter] = useState<'all' | 'completed' | 'incomplete'>('all');
  


  
  const [newTask, setNewTask] =  useState<{title: string, time: string}>({title: '', time: ''});

  function handleAddTask() {
    const newTaskToAdd : TasksListDataProps = {
      id: tasksState && tasksState.length > 0 ? Math.max(...tasksState.map(t => t.id)) + 1 : 1,
      title: newTask.title,
      time: newTask.time,
      completed: false
    };
    const updatedTasks  = tasksState ? [...tasksState, newTaskToAdd] : [newTaskToAdd];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setNewTask({title: '', time: ''});
  }


  let filteredTasks;
  if (filter === 'completed') {
    filteredTasks = tasksState?.filter(task => task.completed === true);
  } else if (filter === 'incomplete') {
    filteredTasks = tasksState?.filter(task => task.completed === false);
  } else {
    filteredTasks = tasksState;
  }






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
          <Task key={task.id} taskData={task} />
      ))
    }
    

    </div>
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
