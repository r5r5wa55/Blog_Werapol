import { Button, Spinner } from 'flowbite-react';
import React, { useRef, useState } from 'react'
import { BiSolidContact } from "react-icons/bi";
import { MdEditLocationAlt } from "react-icons/md";
import { AiFillSchedule } from "react-icons/ai";
import emailjs from "@emailjs/browser"
export default function Connect() {
    const form = useRef()
    const [loading, setLoading] = useState(false)
    const [success,setSuccess] = useState(false)
    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm("service_ag2smic", "template_606ea3t", form.current, "a-kp4MqGB7bLXgMpD").then((result) => {
            setLoading(true)
            if (result.text === "OK") {
                setLoading(false)
                setSuccess(true)
            }
            console.log(result.text);

        }), (error) => {
            console.log(error.text);

        }


    }

    return (
        <div>
            <div className="w-full h-full bg-gray-900 dark:bg-slate-50 text-gray-50 dark:text-gray-800">
                <div className="max-w-7xl mx-auto  mb-20 flex flex-col items-center justify-start ">
                    <div className="md:text-6xl text-3xl mt-24 mb-5 font-bold  mx-10 md:mt-48 md:mb-3">Connect Werapol</div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto grid lg:grid-cols-3 grid-cols-1 mb-10">

                <form className="col-span-2 m-10 lg:m-0" onSubmit={sendEmail} ref={form}>
                    <h1 className='text-3xl font-bold mb-5'>Im want to get a chance</h1>

                    <h1 className='mb-5'>Even if you don't have experience working in the right field. But I would like to have the opportunity to work with everyone.</h1>

                    <div className="w-full grid gap-5 text-black ">
                        <input type="email" name="user_email" id="user_email" className='p-4 w-full ' placeholder='Email' />
                        <input type="text" name="user_name" id="user_name" className='p-4 w-full ' placeholder='Name' />
                    </div>

                    <textarea className="w-full mt-5   text-black" name="message" id="message" rows={7} placeholder="Send Message"></textarea>



                    <Button gradientDuoTone="purpleToPink" type="submit" className={ success ? "hidden":"w-full mt-3 mb-10"} >
                        {
                            loading ? (
                                <>
                                    <Spinner size='sm' className="mr-2" />
                                    <span>Loading...</span></>
                            ) : ('submit')
                        }
                    </Button>
                </form>





                <div className="flex items-center justify-center w-auto lg:w-full h-[400px] m-10  ">
                    <div className="h-auto w-full   bg-gray-900 dark:bg-slate-50 text-gray-50 dark:text-gray-800 px-5 py-8 rounded-xl">

                        <div className="grid grid-cols-2 lg:grid-cols-4 mb-5 ">
                            <div className="col-span-1 flex items-center">
                                <MdEditLocationAlt className='text-3xl' /><div className="font-extrabold text-3xl mb-2 inline  lg:hidden">Address</div>
                            </div>
                            <h2 className='lg:col-span-3 font-extrabold text-3xl mb-2 hidden lg:inline'>
                                Address
                            </h2>
                            <div className=""></div>
                            <div className='col-span-3'>Meesuk Apartment 19, Soi Yoo Yen, Lat
                                Phrao Subdistrict, Lat Phrao District,
                                Bangkok 10310
                            </div>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 mb-5 ">
                            <div className="col-span-1 flex items-center">
                                <AiFillSchedule className='text-3xl' /><div className="font-extrabold text-3xl mb-2 inline  lg:hidden">objective</div>
                            </div>
                            <h2 className='lg:col-span-3 font-extrabold text-3xl mb-2 hidden lg:inline'>
                                objective
                            </h2>
                            <div className=""></div>
                            <div className='col-span-3'>

                                <div className='col-span-3'>
                                    website developer
                                </div>
                                <div className=""></div>
                                <div className='col-span-3'>
                                    Frontend React
                                </div>
                                <div className=""></div>
                                <div className='col-span-3'>
                                    IT Support
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-4 mb-5 ">
                            <div className="col-span-1 flex items-center">

                                <BiSolidContact className='text-3xl' /><div className="font-extrabold text-3xl mb-2 inline  lg:hidden">Connect</div>
                            </div>
                            <h2 className='lg:col-span-3 font-extrabold text-3xl mb-2 hidden lg:inline'>
                                Connect
                            </h2>
                            <div className=""></div>
                            <div className='col-span-3'>
                                <div className='col-span-3'>
                                    r5r5wa55@hotmail.com
                                </div>
                                <div className=""></div>
                                <div className='col-span-3'>
                                    064-451-0578
                                </div>
                                <div className=""></div>
                                <div className='col-span-3'>
                                    https://github.com/r5r5wa55
                                </div>
                            </div>
                        </div>




                    </div>


                </div>
            </div>

        </div>
    )
}
