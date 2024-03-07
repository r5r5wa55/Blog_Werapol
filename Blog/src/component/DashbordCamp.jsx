import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {

  HiArrowNarrowUp,
  HiChatAlt,

  HiOutlineDocumentText,
  HiOutlineUserGroup,
} from 'react-icons/hi';
import { Button, Table } from 'flowbite-react';
import { Link } from 'react-router-dom';

export default function DashbordCamp() {
    const [users,setUsers]= useState([])
    const [comments,setComments] = useState([])
    const [posts,setPosts] = useState([])
    const [totalUsers,setTotalUsers] = useState(0)
    const [totalPosts,settotalPosts] = useState(0)
    const [totalComments,setTotalComments] = useState(0)
    const [lastMonthUsers,setlastMonthUsers] = useState(0)
    const [lastMonthPosts,setlastMonthPosts] =useState(0)
    const [lastMonthComments,setLastMountComments] = useState(0)
    const {currenUser} = useSelector((state)=>state.user)

    useEffect(()=>{
        const fetchUser =async()=>{
            try {
                const res =  await fetch(`/api/user/getusers?limit=6`)
                const data = await res.json()
                if(res.ok){
                    setUsers(data.user)
                    setTotalUsers(data.totalUsers)
                    setlastMonthUsers(data.lastMonthUsers)
                    
                }
            } catch (error) {
                console.log(error);
            }
        }

        const fetchPost =async()=>{
            try {
                const res =  await fetch(`/api/post/getposts?limit=6`)
                const data = await res.json()
                if(res.ok){
                    setPosts(data.posts)
                    settotalPosts(data.totalPosts)
                    setlastMonthPosts(data.lastMonthPosts)
                    
                }
            } catch (error) {
                console.log(error);
            }
        }
        const fetchComment =async()=>{
            try {
                const res =  await fetch(`/api/comment/getcomments?limit=6`)
                const data = await res.json()
                if(res.ok){
                    setComments(data.comments)
                    setTotalComments(data.totalComments)
                    setLastMountComments(data.lastMonthComments)
                    
                }
            } catch (error) {
                console.log(error)
            }
        }
        if(currenUser.isAdmin){
            fetchUser()
            fetchPost()
            fetchComment()
        }


    },[currenUser])
    // console.log(comments);
    // console.log(totalComments);
    // console.log(lastMonthComments);
  return (
    <div className='p-3 md:mx-auto'>
        <div className='flex-wrap flex justify-center'>

            
            <div className="flex justify-between items-center shadow-xl m-3 bg-gradient-to-r to-cyan-500 from-blue-500  p-5 rounded-lg  w-full  lg:w-96 text-black dark:text-white">
                <div className="">
                    <span className="text-2xl">Total User</span>
                    <p className="text-3xl font-semibold ">{totalUsers}</p>
                    <div className="flex mt-5 items-center">
                        <HiArrowNarrowUp className="text-black dark:text-white font-semibold"/>
                        <p className="text-sm text-black dark:text-white ">{lastMonthUsers} last Month</p>
                    </div>
                </div>
                <div className="my-2">
                    <HiOutlineUserGroup className="text-6xl text-white bg-blue-500  p-3 rounded-full"/>
                </div>
            </div>

            
            <div className="flex justify-between items-center shadow-xl m-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500   p-5 rounded-lg  w-full  lg:w-96 text-black dark:text-white">
                <div className="">
                    <span className="text-2xl">Total Posts</span>
                    <p className="text-3xl font-semibold ">{totalPosts}</p>
                    <div className="flex mt-5 items-center">
                        <HiArrowNarrowUp className="text-black dark:text-white font-semibold"/>
                        <p className="text-sm text-black dark:text-white ">{lastMonthPosts} last Month</p>
                    </div>
                </div>
                <div className="my-2">
                    <HiOutlineDocumentText  className="text-6xl text-white bg-pink-700 p-3 rounded-full"/>
                </div>
            </div>


            <div className="flex justify-between items-center shadow-xl m-3 bg-gradient-to-r from-blue-600 to-emerald-500  p-5 rounded-lg  w-full  lg:w-96 text-black dark:text-white">
                <div className="">
                    <span className="text-2xl">Total User</span>
                    <p className="text-3xl font-semibold ">{totalComments}</p>
                    <div className="flex mt-5 items-center">
                        <HiArrowNarrowUp className="text-black dark:text-white font-semibold"/>
                        <p className="text-sm text-black dark:text-white ">{lastMonthComments} last Month</p>
                    </div>
                    
                </div>
                <div className="my-2">
                    <HiChatAlt  className="text-6xl text-white bg-teal-600 p-3 rounded-full"/>
                </div>
            </div>
        </div>

        
        <div className='flex flex-wrap gap-4 py-3 mx-auto justify-center'>
            <div className='flex flex-col w-full sm:w-full md:w-full lg:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
            <div className='flex justify-between  p-3 text-sm font-semibold'>
                <h1 className='text-center p-2'>Recent users</h1>
                <Button outline gradientDuoTone='purpleToPink'>
                <Link to={'/dashboard?tab=users'}>See all</Link>
                </Button>
            </div>
            <Table hoverable>
                <Table.Head>
                <Table.HeadCell>User image</Table.HeadCell>
                <Table.HeadCell>Username</Table.HeadCell>
                </Table.Head>
                {users &&
                users.map((user) => (
                    <Table.Body key={user._id} className='divide-y'>
                    <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                        <Table.Cell>
                        <img
                            src={user.profilePicture}
                            alt='user'
                            className='w-10 h-10 rounded-full bg-gray-500'
                        />
                        </Table.Cell>
                        <Table.Cell>{user.username}</Table.Cell>
                    </Table.Row>
                    </Table.Body>
                ))}
            </Table>
            </div>
            <div className='flex flex-col w-full  md:w-full lg:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
            <div className='flex justify-between  p-3 text-sm font-semibold'>
                <h1 className='text-center p-2'>Recent comments</h1>
                <Button outline gradientDuoTone='purpleToPink'>
                <Link to={'/dashboard?tab=comment'}>See all</Link>
                </Button>
            </div>
            <Table hoverable>
                <Table.Head>
                <Table.HeadCell>Comment content</Table.HeadCell>
                <Table.HeadCell>Likes</Table.HeadCell>
                </Table.Head>
                {comments &&
                comments.map((comment) => (
                    <Table.Body key={comment._id} className='divide-y'>
                    <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                        <Table.Cell className='w-96'>
                            <p className='line-clamp-2'>{comment.content}</p>
                        </Table.Cell>
                        <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                    </Table.Row>
                    </Table.Body>
                ))}
            </Table>
            </div>
            <div className='flex flex-col w-full lg:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
            <div className='flex justify-between  p-3 text-sm font-semibold'>
                <h1 className='text-center p-2'>Recent posts</h1>
                <Button outline gradientDuoTone='purpleToPink'>
                <Link to={'/dashboard?tab=posts'}>See all</Link>
                </Button>
            </div>
            <Table hoverable>
                <Table.Head>
                <Table.HeadCell>Post image</Table.HeadCell>
                <Table.HeadCell>Post Title</Table.HeadCell>
                <Table.HeadCell>Category</Table.HeadCell>
                </Table.Head>
                {posts &&
                posts.map((post) => (
                    <Table.Body key={post._id} className='divide-y'>
                    <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                        <Table.Cell>
                        <img
                            src={post.image}
                            alt='user'
                            className='w-14 h-10 rounded-md bg-gray-500 object-cover'
                        />
                        </Table.Cell>
                        <Table.Cell className='w-96'>{post.title}</Table.Cell>
                        <Table.Cell className='w-5'>{post.category}</Table.Cell>
                    </Table.Row>
                    </Table.Body>
                ))}
            </Table>
            </div>
        </div>
    </div>
  )
}
