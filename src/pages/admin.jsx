import React, { useEffect, useState } from 'react'

import "./common.css"
import { Form, Input, Modal, Tabs, message } from 'antd'
import { Carousel } from 'antd';
import { IoTrash } from 'react-icons/io5'
import { MdEdit } from 'react-icons/md'
import TextArea from 'antd/es/input/TextArea';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';



export const HOST = "https://e-commerce-backend-ssjr.onrender.com"
const admin = (props) => {
  const navigate = useNavigate()
  

  useEffect(()=>{
    
  if(!localStorage.getItem("auth-token")){
    navigate("/admin/login")
  }
  })


  const data = props.data
  

  const [showAddEditModal, setShowAddEditModal] = React.useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = React.useState(null);
  const [type, setType] = React.useState("add");

  const [tagchange, settagchange] = useState(false);
  const [imageChange, setimageChange] = useState(false);
    
    
  const onFinish = async (values,initialValues) => {
    
   
    try {
      if(tagchange){
        let tempTags = values.tags.split(",") 
      values.tags = tempTags 
      }
      if(imageChange){
        let tempImages = values.image.split(",") 
      values.image = tempImages  
      }             
      let response;
      if (selectedItemForEdit) {
        response = await fetch(`${HOST}/EditProduct`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ _id: selectedItemForEdit._id, ...values }),
        });
      } else {
        
      }
      
      const data = await response.json();
      
      if (data.success) {
        setShowAddEditModal(false);        
        message.success(data.message);
      } else {
        message.error(data.message);
      }
    } catch (error) {      
      message.error(error.message);
    }
  };

  
  const removeProduct = async(id) =>{
    await fetch(`${HOST}/delProduct`,{
      method:"DELETE",
      headers:{
        Accept : "application/json",
        'Content-Type' : "application/json",        
      },
      body: JSON.stringify({id: id})

      
    })
    await fetchData()
  }


  // if(selectedItemForEdit !== null){
  //   console.log(selectedItemForEdit.image);
  //   console.log(selectedItemForEdit.tags);
  // }

  const [category, setcategory] = useState("men");
  
  
