import { Button } from "flowbite-react";


export default function CallToAction() {
  return (
    <div>
        <div className="mx-auto border-2 rounded-tr-3xl rounded-bl-3xl lg:flex border-blue-400">
            <div className="text-center flex flex-1 flex-col items-center justify-center">
               <div className="mt-10 lg:m-0 font-bold text-xl">
                    Go to GitHub 
               </div>
               Check Project React 
               <div className="w-full">
                <Button gradientDuoTone='purpleToPink' className=" w-5/6 mx-auto mt-5">Go </Button>
               </div>
            </div>
            <div className="">
                <img 
                    src='https://github.githubassets.com/assets/social-2deb6d7d43e7.jpg' 
                    alt="" 
                    className="sm:max-w-xl mx-auto w-full p-8"
                />  
            </div>
        </div>
    </div>
  )
}
