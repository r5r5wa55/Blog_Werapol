

import { Alert, Button, Textarea } from 'flowbite-react';
import { useState } from 'react';
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom';

export default function CommentSection() {
    const {currenUser} = useSelector((state)=>state.user)
    const [comment ,setcomment] = useState('');
    const [commentError,setcommentError] = useState(null)

    // console.log(comment);
    const hadleSubmit = async(e)=>{
        // console.log(e);
        // console.log(e.target[0].value);
        e.preventDefault();
    
        if(comment.length > 200){
            return ;
        }
        try {
            const res = await fetch(`/api/comment/create`,{
                method:'POST',
                headers:{
                    'content-Type':'application/json',
                },
                body:JSON.stringify({content:comment,userId:currenUser._id})
            })
            // eslint-disable-next-line no-unused-vars
            const data = await res.json();
            if(res.ok){
                setcommentError(null)
                setcomment('')
            }
        } catch (error) {
            setcommentError(error.message)
            console.log(error);
        }
        
    }
  return (
    <div>
        {currenUser ? 
            (
                <div className="w-full sm:max-w-4xl mx-auto">
                    <div className="flex gap-2 p-5 items-center justify-start">
                    <p>Sign in as :</p>
                    <img src={currenUser.profilePicture} className='h-8 w-8 rounded-full object-cover border-2 dark:border-white ' alt="" />
                    <Link to={'/dashboard?tab=profile'} className='text-blue-400'>@{currenUser.username}</Link>
                </div>
                </div>
                
            ):(
                <div className="w-full sm:max-w-4xl mx-auto mb-5">
                    <div className="flex gap-3">
                        <span className='text-teal-400'>You must be in to comment</span>
                        <Link to={'/sign-in'}>
                        <div className="dark:text-sky-600 text-blue-700">Sign in</div>
                        </Link>
                    </div>
                </div>
            )
        }
        <form className="w-full border-3 border rounded-xl sm:max-w-4xl mx-auto"  onSubmit={hadleSubmit}>
            <div className="p-5">
                <Textarea 
                    placeholder='Add a Comment....'
                    rows='3'
                    maxLength='200'
                    onChange={(e)=>(setcomment(e.target.value))}
                    value={comment}
                />
                <div className="pt-5 flex items-center justify-between">
                    <span className='text-sm'>{(200 - comment?.length)} characters remaining</span>
                    <Button gradientDuoTone='purpleToBlue' outline type='submit' >Submit</Button>  
                </div>
            </div>
            {commentError &&
                <Alert className='m-3' color='red'>we</Alert> 
            }
        </form>
       
    </div>
    
  )
}
