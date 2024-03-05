import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import {HiUser,HiArrowRight, HiDocumentText, HiUserGroup, HiAnnotation, HiChartPie } from "react-icons/hi"
import { Link, useLocation } from "react-router-dom";
import { signoutSuccess } from "../redux/user/userSilce";
import { useDispatch, useSelector } from "react-redux";




export default function DashSidebar() {
    const dispatch = useDispatch();
  
    const location = useLocation();
    const [tab,setTab] = useState();
    const {currenUser}= useSelector((state)=>state.user)
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
       
            dispatch(signoutSuccess());
          }
        } catch (error) {
          console.log(error.message);
        }
      };
  return (
    
      <Sidebar  className="w-full md:w-64 ">
        <Sidebar.Items>
            <Sidebar.ItemGroup className="flex flex-col gap-1">
                    {
                      currenUser.isAdmin && 
                      (
                        <Link to='/dashboard?tab=dash'>
                          <Sidebar.Item 
                              active={tab==='dash'} 
                              icon={HiChartPie}   
                              labelColor='dark'
                              as='div'
                          >
                              DashBord
                          </Sidebar.Item>
                        </Link> 
                      )
                    }
                <Link to='/dashboard?tab=profile'>
                    <Sidebar.Item 
                        active={tab==='profile'} 
                        icon={HiUser} 
                        label={currenUser.isAdmin ? 'Admin':'User'}
                        labelColor='dark'
                        as='div'
                    >
                        Profile
                    </Sidebar.Item>
                  </Link>
                 

                  {
                    currenUser.isAdmin && 
                    (
                      <Link to='/dashboard?tab=posts'>
                      <Sidebar.Item 
                          active={tab==='posts'} 
                          icon={HiDocumentText}   
                          labelColor='dark'
                          as='div'
                      >
                          Posts
                      </Sidebar.Item>
                  </Link> 
                    )
                  }
                  
                  {
                    currenUser.isAdmin && 
                    (
                      <Link to='/dashboard?tab=users'>
                      <Sidebar.Item 
                          active={tab==='users'} 
                          icon={HiUserGroup}   
                          labelColor='dark'
                          as='div'
                      >
                          User
                      </Sidebar.Item>
                  </Link> 
                    )
                  }
                 
            
                 {
                    currenUser.isAdmin && 
                    (
                      <Link to='/dashboard?tab=comment'>
                      <Sidebar.Item 
                          active={tab==='comment'} 
                          icon={HiAnnotation}   
                          labelColor='dark'
                          as='div'
                      >
                          Comment
                      </Sidebar.Item>
                  </Link> 
                    )
                  }
                  
                 

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
