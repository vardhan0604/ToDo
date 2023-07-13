import React, { useContext } from "react";
import axios from "axios";
import { Context, server } from "../main";
import toast from "react-hot-toast"
import { Navigate } from "react-router-dom";

function Register() {
 //states for Input
const [name,setName]=React.useState("")
const [email,setEmail]=React.useState("")
const [pass,setPass]=React.useState("")

const {isAuthenticated,setIsAuthenticated,loading,setLoading,setUser}=useContext(Context)

const submitHandler =async (e)=>{
    setLoading(true)
    e.preventDefault();
    try {
        const {data}= await axios.post(
            `${server}/users/new`,
            { name,
                email,
                password:pass
        },{
            headers:
            {"Content-Type" : "application/json"}
        });
        toast.success(data.message)
        setIsAuthenticated(true)
        setUser(data.user)
    } catch (error) {
        setIsAuthenticated(false)
        toast.error("some error")
         console.log(error)
    }
    setLoading(false)
}

if(isAuthenticated) return <Navigate to={"/"} /> 
  return (
    <form onSubmit={submitHandler}>

        <input type="text" placeholder="Name" required value={name} onChange={(e)=>{setName(e.target.value)}}/>
        <input type="text" placeholder="Email" required value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
        <input type="password" placeholder="Password" required value={pass} onChange={(e)=>{setPass(e.target.value)}}/>
        <button className={`button ${loading && "blocked"}`}> submit</button>
    </form>
  )
}

export default Register
