import { Button, Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react"
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck,FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";

export default function DashUser() {
  
  const { currenUser } = useSelector((state) => state.user);
  const [user ,setUsers] = useState([]);
  const [showMore,setShowMore] = useState(true);
  const [showModle ,setShowModle] = useState(false);
  const [userIdToDelete,setUserIdToDelete] = useState('')
  // console.log(userPosts);
  useEffect(()=>{ 
    const fetchUsers = async ()=>{
      try {
        const res = await fetch(`/api/user/getusers`);
        
        const data = await res.json();
        console.log(data);
        if (res.ok) {
            setUsers(data.user);
          if (data.user.length < 9) {
            setShowMore(false);
          }
          
        }
      } catch (error) {
        console.log(error.message);
      }

    }

    if(currenUser.isAdmin){
        fetchUsers()
    }
  },[currenUser._id, currenUser.isAdmin])

  const handleShowMore = async()=>{
    const startIndex = user.length;
    console.log(startIndex);
    try {
      const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
      const data = await res.json()
      console.log(data);
      if(res.ok){
          setUsers((oldUser)=>[...oldUser, ...data.user])
        if(data.user.length <= 9){
          setShowMore(false)
        }
      
       
      }
    } catch (error) {
      console.log(error);
    }
  }

 

  const handleDeleteUser = async () => {
    setShowModle(false);
    try {
      const res = await fetch(
        `/api/user/deleteuser/${userIdToDelete}/${currenUser._id}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUsers((prev) =>
          prev.filter((user) => user._id !== userIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-700 ">
      {
        currenUser.isAdmin && user.length > 0 ?
        (
          <>
         
              <Table  hoverable className="shadow-xl">
                <Table.Head>
                  <Table.HeadCell className="w-40">Data Create</Table.HeadCell>
                  <Table.HeadCell>User image</Table.HeadCell>
                  <Table.HeadCell>Username</Table.HeadCell>
                  <Table.HeadCell>Admin</Table.HeadCell>
                  <Table.HeadCell>Admin</Table.HeadCell>
                  <Table.HeadCell>Delete</Table.HeadCell>
                </Table.Head>
                {
                user.map((users,idx)=>(
                  <Table.Body className="divide-y" key={idx} >
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell>{new Date(users.createdAt).toLocaleDateString()}</Table.Cell>
                        <Table.Cell>
                            <img 
                                src={users.profilePicture} 
                                alt={users.username} 
                                className="w-10 h-10 object-cover bg-gray-700 rounded-full  "
                            />
                        </Table.Cell>
                        <Table.Cell className="truncate overflow-hidden ...  w-[230px] lg:w-auto lg:text-wrap">
                                {users.username}
                        </Table.Cell>
                        <Table.Cell>
                            {users.email}
                        </Table.Cell>
                        <Table.Cell>
                            {users.isAdmin ? (<FaCheck  className="text-green-500"/>):(<FaTimes className="text-red-500"/>)}
                        </Table.Cell>
                        <Table.Cell>
                          <span className="hover:underline text-red-600 cursor-pointer" onClick={()=>{
                            setShowModle(true)
                            setUserIdToDelete(users._id);

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
                  Are you sure you want to delete this user?
                </h3>
                <div className="flex justify-center gap-4">
                  <Button color="failure" onClick={handleDeleteUser}>
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
