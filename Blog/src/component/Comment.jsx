
// eslint-disable-next-line react/prop-types
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import moment from 'moment'

import {FaThumbsUp} from 'react-icons/fa'
import { useSelector } from "react-redux";

export default function Comment({comments,onLike}) {
    // console.log(comments);
    const  {currenUser} = useSelector((state)=>state.user)
    const [user,setUser] = useState({});
    // console.log(user);
    useEffect(()=>{
        const getUser = async()=>{
            try {
                const res = await fetch(`/api/user/${comments.userId}`);
                const data = await res.json()
                if(res.ok){
                    setUser(data)
                }
            } catch (error) {
                console.log(error);
            }
        }
        getUser();
    },[comments])
    // console.log(user);
  return (

    <div className="flex  p-4 border-b dark:border-gray-600 text-sm">
        <div className="flex-shrink-0 mr-3 flex-start">
            <img src={user.profilePicture} alt="" className="w-10 h-10 rounded-full" />
        </div>
        <div className="flex-1">
            <div className="flex items-center mb-1">
                <span className="font-bold mr-2  truncate ">{user ? `@${user.username}`:`anonymous user`}</span>
                <span className="text-xs">{moment(comments.createdAt).fromNow()}</span>
            </div>
            <div className="max-w-xl mb-3">
                <p className="truncate">{comments.content}</p>
            </div>
            <div className="flex items-center dark:border-gray-700 max-w-fit gap-2">
                <button 
                    type="button" 
                    className={`text-gray-400 hover:text-blue-500 h-full text-sm ${currenUser && comments.likes.includes(currenUser._id) && '!text-blue-500'}`} 

                    onClick={()=>onLike(comments._id) }
                >   
                    <FaThumbsUp className="text-sm"/>
                </button>   
                <p className="text-sm h-5 m-0">
                    {
                        comments.numberOfLike > 0 &&  comments.numberOfLike + " " + (comments.numberOfLike === 1 ? 'like':'likes')
                    }
                </p>
            </div>
           
        </div>
    </div>
   
  )
}
