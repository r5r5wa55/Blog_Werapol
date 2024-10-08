import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link ,useNavigate } from "react-router-dom";
import OAuth from "../component/OAuth";


export default function SignUp() {
  const [formData ,setFormData]=useState({})
  const [redMessage,setRedMessage]=useState(null)
  const [loding,setLoading]=useState(false)
  const navigator = useNavigate();
  const handleChang=(e)=>{

    setFormData({...formData ,[e.target.id]:e.target.value.trim()})


  }
  const handleSubmit= async (e) =>{
    e.preventDefault();
  
    if(!formData.username || !formData.email|| ! formData.password){
      return setRedMessage("กรอกข้อความให้ครบ")
    }

    try {
        setLoading(true);
        setRedMessage(null)
        const res = await fetch('/api/auth/signup',{
        method:"POST",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(formData),

      });

      setLoading(false);
      const data = await res.json();
      if(res.ok){
        navigator('/sign-in')
      }
      if(data.success===false){
        setLoading(false);
        return setRedMessage(data.message)
        
      }

    } catch (error) {
      setLoading(false);
      return setRedMessage(error.message)
    }
  
  }
  return (
    <div>
      <div className=" min-h-screen mt-36 md:mt-auto">
        <div className=" flex flex-col md:flex-row md:items-center p-3 flex-1 gap-5 max-w-3xl m-auto md:h-svh">
          {/* ซ้าย */}
          <div className="flex-1">
            <Link to="/" className="self-center whitespace-nowrap text-3xl font-semibold dark:text-white ">
                <span className="text-white px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-700 rounded-lg">Blog</span>
                Werapol
            </Link>
            <p className="my-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quasi suscipit consequatur dolores tempore alias ratione provident laborum pariatur. Quaerat?</p>
          </div>
          {/* ขวา */}
          <div className="flex-1">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="">
                <Label value="Your Username"/>
                <TextInput placeholder="username" type="text" id='username' onChange={handleChang}/>
              </div>
              <div className="">
                <Label value="Your Email"/>
                <TextInput placeholder="name@company.com" type="email" id='email' onChange={handleChang}/>
              </div>
              <div className="">
                <Label value="Your Password"/>
                <TextInput placeholder="password" type="password" id='password' onChange={handleChang}/>
              </div>
              <Button gradientDuoTone="purpleToPink" type="submit" disabled={loding}>
                {
                  loding ?(
                   <>
                    <Spinner size='sm' className="mr-2"  />
                     <span>Loading...</span></>
                  ):('sign up')
                }
                </Button>
                <OAuth />
            </form>
            <div className="flex mt-2 ">
              <span>Have an account? 
                <Link className="text-blue-500 mx-2" to='/sign-in'>Sign in</Link>
              </span>
            </div>
            {
                redMessage && 
             (   <Alert className="mt-3" color='red'>
                  {redMessage}
                </Alert>)
              }
           
          </div>
        </div>
      </div>

    </div>
  )
}
