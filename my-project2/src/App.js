import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createContext, useEffect, useState } from 'react';
import API from './API';
import CreateProduct from './CreateProduct';
import axios from 'axios';
import EditForm from './EditForm';
const sample=createContext()

function App() {
  const [show, setshow] = useState(true)
  const [product, setproduct] = useState([])

  // const [data, setdata] = useState({

  //   title:"",
  //   price:"",
  //   rating:"",
  //   availabilityStatus:""
  //  })
   const [edit, setedit] = useState("")
   const api="https://dummyjson.com/products"
   
   useEffect(() => {  
    axios.get(api).then((res)=>setproduct(res.data.products))
       },[] )
  return (
    <div>
    <sample.Provider value={{show,setshow,product, setproduct,api,edit,setedit}}>
    <BrowserRouter>
    {/* <API/> */}
    <Routes>
    <Route path="/" element={<API/>} />

    <Route path="/CreateProduct" element={<CreateProduct/>}/>
    <Route path="/EditForm" element={<EditForm/>}/>

    </Routes>
    </BrowserRouter>
    </sample.Provider>
    </div>
  );
}

export default App;
export {sample}
