
// eslint-disable-next-line react/prop-types
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import moment from 'moment'


export default function Comment({comments}) {
  
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

    <div className="flex items-center p-4">
        <div className="flex-shrink-0 mr-3">
            <img src={user.profilePicture} alt="" className="w-10 h-10 rounded-full" />
        </div>
        <div className="flex-1">
            <div className="flex items-center mb-1">
                <span className="font-bold mr-2  truncate ">{user ? `@${user.username}`:`anonymous user`}</span>
                <span className="text-xs">{moment(comments.createdAt).fromNow()}</span>
            </div>
            <div className="max-w-xl">
                <p className="truncate">{comments.content}</p>
            </div>
        </div>
    </div>
   
  )
}
