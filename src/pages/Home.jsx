import React, { useContext } from "react"
import { Context, server } from "../main"
import axios from "axios"
import { toast } from "react-hot-toast"
import { Navigate } from "react-router-dom"
import Task from "../components/Task"
import "./Home.css"

const Home = () => {
  const {isAuthenticated,loading,setLoading}=useContext(Context)
  const [tasks,setTasks]=React.useState([])
  const [title,setTitle]=React.useState("")
  const [desc,setDesc]=React.useState("")
  const [trigger,setTrigger]=React.useState(false)

  
  React.useEffect(()=>{
    axios.get(`${server}/tasks/my`,{
      "withCredentials": true
    }).then((res)=>{
      setTasks(res.data.tasks);
    }) 
  },[trigger])


  const newTask =async(e)=>{
    setLoading(true)
    e.preventDefault();
    try {
      const {data}= await axios.post(
          `${server}/tasks/new`,
          { 
              title,
              description:desc
      },{
          headers:
          {"Content-Type" : "application/json"},
          "withCredentials":true
      });
      toast.success(data.message)
      setTrigger((prev)=>!prev)
      setTitle("")
      setDesc("")
  } catch (error) {
      toast.error("some error")
  }
  setLoading(false)
  }


  const homeScreen=()=>{
    return <>
      <form onSubmit={newTask}>
        <input type="text" placeholder="Title" required value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
        <input type="text" placeholder="Description" required value={desc} onChange={(e)=>{setDesc(e.target.value)}}/>
        <button className={`button ${loading && "blocked"}`}> submit</button>
      </form>
      <div>
      <h3 className="Home-head">Tasks</h3>
      {tasks.map((e)=>{
        
        return <Task key={e._id} el={e} trigger={setTrigger}/>
      })}
      </div>
      
      
    </>
  }
  if(!isAuthenticated) return <Navigate to={"/register"}/>
  return (<>
  
  {isAuthenticated ?  homeScreen() : <h2>Login First</h2>}
   
  </>
    
  )
}

export default Home