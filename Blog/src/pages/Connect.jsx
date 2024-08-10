import { Button } from 'flowbite-react';
import React from 'react'
import { BiSolidContact } from "react-icons/bi";
import { MdEditLocationAlt } from "react-icons/md";
import { AiFillSchedule } from "react-icons/ai";
export default function Connect() {
    return (
        <div>
            <div className="w-full h-full bg-gray-900 dark:bg-slate-50 text-gray-50 dark:text-gray-800">
                <div className="max-w-7xl mx-auto  mb-20 flex flex-col items-center justify-start ">
                    <div className="md:text-6xl text-3xl mt-24 mb-5 font-bold  mx-10 md:mt-48 md:mb-3">Connect Werapol</div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto grid lg:grid-cols-3 grid-cols-1 ">

                <div className="col-span-2 m-10 lg:m-0">
                    <h1 className='text-3xl font-bold mb-5'>Have you any question?</h1>

                    <h1 className='mb-5'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint illum nisi voluptates sapiente odio minus iure quo dolor quidem fuga.</h1>

                    <div className="w-full grid grid-cols-1 lg:grid-cols-2  gap-2 mb-2 lg:mb-5 text-black  ">
                        <input type="text" name="" id="" className='p-4 w-full ' />
                        <input type="text" name="" id="" className='p-4 w-full ' />
                    </div>
                    <div className="w-full grid grid-cols-1 lg:grid-cols-2  gap-2 text-black ">
                        <input type="text" name="" id="" className='p-4 w-full ' />
                        <input type="text" name="" id="" className='p-4 w-full ' />
                    </div>
                    <textarea className="w-full lg:mt-5 mt-2  text-black" rows={7}>

                    </textarea>
                    <Button gradientDuoTone='purpleToBlue' outline className='mt-10 lg:my-10 w-full lg:w-auto '>Sunmit</Button>
                </div>


                <div className="flex items-center justify-center w-auto lg:w-full h-[400px] m-10 ">
                    <div className="h-auto w-full   bg-gray-900 dark:bg-slate-50 text-gray-50 dark:text-gray-800 px-5 py-8 rounded-xl">

                        <div className="grid grid-cols-2 lg:grid-cols-4 mb-5 ">
                            <div className="col-span-1 flex items-center">
                                <MdEditLocationAlt className='text-3xl' /><div className="font-extrabold text-3xl mb-2 inline  lg:hidden">Address</div>
                            </div>
                            <h2 className='lg:col-span-3 font-extrabold text-3xl mb-2 hidden lg:inline'>
                                Address
                            </h2>
                            <div className=""></div>
                            <p className='col-span-3'>Meesuk Apartment 19, Soi Yoo Yen, Lat
                                Phrao Subdistrict, Lat Phrao District,
                                Bangkok 10310
                            </p>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 mb-5 ">
                            <div className="col-span-1 flex items-center">
                                <AiFillSchedule className='text-3xl' /><div className="font-extrabold text-3xl mb-2 inline  lg:hidden">objective</div>
                            </div>
                            <h2 className='lg:col-span-3 font-extrabold text-3xl mb-2 hidden lg:inline'>
                                objective
                            </h2>
                            <div className=""></div>
                            <p className='col-span-3'>

                                <p className='col-span-3'>
                                    website developer
                                </p>
                                <div className=""></div>
                                <p className='col-span-3'>
                                    Frontend React
                                </p>
                                <div className=""></div>
                                <p className='col-span-3'>
                                    IT Support
                                </p>
                            </p>
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-4 mb-5 ">
                            <div className="col-span-1 flex items-center">
                         
                                <BiSolidContact className='text-3xl' /><div className="font-extrabold text-3xl mb-2 inline  lg:hidden">Connect</div>
                            </div>
                            <h2 className='lg:col-span-3 font-extrabold text-3xl mb-2 hidden lg:inline'>
                                Connect
                            </h2>
                            <div className=""></div>
                            <p className='col-span-3'>
                                <p className='col-span-3'>
                                    r5r5wa55@hotmail.com
                                </p>
                                <div className=""></div>
                                <p className='col-span-3'>
                                    064-451-0578
                                </p>
                                <div className=""></div>
                                <p className='col-span-3'>
                                    https://github.com/r5r5wa55
                                </p>
                            </p>
                        </div>




                    </div>


                </div>
            </div>

        </div>
    )
}
