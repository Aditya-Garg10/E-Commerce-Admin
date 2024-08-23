import React from 'react'
import "./App.css"
import Admin, { HOST } from './pages/admin'
import AddProduct from './components/addProduct/addProduct'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import Login from './components/login'



const App = () => {

  
  
  const [Data, setData] = useState([]);
  const fetchData = async () => {
    const response = await fetch(`${HOST}/allProducts`, {
      method: "get"
    })
    const data = await response.json()
    setData(data)
    localStorage.setItem('productData', JSON.stringify(data))
  }
  

  

  useEffect(() => {
    fetchData()
  }, [])

  

  

  return (
    <div className=''>
      <BrowserRouter>          
      <Routes>    
        {/* <Route path="/" element={<Admin data={Data} category={"men"}/>}></Route> */}
        <Route path="/admin/men" element={<Admin data={Data} />}></Route>        
        <Route path="/admin/addProduct" element={<AddProduct/>}></Route>
        <Route path="/admin/login" element={<Login/>}></Route>
        <Route path="*" element={<Admin data={Data} category={"men"}/>}></Route>
      </Routes>      
      </BrowserRouter>
    </div>
  )
}

export default App
