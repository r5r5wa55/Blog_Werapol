import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import {HiUser,HiArrowRight} from "react-icons/hi"
import { Link, useLocation } from "react-router-dom";

export default function DashSidebar() {
    const location = useLocation();
    const [tab,setTab] = useState();
    useEffect(()=>{
        const urlPa = new URLSearchParams(location.search)
        const tabFromUrl = urlPa.get('tab')
        if(tabFromUrl){
            setTab(tabFromUrl)
        }
    },[location.search])
  return (
    
      <Sidebar  className="w-full md:w-64">
        <Sidebar.Items>
            <Sidebar.ItemGroup >
                <Link to='/dashboard?tab=profile'>
                    <Sidebar.Item 
                        active={tab==='profile'} 
                        icon={HiUser} 
                        label={'user'}
                        labelColor='dark'
                        as='div'
                    >
                        profile
                    </Sidebar.Item>
                </Link>
                 <Sidebar.Item 
                    className='cursor-pointer'
                    icon={HiArrowRight} 
                    lable={'user'}
                >
                        Sign Out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
   
        </Sidebar.Items>
      </Sidebar>

  
  )
}
