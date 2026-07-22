import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { Home } from "./pages/Home"
import { Access } from "./pages/Access"

export default function App(){
  return(
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Access/>}/>
          <Route path="/register" element={<Access/>}/>
          <Route path="/" element={<Home/>}/>
        </Routes>
      </Router>
    </>
  )
}