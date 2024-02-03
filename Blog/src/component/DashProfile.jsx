import { Button, TextInput } from "flowbite-react";
import { useSelector } from "react-redux"


export default function DashProfile() {
  const {currenUser} = useSelector(state => state.user)
  console.log(currenUser.profilePicture);
  return (
    <div className="max-w-lg w-full mx-auto min-h-screen">
      <div className=" w-full h-full text-center">
        <h1 className="text-3xl font-bold mt-10">Profile</h1>
        <form className="flex flex-col gap-4 mt-4">
            <div className="w-60 h-80 flex-col mx-auto my-8">
              <input type="file" />
              <img className="rounded-full w-full border-amber-50 border-4" src={currenUser.profilePicture} alt="" />
            </div>  
              <TextInput 
                id='username'
                placeholder="user" 
                defaultValue={currenUser.username}
              />
              <TextInput 
                id='email'
                defaultValue={currenUser.email}
                placeholder="email"
              />
              <TextInput 
                id='password'
                type="password"
                placeholder="password"
                defaultValue='*********'
            /> 
            <Button gradientDuoTone='purpleToBlue' outline type="submit">UpLoad </Button>
        </form>
        <div className="flex justify-between mb-4">
          <span className="cursor-pointer text-red-600 dark:text-red-400">Delete Account</span>
          <span>Sign Out</span>
        </div>
      </div>
      
    </div>
  )
}
