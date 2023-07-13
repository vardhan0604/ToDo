import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

export const server = "https://nodejs-todoapp-lpxg.onrender.com/api/v1"
export const Context = createContext({isAuthenticated :false})
const AppWrapper = () =>{
  const [isAuthenticated,setIsAuthenticated]=React.useState(false)
  const [loading,setLoading]=React.useState(false)
  const [user,setUser]=React.useState("")
  return (
    <Context.Provider value={
      {isAuthenticated,setIsAuthenticated,loading,setLoading,user,setUser}
    }>
      <App />
    </Context.Provider> 
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
)
