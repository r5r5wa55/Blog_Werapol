import { Button } from "flowbite-react";


export default function CallToAction() {
  return (

        <div className=" flex flex-col sm:flex-row p-3 border  w-fullborder-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
            <div className="flex-1 justify-center flex flex-col w-full">
               <div className="mt-10 lg:m-0 font-bold text-xl">
                    Go to GitHub 
               </div>
               Check Project React 
               <div className="w-full">
                <Button gradientDuoTone='purpleToPink' className=" sm:w-full mx-auto mt-5 w-5/6">Go </Button>
               </div>
            </div>
            <div className="flex-1 p-7">
                <img 
                    src='https://github.githubassets.com/assets/social-2deb6d7d43e7.jpg' 
                    alt="" 
                    
                />  
            </div>
        </div>

  )
}
