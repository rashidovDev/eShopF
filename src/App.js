import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import {Login} from "./Login"

const App = () => {
  return (
           <BrowserRouter>
           <Routes>
            <Route path="admin/login" element={<Login/>}/>
           </Routes>
           </BrowserRouter>
  )
}

export default App