const items = [
  {
    key: '1',
    label: 'Mens',
    children: <div className="flex flex-col h-full">
      <div className="grid h-auto px-20 sm:px-8 sm:grid-cols-1 lg:grid-cols-3  md:grid-cols-2 grid-cols-3 gap-5 mt-5">
    {data.map((proj,i) => {
      if("men" === proj.category){
        return <div key={i} className="border p-5 hover:shadow-2xl hover:cursor-pointer rounded-3xl border-gray-200 gap-5 flex flex-col">
        <h1 className="text-primary text-xl mb-2 text-center font-bold">{proj.name}</h1>
        <hr />              
        <Carousel className='px-20 sm:px-0 md:px-10 h-60 object-fill  rounded-3xl' autoplay>
          <div className='w-70 h-72 '>
            <h3 className='h-72 w-auto text-end  bg-no-repeat lg:bg-cover bg-contain' style={{ backgroundImage: `url(${proj.image[0]})` }}></h3>
          </div>
          <div>
            <h3 className='h-60 w-auto text-end  bg-no-repeat lg:bg-cover bg-contain' style={{ backgroundImage: `url(${proj.image[1]})` }}></h3>
          </div>
          <div>
            <h3 className='h-60 w-auto text-end  bg-no-repeat lg:bg-cover bg-contain' style={{ backgroundImage: `url(${proj.image[2]})` }}></h3>
          </div>
          <div>
            <h3 className='h-60 w-auto text-end bg-no-repeat lg:bg-cover  bg-contain' style={{ backgroundImage: `url(${proj.image[3]})` }}></h3>
          </div>
        </Carousel>
        <h1>{proj.description}</h1>
        <div className="flex justify-end gap-5 mt-5">
          <button className=" text-2xl text-red-500" onClick={() => removeProduct(proj.id)}>
            <IoTrash />
          </button>
          <button className="text-primary text-2xl px-5 py-2" onClick={() => {
            setSelectedItemForEdit(proj)
            setShowAddEditModal(true)
            setType("edit")
          }}><MdEdit /></button>
        </div>
      </div>
      }            
    })}
    
  </div>
  
    </div> ,
  },
  {
    key: '2',
    label: 'Womens',
    children:  <div className="grid h-[40vh] px-20 sm:px-8 sm:grid-cols-1 lg:grid-cols-3  md:grid-cols-2 grid-cols-3 gap-5 mt-5">
    {data.map((proj,i) => {
      if("women" === proj.category){
        return <div key={i} className="shadow border p-5 rounded-3xl border-gray-200 gap-5 flex flex-col">
        <h1 className="text-primary text-xl mb-2 text-center font-bold">{proj.name}</h1>
        <hr />              
        <Carousel className='px-20 sm:px-0 md:px-10 h-60 object-fill  rounded-3xl' autoplay>
          <div className='w-70 h-72 '>
            <h3 className='h-72 w-auto text-end  bg-no-repeat lg:bg-cover bg-contain' style={{ backgroundImage: `url(${proj.image[0]})` }}></h3>
          </div>
          <div>
            <h3 className='h-60 w-auto text-end  bg-no-repeat lg:bg-cover bg-contain' style={{ backgroundImage: `url(${proj.image[1]})` }}></h3>
          </div>
          <div>
            <h3 className='h-60 w-auto text-end  bg-no-repeat lg:bg-cover bg-contain' style={{ backgroundImage: `url(${proj.image[2]})` }}></h3>
          </div>
          <div >
            <h3 className={`h-60 w-auto text-end bg-none  bg-no-repeat lg:bg-cover bg-contain`} style={{ backgroundImage: `url(${proj.image[3] ? proj.image[3]:proj.image[2]})` }}></h3>
          </div>
        </Carousel>
        <h1>{proj.description}</h1>
        <div className="flex justify-end gap-5 mt-5">
          <button className=" text-2xl text-red-500" onClick={() => removeProduct(proj.id)}>
            <IoTrash />
          </button>
          <button className="text-primary text-2xl px-5 py-2" onClick={() => {
            setSelectedItemForEdit(proj)
            setShowAddEditModal(true)
            setType("edit")
          }}><MdEdit /></button>
        </div>
      </div>
      }            
    })}
    
  </div>,
  },
  {
    key: '3',
    label: 'Kids',
    children:  <div className="grid  sm:px-8 sm:grid-cols-1 lg:grid-cols-3  md:grid-cols-2 grid-cols-3 gap-5 mt-5">
    {data.map((proj,i) => {
      if("kid" === proj.category){
        return <div key={i} className="shadow border p-5 rounded-3xl border-gray-200 gap-5 flex flex-col">
        <h1 className="text-primary text-xl mb-2 text-center font-bold">{proj.name}</h1>
        <hr />              
        <Carousel className='px-20 sm:px-0 md:px-10 h-60 object-fill  rounded-3xl' autoplay>
          <div className='w-70 h-72 '>
            <h3 className='h-72 w-auto text-end  bg-no-repeat lg:bg-cover bg-contain' style={{ backgroundImage: `url(${proj.image[0]})` }}></h3>
          </div>
          <div>
            <h3 className='h-60 w-auto text-end  bg-no-repeat lg:bg-cover bg-contain' style={{ backgroundImage: `url(${proj.image[1]})` }}></h3>
          </div>
          <div>
            <h3 className='h-60 w-auto text-end  bg-no-repeat lg:bg-cover bg-contain' style={{ backgroundImage: `url(${proj.image[2]})` }}></h3>
          </div>
          <div className={`${proj.image[3] === true ? "flex":"hidden"}`}>
            <h3 className={`h-60 w-auto text-end bg-no-repeat lg:bg-cover  bg-contain`} style={{ backgroundImage: `url(${proj.image[3]})` }}></h3>
          </div>
        </Carousel>
        <h1>{proj.description}</h1>
        <div className="flex justify-end gap-5 mt-5">
          <button className=" text-2xl text-red-500" onClick={() => removeProduct(proj.id)}>
            <IoTrash />
          </button>
          <button className="text-primary text-2xl px-5 py-2" onClick={() => {
            setSelectedItemForEdit(proj)
            setShowAddEditModal(true)
            setType("edit")
          }}><MdEdit /></button>
        </div>
      </div>
      }            
    })}
    
  </div>,
  },
];
  return (
    <>
    <Navbar/>      
    <div className='w-full  h-screen'>
    <Tabs className='p-5 items-center' size='medium'  defaultActiveKey="1" items={items}  />
    
        {(type === "add" ||
          selectedItemForEdit) &&
          <Modal
            open={showAddEditModal}
            title={selectedItemForEdit ? "Edit Project" : "Add Project"}
            onCancel={() => {
              setShowAddEditModal(false);
              setSelectedItemForEdit(null)
            }}
            footer={null}
          >
            <Form layout="vertical" onFinish={onFinish} initialValues={{...selectedItemForEdit}}
            >
              <Form.Item name="name">
                <Input className="adminInput w-full" placeholder="Title" />
              </Form.Item>
              <Form.Item name="id">
                <Input className="adminInput w-full" placeholder="ID" />
              </Form.Item>
              <Form.Item name="details">
                <Input className="adminInput w-full" placeholder="details" />
              </Form.Item>
              <Form.Item name="description">
                <TextArea className="adminInput w-full" placeholder="Description" />
              </Form.Item>
              <Form.Item name="tags">
                <Input
                onChange={()=>settagchange(true)}
                 className="adminInput w-full" placeholder="tags" />
              </Form.Item>
              <Form.Item name="new_price">
                <Input className="adminInput w-full" placeholder="New Price" />
              </Form.Item>
              <Form.Item name="old_price">
                <Input className="adminInput w-full" placeholder="Old Price" />
              </Form.Item>
              <Form.Item name="image">
                <Input
                onChange={()=>setimageChange(true)}
                  className="adminInput w-full"
                  placeholder="Image"
                />
              </Form.Item>
              <Form.Item name="category">
                <Input className="adminInput w-full" placeholder="category" type="text" />
              </Form.Item>
              <div className="flex justify-end">
                <button className="border-primary bg-white px-5 py-2 text-primary" onClick={() =>  setShowAddEditModal(false) }>
                  Cancel
                </button>
                <button type="submit" className="bg-primary px-5 py-2 text-white">
                  {selectedItemForEdit ? "Update" : "Add"}
                </button>
              </div>
            </Form>
          </Modal>
        }  
        <Footer/>
      </div>
        
    
    </>
  )
}

export default admin
