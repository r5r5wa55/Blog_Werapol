
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link ,useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {signInStart,signInSuccess,signInFailure} from '../redux/user/userSilce'
import OAuth from "../component/OAuth";

export default function SignIn() {
  const [formData ,setFormData]=useState({})

  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispath=useDispatch();
  const navigator = useNavigate();
  const handleChang=(e)=>{

    setFormData({...formData ,[e.target.id]:e.target.value.trim()})


  }
  const handleSubmit= async (e) =>{
    e.preventDefault();
  
    if(!formData.email|| !formData.password){
      return dispath(signInFailure('กรอกข้อความให้ครบ'))
    }

    try {
        dispath(signInStart())
        const res = await fetch('/api/auth/signin',{
        method:"POST",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(formData),

      });

    
      const data = await res.json();
      if (data.success === false) {
        dispath(signInFailure(data.message));
      }


      

      if(res.ok){
        dispath(signInSuccess(data))
        navigator('/')
      }
  
    } catch (error) {
      dispath(signInFailure(error.message))
  
    }
  
  }
  return (
    <div>
      <div className=" min-h-screen mt-36 md:mt-auto">
        <div className=" flex flex-col md:flex-row md:items-center p-3 flex-1 gap-5 max-w-3xl m-auto md:h-svh">
          {/* ซ้าย */}
          <div className="flex-1">
            <Link to="/" className="self-center whitespace-nowrap text-3xl font-semibold dark:text-white ">
                <span className="text-white px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-700 rounded-lg">Bog</span>
                Werapol
            </Link>
            <p className="my-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quasi suscipit consequatur dolores tempore alias ratione provident laborum pariatur. Quaerat?</p>
          </div>
          {/* ขวา */}
          <div className="flex-1">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
    
              <div className="">
                <Label value="Your Email"/>
                <TextInput placeholder="name@company.com" type="email" id='email' onChange={handleChang}/>
              </div>
              <div className="">
                <Label value="Your Password"/>
                <TextInput placeholder="************" type="password" id='password' onChange={handleChang}/>
              </div>
              <Button gradientDuoTone="purpleToPink" type="submit" disabled={loading} >
                {
                  loading ?(
                   <>
                    <Spinner size='sm' className="mr-2"  />
                     <span>Loading...</span></>
                  ):('sign in')
                }
                </Button>
                <OAuth />
            </form>
            <div className="flex mt-2 ">
              <span>Dont Have an account? 
                <Link className="text-blue-500 mx-2" to='/sign-up'>Sign Up</Link>
              </span>
            </div>
            {
                errorMessage && 
             (   <Alert className="mt-3" color='red'>
                  {errorMessage}
                </Alert>)
              }
           
          </div>
        </div>
      </div>

    </div>
  )
}
