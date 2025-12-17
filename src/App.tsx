import TaskList from "./Components/TaskList"
import {ToastProvider} from "./Contexts/ToastContext"
import { TasksProvider } from "./Contexts/TasksContext"

function App() {
  
  return (
    <>
      <TasksProvider>
        <ToastProvider>
          <TaskList />
        </ToastProvider>
      </TasksProvider>
    </>
  )
}

export default App