import React from 'react'
import "./addProduct.css"
import { useState } from 'react'
import {  message } from 'antd'
import Navbar from '../Navbar'
import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Space, Typography } from 'antd';
import { HOST } from '../../pages/admin'

const addProduct = () => {

  const [form] = Form.useForm()

  const [files, setFiles] = useState([])

  const [credentials, setCredentials] = useState({
    name: "",
    old_price: "",
    new_price: "",
    category: "",
    image: "",
    description: "",
    details: ""
  })

  const changeHandler = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  const imageHandler = (e) => {
    setFiles(e.target.files)
  }

  
  const [Tags, setTags] = useState("");
  

  const finalTags = Tags.split(',')
  const handleSubmit = async () => {

    let formData = new FormData();
    console.log(files)
    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i])
      
    }
    for (let i = 0; i < finalTags.length; i++) {
      formData.append('tags', finalTags[i])
    }

    formData.append("name", credentials.name)
    formData.append("category", credentials.category ) 
    formData.append("new_price", credentials.new_price)
    formData.append("old_price", credentials.old_price)
    formData.append("details", credentials.details)
    formData.append("description", credentials.description)


    for(let [key,value] of 
      formData.entries()
    ){
      console.log(`${key} : ${value}`);
    }

    try {
      
   const response =  await fetch(`${HOST}/upload`, {
    method: "POST",
    headers: {
      Accept: 'multipart/form-data',

    },
    body: formData
  })

  const data = await response.json();
  
  if(data.success){
    setCredentials({
      name: "",
      old_price: "",
      new_price: "",
      category: "",
      image: "",
      description: "",
      details: "",    
    })
    message.success(data.message)
  }
  else{
    message.error(data.message)
  }

    } catch (error) {
      message.error(error.message)
    }

  }

  


  return (
    <>     
    <Navbar/>
      <div className='h-full w-full  justify-center   flex  mt-5 mb-5'>
        <Form
        className='flex  w-full px-20    gap-10 '
          onSubmit={handleSubmit}
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 18,
          }}
          
          form={form}
          name="dynamic_form_complex"        
          autoComplete="off"
          initialValues={{
            items: [{}],
          }}
        >
          <Form.List name="items">
            {(fields, { add, remove }) => (
              <div
                style={{
                  display: 'flex',
                  rowGap: 16,
                  flexDirection: 'column',
                  width:"50%",
                  fontWeight : "500",
                  borderRadius : "0",
                  
                }}
              >
                {fields.map((field) => (
                  <Card
                    size="small"
                    title={`Product `}
                    key={field.key}
                    extra={
                      <CloseOutlined
                        onClick={() => {
                          remove(field.name);
                        }}
                      />
                    }
                  >
                    <Form.Item label="Name" name={[field.name, 'name']}>
                    <Input value={credentials.name} onChange={changeHandler} type="text" className="form-control" name='name' id="formGroupExampleInput" placeholder="Type here" />
                    </Form.Item>
                    <Form.Item label="Old Price" name={[field.name, 'old_price']}>
                    <Input value={credentials.old_price} onChange={changeHandler} type="text" name='old_price' className="form-control mt-1" placeholder="Type here" aria-label="First name" />
                    </Form.Item>
                    <Form.Item label="New Price" name={[field.name, 'new_price']}>
                    <Input value={credentials.new_price} onChange={changeHandler} type="text" name='new_price' className="form-control mt-1" placeholder="Type here" aria-label="Last name" />
                    </Form.Item>

                    <Form.Item label="Details" name={[field.name, 'details']}>
                      <Input value={credentials.details} onChange={changeHandler} type="text" name='details' className="form-control mt-1" placeholder="Type here" aria-label="Last name" />
                    </Form.Item>

                    <Form.Item label="Description" name={[field.name, 'description']}>
                    <Input value={credentials.description} onChange={changeHandler} type="text" name='description' className="form-control mt-1" placeholder="Type here" aria-label="Last name" />
                    </Form.Item>

                    <Form.Item label="category" name={[field.name, 'category']}>
                      <select value={credentials.category} defaultValue={"men"} onChange={changeHandler} name='category' style={{ width: "100px" }} className="form-select container form-select-sm" aria-label="Small select example">
                        <option value="women">Women</option>
                        <option value="men">Men</option>
                        <option value="kid">Kid</option>
                      </select>
                    </Form.Item>

                    <Form.Item label="Tags" name={[field.name, 'tags']}>
                    <Input value={Tags} onChange={(e)=>setTags(e.target.value)} type="text" name='tags' className="form-control mt-1" placeholder="Type here" aria-label="Last name" />
                    </Form.Item>

                    <Form.Item label="Images" name={[field.name, 'images']}>
                    <Input value={credentials.image} onChange={imageHandler} type="file" multiple name='images' className="form-control mt-1" placeholder="Type here" aria-label="Last name" />
                    </Form.Item>

                    <Form.Item >
                    <Button type='submit' className='bg-primary px-5 py-2 text-white rounded-none ' onClick={()=>handleSubmit()}>Submit</Button>
                    </Form.Item>

                    {/* Nest Form.List */}                    
                  </Card>
                ))}
               
              </div>
            )}
          </Form.List>

          <Form.Item  className='w-1/2' shouldUpdate>
            {() => (
              <Typography>
                <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
              </Typography>
            )}
          </Form.Item>

        </Form>
      </div>
    </>

  )
}

export default addProduct
