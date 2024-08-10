import { Link } from 'react-router-dom'
import CallToAction from '../component/CallToAction'
import { useEffect, useState } from 'react'
import PostCard from '../component/PostCard'
import { TypeAnimation } from 'react-type-animation';
import FirstPage from '../component/FirstPage';
export default function Home() {

  const [posts, setPosts] = useState([]);



  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/post/getPosts?limit=6`);
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
  // console.log(posts);

  return (
    <div>
      <FirstPage />
      <div className="p-5 bg-amber-100 text-black dark:text-white dark:bg-slate-600">
        <CallToAction />
      </div>

      <div className='max-w-7xl mx-auto flex flex-col gap-8 py-7  p-10'>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-6'>
            <h2 className='text-3xl  text-center font-extrabold flex justify-center gap-3'>Recent  <div className="text-blue-400">Posts</div></h2>
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
