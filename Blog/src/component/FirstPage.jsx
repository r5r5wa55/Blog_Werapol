import { Link } from 'react-router-dom'
import bg from '../assets/7756629.jpg'
import { useEffect, useState } from 'react';

export default function FirstPage() {
    const [posts, setPosts] = useState([]);
    console.log(posts);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch(`/api/post/getPosts?limit=1`);
                if (res.ok) {
                    const data = await res.json()
                    setPosts(data.posts)
                }
            } catch (error) {
                console.log(error);
            }
        }

        fetchPost()
    }, [])



    return (
        <div>
            <div className="flex flex-col container mx-auto lg:p-28 p-5 gap-6  justify-center min-h-screen h-auto">
                <h1 className="sm:text-5xl text-3xl font-bold text-center">Blog Werapol</h1>
                <p className='text-center'>Tip ToDay</p>
                <div className=" w-full h-[400px]  bg-white">  <img src={posts[0]?.image} className='h-full w-full object-cover' alt="" /></div>
                <span className=' text-3xl font-extrabold line-clamp-2 '>{posts[0]?.category}</span>
                <p className='text-xl font-extrabold line-clamp-2 '>{posts[0]?.title}</p>
               

                <div className="">
                    <Link className="text-teal-500 font-bold hover:underline w-auto"    to={`/post/${posts[0]?.slug}`}>View posts</Link>
                </div>
            </div>
        </div>
    )
}
