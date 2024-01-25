import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";


export default function SignUp() {
  return (
    <div>
      <div className="mt-20 min-h-screen">
        <div className=" flex flex-col md:flex-row md:items-center p-3 flex-1 gap-5 max-w-3xl mx-auto ">
          {/* ซ้าย */}
          <div className="flex-1">
            <Link to="/" className="self-center whitespace-nowrap text-3xl font-semibold dark:text-white ">
                <span className="text-white px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-700 rounded-lg">Affiliate VvE</span>
                Blog
            </Link>
            <p className="my-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quasi suscipit consequatur dolores tempore alias ratione provident laborum pariatur. Quaerat?</p>
          </div>
          {/* ขวา */}
          <div className="flex-1">
            <form className="flex flex-col gap-4">
              <div className="">
                <Label value="Your Username"/>
                <TextInput placeholder="username" type="text" id='username'/>
              </div>
              <div className="">
                <Label value="Your Email"/>
                <TextInput placeholder="name@company.com" type="text" id='email'/>
              </div>
              <div className="">
                <Label value="Your Password"/>
                <TextInput placeholder="password" type="password" id='password'/>
              </div>
              <Button gradientDuoTone="purpleToPink">Submit</Button>
            </form>
            <div className="flex mt-2 ">
              <span>Have an account? 
                <Link className="text-blue-500 mx-2" to='/sign-in'>Sign in</Link>
              </span>
            </div>
           
          </div>
        </div>
      </div>

    </div>
  )
}
