import { useState } from "react"
import TaskList from "./Components/TaskList"
import { TasksListContext } from "./Contexts/TasksListData"

function App() {

  const storageTodos =  JSON.parse(localStorage.getItem("tasks") || "[]");
  const [tasksState, setTasks] = useState(storageTodos);
  
  return (
    <>
    <TasksListContext.Provider value={{tasksState, setTasks}}>
      <TaskList />
    </TasksListContext.Provider>
    </>
  )
}

export default App
