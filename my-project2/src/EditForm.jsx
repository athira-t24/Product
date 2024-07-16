import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { sample } from './App';
import { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useState } from 'react';

function EditForm() {
  const {product,setproduct ,edit, setedit}=useContext(sample)
  const [data, setdata] = useState({

    title:edit.title,
    price:edit.price,
    rating:edit.rating,
    availabilityStatus:edit.availabilityStatus
   })
  
   const getInput=(e)=>{
       setdata({...data,[e.target.name]:e.target.value});
       console.log(data);
}
   const Submit=(e)=>{
        e.preventDefault();
         
        const newArray=[...product]
        if (edit) {
          const index = product.findIndex(item => item.id === edit.id);
          if (index !== -1) {
            newArray[index] = { ...edit, ...data };
          }
        } else {
          newArray.push(data);
        }
         console.log(newArray);
         setproduct(newArray)
         toast("Updated successfully")
         setTimeout(() => {
          navigate("/")
         }, 5000);
        //  navigate("/")
        //  console.log(product.title);

       }
       const navigate=useNavigate()
      
  return (
    <div>
       {edit && (

    <Form style={{width:"50%", margin:"auto", padding:"100px 10px",border:"1px dashed"}} onSubmit={Submit}>
    
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text"   defaultValue={edit.title||data.title} name="title" onChange={getInput} />
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Price</Form.Label>
        <Form.Control type="text"   defaultValue={edit.price||data.price} name="price" onChange={getInput} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Rating</Form.Label>
        <Form.Control type="text"   defaultValue={edit.rating||data.rating} name="rating" onChange={getInput} />
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Availability</Form.Label>
        <Form.Control type="text"  defaultValue={edit.availabilityStatus||data.availabilityStatus} name="availabilityStatus" onChange={getInput} />
      </Form.Group>
      
      <Button variant="primary" type="submit" >
        Submit
      </Button>
    </Form>
    
       )}
       <ToastContainer/>
    </div>
  );
}

export default EditForm;