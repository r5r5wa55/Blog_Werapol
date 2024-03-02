/* eslint-disable react/prop-types */


import { Alert, Button, Textarea } from 'flowbite-react';
import { useEffect, useState } from 'react';
import {useSelector} from 'react-redux'
import { Link , useNavigate } from 'react-router-dom';
import Comment from './Comment';

export default function CommentSection({postId}) {
    const {currenUser} = useSelector((state)=>state.user)
    const [comment ,setcomment] = useState('');
    const [comments,setcomments] = useState([])
    const [commentError,setcommentError] = useState(null)
    const navigate = useNavigate()
    // console.log(comments);
        // console.log(comments);
    const hadleSubmit = async(e)=>{
        e.preventDefault();
        if(comment ===''){
            setcommentError('กรอกข้อมูล')
                    console.log(comment);
            return ;
        }
        // console.log(e.target[0].value);

    
        if(comment.length > 200){
            return ;
        }
        try {
            const res = await fetch(`/api/comment/create`,{
                method:'POST',
                headers:{
                    'content-Type':'application/json',
                },
                body:JSON.stringify({content:comment,postId:postId,userId:currenUser._id})
            })
            // eslint-disable-next-line no-unused-vars
            const data = await res.json();
            if(res.ok){
                setcommentError(null)
                setcomment('')
                setcomments([data,...comments])
            }
        } catch (error) {
            setcommentError(error.message)
            console.log(error);
        }
        
    }
    useEffect(()=>{
        
        const getComment =async()=>{

            try {
                const res = await fetch(`/api/comment/getPostComments/${postId}`)
                if(res.ok){
                    const data = await res.json();
                   
                    setcomments(data)
                }
            } catch (error) {
                console.log(error);
            }
        }
        getComment()
    },[postId])
    // console.log(comments);

    const handleLike = async(commentId)=> {
        
        try {
            if(!currenUser){
                navigate('/sign-in')
                return ;
            }
            const res = await fetch(`/api/comment/likeComment/${commentId}`,
                {method:'PUT',

            });
            if(res.ok){
          
                const data = await res.json();
                setcomments(comments.map((comment)=>
                        comment._id === commentId ? {
                            ...comment,
                            likes: data.likes,
                            numberOfLike:data.likes.length,
                        }:comment
                    )
                )
        }

        } catch (error) {
            console.log(error.message);
        }
    }

  return (
    <div className=''>
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
                <Alert className='m-3' color='red'>{commentError}</Alert> 
            }
        </form>
            
               <div className="max-w-4xl mx-auto m-5">
                    {comments === 0 ?(
                            <div>
                                No Comment Yet!
                            </div>
                        ):
                        (
                            <div className='flex gap-2'>
                                <span>Comment</span>
                                <div className="">{comments.length}</div>
                            </div>
                        )
                    }
               </div>
                <div className="max-w-3xl mx-auto">
                {
                    comments?.map((comments)=>(
                        <Comment className="" key={comments._id} comments={comments} onLike={handleLike}/>
                    
                    ))
                }
            </div>
    </div>
    
  )
}
