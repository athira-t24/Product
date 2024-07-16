import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { Button, Modal } from 'antd';
import { BsEyeFill, BsPencilSquare, BsFillTrashFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import CreateProduct from './CreateProduct';
import { sample } from './App';
import { toast, ToastContainer } from 'react-toastify';



const API = () => {
  const { product, setproduct, edit, setedit } = useContext(sample);
  const [view, setview] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [rows, setRows] = useState({});
  const [search, setSearch] = useState('');
  const [filter, setfilter] = useState([])

  const navigate = useNavigate();

  const showModal = (obj) => {
    setIsModalOpen(true);
    setview(obj);
    
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setDeleteModal(false);
  };

  const navigateToCreateProduct = () => {
    navigate('/CreateProduct');
  };

  const editForm = (obj) => {
    setedit(obj);
    navigate('/EditForm');
  };

  const handleDelete = () => {
    const updatedProducts = product.filter((row) => row.id !== rows?.id);
    setproduct(updatedProducts);
    setDeleteModal(false);
    toast("Product deleted!");
         
  };

  const showDelete = (item) => {
    setDeleteModal(true);
    setRows(item);
      };
  useEffect(() => {
    setfilter(product)
  }, [product])
  
  const searchFun = () => {
    const filteredata = product.filter((obj) =>
      (obj.title && obj.title.toLowerCase().includes(search.toLowerCase())) ||
      (obj.rating && obj.rating.toString().includes(search)) ||
      (obj.price && obj.price.toString().includes(search)) ||
      (obj.availabilityStatus && obj.availabilityStatus.toLowerCase().includes(search.toLowerCase()))
    );
    setfilter(filteredata);
     };

  

  return (
    <div>
       Search{' '}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)

          } 
          style={{ marginLeft: '10px' }}
        />
        <Button type="primary"  onClick={searchFun
}>
          Search
        </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Rating</th>
            <th>Availability</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filter.map((obj) => (
            <tr key={obj.id}>
              <td>{obj.title}</td>
              <td>{obj.price}</td>
              <td>{obj.rating}</td>
              <td>{obj.availabilityStatus}</td>
              <td>
                <BsEyeFill onClick={() => showModal(obj)} /> &nbsp;&nbsp;
                &nbsp;                
                <BsPencilSquare onClick={() => editForm(obj)} /> &nbsp;&nbsp;&nbsp;
                <BsFillTrashFill onClick={() => showDelete(obj)} />&nbsp;&nbsp;&nbsp;
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div style={{ width: '200px', marginLeft: 'auto' }}>
        <Button style={{ width: '150px', marginLeft: 'auto' }} onClick={navigateToCreateProduct}>
          Create Product
        </Button>
      </div>

      <Modal title="Details" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div>
          <img src={view.images} alt="" style={{ width: '200px', height: '200px' }} />
          <br />
          Title: {view.title}<br />
          Availability Status: {view.availabilityStatus}<br />
          Price: {view.price}<br />
          Rating: {view.rating}
        </div>
      </Modal>

      <Modal title="Delete" visible={deleteModal} footer={[
        <Button key="cancel" onClick={handleCancel}>Cancel</Button>,
        <Button key="delete" type="primary" danger onClick={handleDelete}>Delete</Button>
      ]}>
         
        <div>
          <p>Are You Sure You Want To Delete..?</p>
          
        </div>
      </Modal>
      <ToastContainer/>
    </div>
  );
};

export default API;
