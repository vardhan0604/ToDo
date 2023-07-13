import { useContext } from "react"
import { Link } from "react-router-dom"
import { Context, server } from "../main"
import axios from "axios";
import { toast } from "react-hot-toast";
import "./Header.css"

const Header = () => {
  const {isAuthenticated,setIsAuthenticated,loading,setLoading,user,setUser}=useContext(Context)

  const logoutHandler =async (e)=>{
    setLoading(true)
    e.preventDefault();
    try {
        const {data}= await axios.get(
            `${server}/users/logout `,
           {
            "withCredentials":true
        });
        toast.success(data.message)
        setIsAuthenticated(false)
        setUser('')
    } catch (error) {
        setIsAuthenticated(true)
        toast.error("some error")
         console.log(error)
    }
    setLoading(false)
}
  
  return (
    <>
    <header>
        <h2 className="Header-heading">TODO LIST</h2>

       {/* {isAuthenticated &&  <div>
            <Link to={"/me"} className="Link">My Profile</Link>
        </div>} */}
        {isAuthenticated ? 
        <div>
          <div className="Header-profile-wrapper">
          <div className="profile">
          <img width="30" height="30" src="https://img.icons8.com/ios/50/gender-neutral-user--v1.png" alt="gender-neutral-user--v1"/>
          <span>{user}</span>
          </div>
          <button className={`button ${loading && "blocked"}`} onClick={logoutHandler}>Logout</button>
          </div>
        </div>: <div>
            <Link to={"/login"} className="Link">Login</Link>
            <Link to={"/register"} className="Link">Sign Up</Link>
        </div>}
        
    </header>
    </>
  )
}

export default Header