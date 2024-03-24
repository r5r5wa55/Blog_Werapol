import {Link} from 'react-router-dom'
import CallToAction from '../component/CallToAction'
import { useEffect, useState } from 'react'
import PostCard from '../component/PostCard'
import { TypeAnimation } from 'react-type-animation';
export default function Home() {

  const [posts,setPosts] = useState([]);

  useEffect(()=>{
    const fetchPost =async()=>{
      try {
        const res = await fetch(`/api/post/getPosts?limit=6`);
        if(res.ok){
          const data = await res.json()
          setPosts(data.posts)
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchPost()
  },[])
  // console.log(posts);

  return (
    <div>
      <div className="flex flex-col max-w-6xl mx-auto lg:p-28 p-5 gap-6 ">
        <h1 className="sm:text-5xl text-3xl  font-bold">Blog</h1>
          <TypeAnimation
            sequence={[
              // Same substring at the start will only be typed out once, initially
              'ความรู้',
              2000, // wait 1s before replacing "Mice" with "Hamsters"
              'ผลงาน',
              2000,
             
            ]}
            wrapper="span"
            speed={50}
            style={{ fontSize: '5em', display: 'inline-block', }}
            repeat={Infinity}
          />
 
  
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas, ut! Ad impedit itaque ullam libero deserunt earum accusamus, nulla aliquam.</p>
        <div className="">
          <Link className="text-teal-500 font-bold hover:underline w-auto">View all posts</Link>
        </div>
      </div>  
      <div className="p-5 bg-amber-100 text-black dark:text-white dark:bg-slate-600">
        <CallToAction />
      </div>

       <div className='max-w-7xl mx-auto flex flex-col gap-8 py-7  p-10'>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-6'>
            <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-3'>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={'/search'}
              className='text-lg text-teal-500 hover:underline text-center'
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
