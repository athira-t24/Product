import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { sample } from './App';
import { useContext, useEffect, useState } from 'react';
import API from './API';
import { Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function CreateProduct() {
  const {show,setshow,product, setproduct}=useContext(sample)
  const [data, setdata] = useState({

    title:"",
    price:"",
    rating:"",
    availabilityStatus:""
   })
  //   useEffect(() => {
  //   setshow(false) 
  //  }, [])
   const getInput=(e)=>{
    // console.log(e.target.value);
   setdata({...data,[e.target.name]:e.target.value});
}
   const Submit=(e)=>{
        e.preventDefault();
        const newArray=[...product,data]
         console.log(newArray);
         setproduct(newArray)
         toast.success("Product added successfully!");
         setTimeout(() => {
          navigate("/")
         }, 5000);

         
                         }
       const navigate=useNavigate()
      //  const Navigate=()=>{
      //    navigate('')
         
      //  }
            
  return (
    <div>
    <Form style={{width:"50%", margin:"auto", padding:"100px 10px", border:"1px dashed",
      //  backgroundColor:"black", color:"white"
       }} onSubmit={Submit}>
    
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text"  name="title" onChange={getInput} />
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Price</Form.Label>
        <Form.Control type="number"  name="price" onChange={getInput} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Rating</Form.Label>
        <Form.Control type="number"  name="rating" onChange={getInput} />
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Availability</Form.Label>
        <Form.Control type="text" name="availabilityStatus" onChange={getInput} />
      </Form.Group>
      <button>new</button>
      
      <Button variant="primary" type="submit"  >
        Submit
      </Button>
          </Form>
          <ToastContainer/>

    </div>
  );
}

export default CreateProduct;