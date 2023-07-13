import React, { useContext } from "react";
import { Context, server } from "../main";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Navigate } from "react-router-dom";
import "./Login.css"

const Login = () => {
    const {isAuthenticated,setIsAuthenticated,loading,setLoading,setUser}=useContext(Context)
    

    const submitHandler =async (e)=>{
        e.preventDefault();
        setLoading(true)
        try {
            
            const {data}= await axios.post(
                `${server}/users/login `,
                { 
                    email,
                    password:pass
            },{
                headers:
                {"Content-Type" : "application/json"},
                "withCredentials":true
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

//states for Input
const [email,setEmail]=React.useState("")
const [pass,setPass]=React.useState("")




if(isAuthenticated) return<Navigate to={"/"} /> 

  return (
    <form onSubmit={submitHandler}>

        <input type="text" placeholder="Email" required value={email} onChange={(e)=>{setEmail(e.target.value)}}/>

        <input type="password" placeholder="Password" required value={pass} onChange={(e)=>{setPass(e.target.value)}}/>
        <button className={`button ${loading && "blocked"}`}> submit</button>
    </form>
  )
}

export default Login