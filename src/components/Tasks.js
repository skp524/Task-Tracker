import Task from "./Task";

const Tasks = ({tasks,deleteTask,toggleRemainder}) => {
  return (
   <>
     {tasks.map(task=>
     <Task key ={task.id} task= {task} deleteTask={deleteTask} toggleRemainder={toggleRemainder}/>
     )}
   </>
  )
}
export default Tasks;
