import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import {HiUser,HiArrowRight} from "react-icons/hi"
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signoutSuccess } from "../redux/user/userSilce";
import { useDispatch } from "react-redux";

export default function DashSidebar() {
    const dispatch = useDispatch();
    const navigator = useNavigate();
    const location = useLocation();
    const [tab,setTab] = useState();
    useEffect(()=>{
        const urlPa = new URLSearchParams(location.search)
        const tabFromUrl = urlPa.get('tab')
        if(tabFromUrl){
            setTab(tabFromUrl)
        }
    },[location.search])
    const handleSignout = async () => {
        try {
          const res = await fetch('/api/user/signout', {
            method: 'POST',
          });
          const data = await res.json();
          if (!res.ok) {
            console.log(data.message);
          } else {
            navigator('/sign-in')
            window.location.reload(false)
            dispatch(signoutSuccess());
          }
        } catch (error) {
          console.log(error.message);
        }
      };
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
                    onClick={handleSignout}
                >
                        Sign Out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
   
        </Sidebar.Items>
      </Sidebar>

  
  )
}
