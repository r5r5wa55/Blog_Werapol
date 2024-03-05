import { Button, Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react"
import { HiOutlineExclamationCircle } from "react-icons/hi";

import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";

export default function DashComment() {

  
  const { currenUser } = useSelector((state) => state.user);
  const [comment ,setCommetns] = useState([]);
  const [showMore,setShowMore] = useState(true);
  const [showModle ,setShowModle] = useState(false);
  const [commentIdToDelete,setCommetnIdToDelete] = useState('')
  // console.log(commentPosts);
  useEffect(()=>{ 
    const fetchCommetns = async ()=>{
      try {
        const res = await fetch(`/api/comment/getcomments`);
        
        const data = await res.json();
        // console.log(data);
        if (res.ok) {
            setCommetns(data.comments);
          if (data.comments.length < 9) {
            setShowMore(false);
          }
          
        }
      } catch (error) {
        console.log(error.message);
      }

    }

    if(currenUser.isAdmin){
        fetchCommetns()
    }
  },[currenUser._id, currenUser.isAdmin])

  const handleShowMore = async()=>{
    const startIndex = comment.length;
    console.log(startIndex);
    try {
      const res = await fetch(`/api/comment/getcomments?startIndex=${startIndex}`);
      const data = await res.json()
      console.log(data);
      if(res.ok){
          setCommetns((oldCommetn)=>[...oldCommetn, ...data.comments])
        if(data.comments.length <= 9){
          setShowMore(false)
        }
      
       
      }
    } catch (error) {
      console.log(error);
    }
  }

 

  const handleDeleteCommetn = async () => {
    console.log(commentIdToDelete);
    try {
      const res = await fetch(`/api/comment/deleteComment/${commentIdToDelete}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      if (res.ok) {
        setCommetns((prev) =>
          prev.filter((comment) => comment._id !== commentIdToDelete)
        );
        setShowModle(false);
      } else {
        console.log(data.message);
    
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  console.log(comment);
  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-700 ">
      {
        currenUser.isAdmin && comment.length > 0 ?
        (
          <>
         
              <Table  hoverable className="shadow-xl">
                <Table.Head>
                  <Table.HeadCell className="w-40">Data UpDate</Table.HeadCell>
                  <Table.HeadCell>Commetn Content</Table.HeadCell>
                  <Table.HeadCell>Like</Table.HeadCell>
                  <Table.HeadCell>Post Id</Table.HeadCell>
                  <Table.HeadCell>User ID</Table.HeadCell>
                  <Table.HeadCell>Delete</Table.HeadCell>
                </Table.Head>
                {
                comment.map((comment,idx)=>(
                  <Table.Body className="divide-y" key={idx} >
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell>{new Date(comment.createdAt).toLocaleDateString()}</Table.Cell>
                        <Table.Cell>
                            {comment.content}
                        </Table.Cell>
                        <Table.Cell className="truncate overflow-hidden ...  w-[230px] lg:w-auto lg:text-wrap">
                             {comment.numberOfLike}
                        </Table.Cell>
                        <Table.Cell>
                            {comment.postId}
                        </Table.Cell>
                        <Table.Cell>
                            {comment.userId}
                        </Table.Cell>
                        <Table.Cell>
                          <span className="hover:underline text-red-600 cursor-pointer" onClick={()=>{
                            setShowModle(true)
                            setCommetnIdToDelete(comment._id);

                          }}>
                              Delete
                           </span>
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
                  Are you sure you want to delete this comment?
                </h3>
                <div className="flex justify-center gap-4">
                  <Button color="failure" onClick={handleDeleteCommetn} >
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
