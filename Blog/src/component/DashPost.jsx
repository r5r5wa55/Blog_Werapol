import { Button, Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react"
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function DashPost() {
  
  const { currenUser } = useSelector((state) => state.user);
  const [userPosts ,setUserPosts] = useState([]);
  const [showMore,setShowMore] = useState(true);
  const [showModle ,setShowModle] = useState(false);
  const [postIdToDelete,setPostIdToDelete] = useState('')
  // console.log(userPosts);
  useEffect(()=>{ 
    const fetchPosts = async ()=>{
      try {
        const res = await fetch(`/api/post/getposts?userId=${currenUser._id}`);
        
        const data = await res.json();
        // console.log(data);
        if (res.ok) {
          setUserPosts(data.posts);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
          
        }
      } catch (error) {
        console.log(error.message);
      }

    }

    if(currenUser.isAdmin){fetchPosts()}
  },[currenUser._id, currenUser.isAdmin])

  const handleShowMore = async()=>{
    const startIndex = userPosts.length;
    console.log(startIndex);
    try {
      const res = await fetch(`/api/post/getposts?userId=${currenUser._id}&startIndex=${startIndex}`);
      const data = await res.json()
      console.log(data);
      if(res.ok){
          setUserPosts((oldPost)=>[...oldPost, ...data.posts])
        if(data.posts.length <= 9){
          setShowMore(false)
        }
      
       
      }
    } catch (error) {
      console.log(error);
    }
  }

 

  const handleDeletePost = async () => {
    setShowModle(false);
    try {
      const res = await fetch(
        `/api/post/deletepost/${postIdToDelete}/${currenUser._id}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserPosts((prev) =>
          prev.filter((post) => post._id !== postIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-700">
      {
        currenUser.isAdmin && userPosts.length > 0 ?
        (
          <>
         
              <Table  hoverable className="shadow-xl">
                <Table.Head>
                  <Table.HeadCell>Data update</Table.HeadCell>
                  <Table.HeadCell>Post image</Table.HeadCell>
                  <Table.HeadCell>Post title</Table.HeadCell>
                  <Table.HeadCell>Category</Table.HeadCell>
                  <Table.HeadCell>Delete</Table.HeadCell>
                  <Table.HeadCell>
                    <span>Edit</span> 
                  </Table.HeadCell>
                </Table.Head>
                {
                userPosts.map((post,idx)=>(
                  <Table.Body className="divide-y" key={idx} >
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
                        <Table.Cell>
                          <Link to={`/post/${post.slug}`}>
                            <img src={post.image} alt={post.title} className="w-36 h-10 object-cover bg-gray-700  "/>
                          </Link>
                        </Table.Cell>
                        <Table.Cell className="truncate overflow-hidden ...   inline-block w-[230px] lg:w-auto lg:text-wrap">
                            <Link to={'/post/${post.slug}'} className="">{post.title}</Link>
                        </Table.Cell>
                        <Table.Cell>
                            {post.category}
                        </Table.Cell>
                        <Table.Cell>
                          <span className="hover:underline text-red-600 cursor-pointer" onClick={()=>{
                            setShowModle(true)
                            setPostIdToDelete(post._id);

                          }}>
                              Delete
                           </span>
                        </Table.Cell>
                        <Table.Cell>
                          <Link to={`/update-post/${post._id}`}>
                            <span className='text-teal-600 hover:underline'>
                              Edit
                            </span></Link>
                        </Table.Cell>
                    </Table.Row>
                  </Table.Body>

                ))}
              </Table>
              {
                showMore && 
                (
                  <div className="w-full text-center py-5 cursor-pointer" onClick={handleShowMore}>Show More</div>
                )
              }
    
          </>
        ):
        (
          <p>You have no posts yet</p>
        )
      }
        <Modal show={showModle} size="md" onClose={() => setShowModle(false)} popup>
            <Modal.Header />
            <Modal.Body>
              <div className="text-center">
                <HiOutlineExclamationCircle className="mx-auto mb-4 h-20 w-20 text-gray-400 dark:text-gray-200" />
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure you want to delete this post?
                </h3>
                <div className="flex justify-center gap-4">
                  <Button color="failure" onClick={handleDeletePost}>
                    {"Yes, I'm sure"}
                  </Button>
                  <Button color="gray" onClick={() => setShowModle(false)}>
                    No, cancel
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
    </div>
  )
}
