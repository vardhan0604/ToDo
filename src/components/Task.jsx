import axios from 'axios';
import React, { useContext } from 'react'
import { Context, server } from '../main';
import { toast } from 'react-hot-toast';
import "./Task.css"



const Task = (props) => {
    const {loading,setLoading}=useContext(Context)

     const {el,trigger}= props;
     const deleteTask = async()=>{
        setLoading(true)
        try {
            const {data}= await axios.delete(
                `${server}/tasks/${el._id}`,{
                headers:
                {"Content-Type" : "application/json"},
                withCredentials:true
            });
            // toast.success(data.message)
            trigger((prev)=>!prev)
        } catch (error) {
            toast.error("some error")
        }
        setLoading(false)
     }
     const updateTask = async()=>{
        setLoading(true)
        try {
            const {data}= await axios.put(
                `${server}/tasks/${el._id}`,{
                },
               { withCredentials:true}
            );
            // toast.success(data.message)
            trigger((prev)=>!prev)
        } catch (error) {
            toast.error("some error")
        }
        setLoading(false)
     }
     
     
     
  return (
    <div className={`task  ${el.isCompleted && "completed"}`}>
        <div className='task-t-d'>
            <h2 className={`task-title ${el.isCompleted && "done"}`}>{el.title}</h2>
            <p className={`task-desc ${el.isCompleted && "done"}`}>{el.description}</p>
        </div>
        <div>
            <button onClick={updateTask} className={`task-btn ${loading && "blocked"}`}>{!el.isCompleted ? "Done?" : "Undo?"}</button>
            <button onClick={deleteTask} className={`task-btn ${loading && "blocked"}`} >delete</button>
        </div>
          
        </div>
  )
}

export default Task