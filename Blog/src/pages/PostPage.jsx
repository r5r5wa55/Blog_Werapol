import { Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import CallToAction from "../component/CallToAction";


export default function PostPage() {

    const {postSlug} = useParams();
    const [load,setLoading] = useState(true);
    // eslint-disable-next-line no-unused-vars
    const [error,setError] = useState(false);
    const [post,setPost] = useState(null)
    // console.log(post);
    useEffect(()=>{
        const fetchPost = async()=>{
            try {
                setLoading(true)
                const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
                const data = await res.json();
                // console.log(data);
                if(!res.ok){
                    setError(true)
                    setLoading(false)
                    return ;
                }
                if(res.ok){
                    setPost(data.posts[0]);
                    setLoading(false);
                    setError(false)
                }
            } catch (error) {
                setError(true)
                setLoading(false)
                console.log(error);
            }
        }
        fetchPost()
        
        
    },[postSlug])
    // console.log(error);
    if(load) return <div className="flex items-center justify-center min-h-screen"><Spinner  className="w-60 h-40"/></div>;
  return (
    <main>
        <div className="w-full min-h-screen">
            <div className="p-5 mx-auto max-w-5xl mt-10 ">
                <div className="text-3xl font-bold text-center">
                {post && post.title}
                </div>
                    
         
                <div className="p-5 mx-auto max-w-6xl my-3 text-center">
                        {post && post.category}
                </div>
                <img src={post.image} alt="" className="mx-auto sm:max-w-4xl w-auto  mt-3 text-center object-cover"/>
            
                <div className="w-full max-w-6xl mx-auto p-5 flex justify-between border-slate-500 border-b">
                    <div className="">
                        {post && new Date(post.createdAt).toDateString()}
                    </div>
                    <div className="">
                        {post && (post.content.length / 1000).toFixed(0)} mins read
                    </div>
                </div>  

                <div className="p-3 post-content" dangerouslySetInnerHTML={{__html:post && post.content}}></div>
            </div>
        </div>
        <div className="max-w-7xl mx-auto p-3">
            <CallToAction />
        </div>
    </main>
  )
}
