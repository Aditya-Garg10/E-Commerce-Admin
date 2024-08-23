import React, { useState } from 'react'
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons'
import { Input, Tooltip, Button, message } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import {useNavigate} from 'react-router-dom'
import { HOST } from '../pages/admin';

const login = () => {

  const [data, setdata] = useState({
    email : "",
    password : ""
  });

  console.log(data)

  const navigate = useNavigate();

  const changeHandler = (e) =>{    
    setdata({...data,[e.target.name]:e.target.value})
  }

  const handleLogin = async(e) =>{
    e.preventDefault();
    let responseData;
    await fetch(`${HOST}/admin/login`,{
      method: "POST",
      headers:{
        Accept : 'application/json',
        'Content-Type' : 'application/json',
      },
      body : JSON.stringify(data),
    }).then((resp)=> resp.json()).then((data)=>responseData=data)

    if(responseData.success){
      localStorage.setItem('auth-token',responseData.authtoken)
      message.success("LoggedIn Successfully")
      navigate("/")      
    }
    else{
      message.error(responseData.error)
    }
  }
  return (
    <div className='w-full h-screen p-0'>
      <div className="flex  items-center justify-center h-full w-full">
        <div className="flex justify-center gap-3 flex-col items-center h-4/5 rounded-3xl w-3/4 shadow-2xl border-1 border-gray-900">
          <h1 className='font-myFont  text-3xl font-semibold text-blue-900'>Admin Login</h1>
          <div className="flex md:flex-col md:h-[50vh]] items-center justify-center gap-3   flex-row h-[60vh] w-full px-10">
            <div className='w-1/2 md:w-full'>
              <dotlottie-player src="https://lottie.host/a7962071-4b70-4198-8777-ee73f4b300bb/EM3HML88SU.json" background="transparent" speed="1" loop autoplay></dotlottie-player>
            </div>
            <div className="flex px-20 md:w-full md:px-0 justify-center items-center w-1/2 gap-8 flex-col">
              <Input
                placeholder="Enter your username"
                prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                suffix={
                  <Tooltip title="Enter Admin Credentials Only">
                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                  </Tooltip>
                }
                value={data.email}
                onChange={changeHandler}
                name='email'
              />              
              <Input.Password
              className='px-5'
                placeholder="Password"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                value={data.password} onChange={changeHandler}
                name='password'
              />
              <Button onClick={handleLogin}>Submit</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default login
