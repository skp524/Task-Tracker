import {useState,useEffect} from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import About from './components/About';
import AddTask from './components/AddTask';
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import Footer from './Footer';

const App=() =>{

  const [showAddTask,setShowAddTask]=useState(false);
  const [tasks,setTasks]=useState([]);

   useEffect(()=>{
     const getTasks=async()=>{
       const tasksFromServer=await fetchTasks();
      setTasks(tasksFromServer);
     }
     getTasks();
   },[]);

   const fetchTasks=async()=>{
    const res= await fetch('http://localhost:5000/tasks');
    console.log(res)
    const data=await res.json();
    return data;
  }
   const fetchTask=async(id)=>{
    const res= await fetch(`http://localhost:5000/tasks/${id}`);
    const data=await res.json();
    return data;
  }

   const addTask =async(task)=>{
     const res= await fetch('http://localhost:5000/tasks',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(task)});
     const data=await res.json();
     console.log(data)
    setTasks([...tasks,data]);
   }

  const deleteTask =async(id)=>{
   await fetch(`http://localhost:5000/tasks/${id}`,{method:'DELETE'});
   setTasks(tasks.filter(task=>task.id!==id));
  }

  const toggleRemainder= async(id)=>{
    const taskToToggle=await fetchTask(id);
    const updatedTask={...taskToToggle,reminder:!taskToToggle.reminder};
    const res=await fetch(`http://localhost:5000/tasks/${id}`,
    {method:'PUT',
    headers:{'content-type':'application/json'}
    ,body:JSON.stringify(updatedTask)});
    const data=await res.json();
    setTasks(tasks.map(task=>task.id===id?{...task,reminder:data.reminder}:task))
  }
  return (
    <Router>
    <div className="container">
    <Header showAddTask={showAddTask} onClick={()=>setShowAddTask(!showAddTask)}/>
        <Route
         path='/'
         exact
        render={(props) => (
          <>
        {showAddTask && <AddTask addTask ={addTask}/>}
        {tasks.length >0 ?
        <Tasks tasks={tasks} deleteTask={deleteTask} toggleRemainder={toggleRemainder}/>:('No Tasks')}
          </>
        )}

        />
        <Route path='/about' component={About}/>
      <Footer/>
    </div>
    </Router>
  );
}

export default App;
