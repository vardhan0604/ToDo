import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import './App.css'
import Home from "./pages/Home";
import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Me from "./pages/Me";
import { Toaster } from "react-hot-toast";


function App() {
  


  return <Router>
    <Header />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/me" element={<Me />} />

      </Routes>
      <Toaster />
    </Router>;
  
}

export default App
